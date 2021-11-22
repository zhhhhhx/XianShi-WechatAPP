// components/tradeItem/tradeItem.js
const app=getApp()
let obs=app.globalData.obs2
import {TradeService} from '../../utils/monitor/tradeService'
let tradeService=new TradeService()
tradeService.addObs(obs)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tradeItem:{}, //交易具体信息
        chatList:[], //评论列表
        chat:'', //用户输入评论
        userInfo:{}, //用户信息
        who:'-1', //判断当前操作者 0表示接收者 1 表示发布者 默认-1表示其他人 控制wxml的标签显示
        isConfirm: false, //放弃交易前弹窗二次确认
        options:{} //onLoad参数
    },

    //接受交易 加入购物车
    handleBuy(){
        let that=this
        let tradeItem=that.data.tradeItem
        let userInfo=that.data.userInfo
        if(userInfo=={}){            
            wx.navigateTo({
              url: '../../pages/login/login',
            })
            wx.showToast({
                title: '请先登录',
                icon:'error'
              })
            return
        }
        let data={
            receiver: userInfo.openid,
            receiver_name: userInfo.nickName,
            state:0 //交易状态 0表示已加入购物车
        }
        //为测试消息通知 暂时允许接受自己的交易

        // if(that.data.tradeItem.publisher==that.data.userInfo.openid){
        //     wx.showToast({
        //         title: '不能购买自己的商品', 
        //         icon:'none'
        //       })
        //     return
        // }
        let res=tradeService.dbUpdate('trade',tradeItem._id,data,'接受成功')
        res.then(function(result){
            if(result){
                //刷新上一个页面 
                const page=getCurrentPages()
                const beforePage=page[page.length-2]
                beforePage.onHide()
                
                wx.showToast({
                    title: '接受成功',
                })
                //刷新页面 让其显示付款按钮
                that.setData({
                    who:0
                })
                that.onPullDownRefresh()
                // setTimeout(function(){
                //     wx-wx.navigateBack({
                //         delta: 1,
                //     })
                // },500)
            }
        })

        
    },
    //放弃前弹窗提示
    handleGiveup(){
        let that=this
        wx.showModal({
            title: '提示',
            content: '是否确定放弃购买',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.giveup()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
        })
     },
     //放弃交易
    giveup(){
        let that=this
     //    utils.popup(that,'isConfirm','是否确定放弃此交易')
     //    console.log(that.data.isConfirm)
     //    if(!that.data.isConfirm){
     //        return;
     //    } 
         let data={
             receiver: '',
             receiver_name: '',
             state:1 //交易状态 1表示可购买
         }
         const userInfo=that.data.userInfo
 
         let res=tradeService.dbUpdate('trade',that.data.tradeItem._id,data,'放弃成功')
         res.then(function(result){
             if(result){
 
                 /*MAY DO对此用户施加惩罚*/
 
                 //刷新上一页面
                 const page=getCurrentPages()
                 const beforePage=page[page.length-2]
                 beforePage.onHide()
                 //回到上一页
                 wx.showToast({
                     title: '已放弃购买',
                   })
                 setTimeout(function(){
                     wx-wx.navigateBack({
                         delta: 1,
                     })
                 },500)
             }
         })
 
     },
     //完成支付
    handlePay(){
        let that=this

        //SHOULD DO 支付

        //更新交易状态
        let data={
            state:2 //交易状态 2表示已付款
        }
        let res=tradeService.dbUpdate('trade',that.data.tradeItem._id,data,'修改状态成功')
        res.then(function(result){
            if(result){
                //刷新上一页面
                const page=getCurrentPages()
                const beforePage=page[page.length-2]
                beforePage.onHide()
                //回到上一页
                wx.showToast({
                    title: '付款成功，请等待卖家回应',
                    icon:'none'
                })
                setTimeout(function(){
                    wx-wx.navigateBack({
                        delta: 1,
                    })
                },500)  
                
            }   
        })
        

    },
    //确认完成前弹窗提示
    handleConfirm(){
        let that=this
        wx.showModal({
            title: '提示',
            content: '是否确认收货',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.confirm()
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    },
    //确认交易已完成
    confirm(){
        let that=this
        let item=that.data.tradeItem
        let data={
            state:-1 //交易状态 -1表示已确认 已确认的交易不会再出现在页面中，但数据库中依然保存着
        }
        let res=tradeService.dbUpdate('trade',item._id,data,'修改状态成功')
        res.then(function(result){
            if(result){
                //刷新上一页面
                const page=getCurrentPages()
                const beforePage=page[page.length-2]
                beforePage.onHide()
                wx.showToast({
                  title: '已确认交易',
                })
                //返回
                setTimeout(function(){
                    wx-wx.navigateBack({
                        delta: 1,
                    })
                },500) 
            }
            /*系统支付给卖家 完成交易*/
        })
     },
     //确认发货
     handleSend(){
        let that=this
        let item=that.data.tradeItem
        let data={
            state:3 //交易状态 -1表示已确认 已确认的交易不会再出现在页面中，但数据库中依然保存着
        }
        let res=tradeService.dbUpdate('trade',item._id,data,'修改状态成功')
        res.then(function(result){
            if(result){
                wx.showToast({
                  title: '已通知买家，请耐心等待回应',
                  icon:'none'
                })
            }
        })
     },
     //获取用户输入评论
    getChatContent(e){
        this.setData({
            chat: e.detail.value
        })
    },
    //发表评论
    handlePublish(){
        let that=this
        let data={
            content: that.data.chat,
            trade_id: that.data.tradeItem._id,
            trade_id:-1,
            sender:that.data.userInfo.nickName,
            avatarUrl:that.data.userInfo.avatarUrl,
            send_time: new Date().getTime()
        }
        if(that.data.chat.length==0){ //检测输入合法性
            wx.showToast({
              title: '评论不能为空',
              icon:'none'
            })
            return
        }
        if(!that.data.userInfo.openid){ //检测输入合法性
            wx.navigateTo({
              url: '../../pages/login/login',
            })
            wx.showToast({
                title: '请先登录',
                icon:'error'
              })
            return
        }
        
        let res=tradeService.dbAdd('chat',data,'发表评论成功')
        console.log(res)
        res.then(function(result){
            if(result){
                wx.showToast({
                    title: '发表评论成功',
                })
                let length=that.data.chatList.length
                that.data.chatList[length]=data
                that.setData({
                    chatList: that.data.chatList,
                    chat:''
                })
            }
        })
    },
    //获取所有评论
    getChat(){
        let that=this
        const _ = wx.cloud.database().command
        let where={
            trade_id: _.eq(that.data.tradeItem._id)
        }
        let res=tradeService.dbSearch('chat',where,'评论获取成功')
        res.then(function(result){
            if(result!=false){
                that.setData({
                    chatList: that.data.chatList.concat(result.data)
                })
            }
        })
    },
     //TODO 点击图片放大
     handleImg(){
        /* data里设置一个属性 
        用于wx:if 切换样式 */

        /*或者跳转到新页面 
        在新页面全屏显示图片 */
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this
        console.log('交易详情页接收到',options)
        that.setData({
            options:options
        })
        tradeService.setId(options.id) //为监听者提供此交易id
        if(options.who==0 ||options.who==1){
            this.setData({
                who: options.who
            })
        }

        let res=tradeService.dbDocument('trade',options.id,'交易详情页获取成功')
        res.then(function(result){
            if(result!=false){
                that.setData({
                    tradeItem:result.data
                })
                that.getChat()
                console.log(that.data.tradeItem)
            }
        })
        const userInfo=wx.getStorageSync('userinfo')
        this.setData({userInfo})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            tradeItem:{}, //交易具体信息
            chatList:[], //评论列表
            chat:'', //用户输入评论
            isConfirm: false, //放弃交易前弹窗二次确认
        })
        this.onLoad(this.data.options)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})