
const Service=require('./service')

class TradeService extends Service{  
    constructor(){
        super()
    }
    //监听所有的对数据库的写操作
    dbAdd(db,data,log){
        let that=this
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db)
            .add({
                data,
                success(res){
                    console.log(log, res)
                    reslove(true)
                    that.notifyObservers(data) //为被监听的函数加上父类的notifyObservers()
                },
                fail(res){
                    console.log('添加数据失败',res)
                    reslove(false)
                }
            })
        })
        
    }
    dbDelete(db,_id,log){
        let that=this
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db).doc(_id)
            .remove({
            success(res){
                console.log(log, res)
                reslove(true)
                that.notifyObservers(data)
            },
            fail(res){
                console.log('删除数据失败',res)
                reslove(false)
            }
        })
        })
        
    }
    dbUpdate(db,_id,data,log){
        let that=this
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db).doc(_id)
            .update({
                data,
                success(res){
                console.log(log, res)
                reslove(true)
                that.notifyObservers(data)
                },
                fail(res){
                console.log('删除数据失败',res)
                reslove(false)
                }
            })
        })
        
    }
  }

//export导出写法二 在TradeItem.js导入 
  module.exports={
      TradeService:TradeService
  }
  