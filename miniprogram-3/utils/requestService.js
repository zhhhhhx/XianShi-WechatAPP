class RequestService{
    //向数据库添加新数据
    dbAdd(db,data,log){
       return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db)
            .add({
                data,
                success(res){
                    console.log(log, res)
                    reslove(true)
                },
                fail(res){
                    console.log('添加数据失败',res)
                    reslove(false)
                }
            })
        })
    }
    //根据_id删除数据库数据
    dbDelete(db,_id,log){
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db).doc(_id)
            .remove({
            success(res){
                console.log(log, res)
                reslove(true)
            },
            fail(res){
                console.log('删除数据失败',res)
                reslove(false)
            }
        })
        })
    }
    //更新数据库数据
    dbUpdate(db,_id,data,log){
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db).doc(_id)
            .update({
                data,
                success(res){
                console.log(log, res)
                reslove(true)
            },
                fail(res){
                console.log('删除数据失败',res)
                reslove(false)
            }
        })
        })
    }
    //where查询
    dbSearch(db,where,log){
        return new Promise((reslove, reject) =>{
            wx.cloud.database().collection(db)
            .where(
                where
            )
            .get().then(res=>{
                console.log(log, res)
                reslove(res)
            })
            .catch(res=>{
                console.log('查找失败',res)
                reslove(false)
            })
        })
    }
}

module.exports={
    RequestService:RequestService,
}