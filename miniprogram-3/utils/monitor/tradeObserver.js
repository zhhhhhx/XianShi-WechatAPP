const Observer=require('./observer')
import {TradeService} from './tradeService'
class TradeObserver extends Observer{
    constructor(){
        super()
        this.message={
            '-1':'买家已确认收货，交易完成',
            '0':'卖家修改了交易内容，请注意',
            // '1':'', 状态1不需要发消息
            '2':'您的商品已售出，请尽快发货',
            '3':'卖家已发货，请留意查收'
        }
        this.service=new TradeService() //为了发送消息，需要通过service类从数据库中读出收件人openid
        this.oldState=0 //旧状态 用于判断 修改交易0->0 和 接受交易1->0
    }
    getReceiver(_id){ //根据service传来的id查出消息的接收人
        console.log('tradeObserver.getReceiver',_id)
        let that=this
        let res=that.service.dbDocument('trade',_id,'查找接收人成功')
        return res
        // res.then(function(reslut){
        //     if(reslut!=false){
        //         that.receiver=[result.data.publisher,reslut.data.receiver]
        //     }
            
        // })
    }
    cloudSend(content,_id,who){ //云函数向用户直接发通知（需要勾选允许通知）
        console.log('tradeObserver.cloudSend')
        let receiver=this.receiver[0] // 默认发送给发布人
        if(who==0){ //发送给接受人
            receiver=this.receiver[1]
        }
        let that=this
        wx.cloud.callFunction({
            name:'sendMessage',
            data:{
              openid: receiver,
            //   page:'components/requestItem/requestItem?id='+_id+'&who='+who, 这里是点击通知后要跳转的页面 让它跳到首页比较合适
            page:'pages/index/index',
              type:'委托',
              title:that.title,
              content:content,
              templateId:'-ylCZtWdD92Pv5tWHtUkUm4YnglWw_szTQMHJ_90gJQ'
            }
          }).then(res=>{
            console.log('云函数发送成功',res)
          }).catch(res=>{
            console.log('云函数发送失败',res)
          })
    }
    makeData(content,_id,type){ //需要添加到消息数据库的新消息
        let that=this
        console.log('tradeObserver.makeData')
        let userinfo=wx.getStorageSync('userinfo')
        let receiver=that.receiver[0] //接收方是发布人
        if(type==-2){
            receiver=that.receiver[1] //接收方是接受人
        }
        let mData={
            content:content,
            receiver:receiver, //接收方
            trade_id:_id,
            sender:userinfo.openid, //发送方是操作者，即此委托的接受人
            time:new Date().getTime(),
            type:type //消息类型 1表示发布人会收到此消息， -1表示接受人会收到此消息
        }
        return mData
    }
    update(data,_id){ //对监听到的数据做更新
        let that=this
        console.log('TradeObserver.update')
        for(var key in data){
            /*state永远会在data的最后面，
            当循环到state的时候没有见过receiver的话，说明是卖家修改交易，
            这样oldstate就是0
            如果有receiver，说明是买家购买，不需要发消息，
            但发消息的检测是在修改状态后，此时state已经变为0，不能直接获得oldstate，
            所以oldstate设为1
             */
            if(key=='receiver'){
                console.log('receiver')
                that.oldState=1
            }
            if(key=='state'){ //如果监听到交易状态的改变
                let state=data[key]
                console.log(state)
                let res=that.getReceiver(_id) //根据service传来的id查出消息的接收人
                res.then(function(result){
                    if(result!=false){
                        that.receiver=[result.data.publisher,result.data.receiver]
                        that.title=result.data.title
                        console.log('then',result.data.state)
                        switch (state){
                            //0->0 交易被修改
                            case 0: { 
                                console.log(that.oldState)
                                if(that.oldState==0){
                                    console.log('case0')
                                    //向消息数据库发送新消息
                                    let mData=that.makeData(that.message[0],_id,-2)
                                    that.service.dbAdd('information',mData,'发送消息成功')
                                    //发送通知到发布人微信
                                    that.cloudSend(that.message[0],_id,0)
                                    break
                                }  
                            }
                            //1 什么都不做
                            case 1:{
                                console.log('case1')
                                break
                            }
                            //0->2 买家付款
                            case 2:{
                                console.log('case2')
                                //向消息数据库发送新消息
                                let mData=that.makeData(that.message[2],_id,2)
                                that.service.dbAdd('information',mData,'发送消息成功')
                                //发送通知到发布人微信
                                that.cloudSend(that.message[2],_id,1)
                                break
                            }
                            //2->3 卖家发货
                            case 3:{
                                console.log('case3')
                                //向消息数据库发送新消息
                                let mData=that.makeData(that.message[3],_id,-2)
                                that.service.dbAdd('information',mData,'发送消息成功')
                                //发送通知到发布人微信
                                that.cloudSend(that.message[3],_id,0)
                                break
                            }
                            //3->-1 买家确认收货
                            case -1:{
                                console.log('case-1')
                                //向消息数据库发送新消息
                                let mData=that.makeData(that.message[-1],_id,2)
                                that.service.dbAdd('information',mData,'发送消息成功')
                                //发送通知到发布人微信
                                that.cloudSend(that.message[-1],_id,1)
                                break
                            }
                            default: console.error();
                        }
                    }
                })                                                        
                break
            }
        }
    }
}

//export导出写法一 在app.js导入
module.exports=TradeObserver