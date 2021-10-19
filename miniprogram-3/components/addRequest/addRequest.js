// components/addRequest/addRequest.js
let userinfo=wx.getStorageSync('userinfo')

Page({

    /**
     * 页面的初始数据
     */
    data: {    
        options:0, 
        optionsId:'',
        item:{},
        title:'',
        body:'',
        img:[],
        newImg:[],
        hidden:'',
        price:'',
        publishTime:'',
        publisher: userinfo.openid,
        publisher_name:userinfo.nickName,
        receiver:'',
        receiver_name: ''       
    },
    //获取标题
    getTitle(e){
       this.setData({
           title:e.detail.value
       })
       wx.setStorageSync('title', e.detail.value)
       console.log('获取标题 '+this.data.title)
    },
    //获取内容
    getBody(e){
        this.setData({
            body:e.detail.value
        })
        wx.setStorageSync('body', e.detail.value)
        console.log('获取内容 '+this.data.body)
     },
     //添加图片
     handleAddImg(){
        wx-wx.chooseImage({
          count: 9,
          sizeType: ['compressed','original'],
          sourceType: ['album','camera'],
          success: (res) => {
              this.setData({
                  //...拼接
                  img:[...this.data.img,...res.tempFilePaths]

              })
              console.log('添加图片成功',this.data.img)
          },
          fail: (res) => {
            console.log('添加图片失败',res)
          }
        })
     },
     //
     handleRemoveImg(e){
        let {index}=e.currentTarget.dataset
        let {img}=this.data
        img.splice(index,1)
        this.setData({img})
     },
     //获取重要信息
     getHidden(e){
        this.setData({
            hidden:e.detail.value
        })
        wx.setStorageSync('hidden', e.detail.value)
        console.log('获取重要信息 '+this.data.hidden)
     },
     //获取价格
     getPrice(e){
        this.setData({
            price:Number(e.detail.value) //无法输入小数点，且清除数字时会默认显示0 好处是过滤掉其他字符
            // price: e.detail.value
        })
        wx.setStorageSync('price', e.detail.value)
        console.log('获取价格 '+this.data.price)
     },
     isEmpty(){
         //各类错误提示
        if(this.data.publisher==''){
            wx.navigateTo({
              url: '../../pages/login/login',
            })
            wx.showToast({
              title: '请先登录',
              icon: 'error',
            })
            return false
        }
        else if(this.data.title==''){
            wx.showToast({
                title: '标题不能为空',
                icon: 'error',
              })
              return false
        }
        else if(this.data.body==''){
            wx.showToast({
                title: '内容不能为空',
                icon: 'error',
              })
              return false
        }
        else if(this.data.price==''){
            wx.showToast({
                title: '价格不能为空',
                icon: 'error',
              })
              return false
        }
        // else if(this.data.price.constructor !=typeof Number){
        //     console.log(this.data.price.constructor)
        //     wx.showToast({
        //         title: '价格只能为数字',
        //         icon: 'error',
        //       })
        //       return false
        // }
        return true
     },
     //提交委托到数据库
     upload(){
        wx.hideLoading();
        wx.cloud.database().collection('request').add({
        data:{
            title:this.data.title,
            body:this.data.body,
            hidden:this.data.hidden,
            price:this.data.price,
            img:this.data.newImg,
            publishTime:'',
            publisher: userinfo.openid,
            publisher_name:userinfo.nickName,
            receiver:'',
            receiver_name:'' 
        },
        success(res){
            console.log('发布成功', res)
            wx-wx.navigateBack({
                delta: 1
            });
            wx.showToast({
                title: '发布成功',
              })  
            // wx.clearStorage()
            wx.setStorageSync('title', '')
            wx.setStorageSync('body', '')
            wx.setStorageSync('hidden', '')
            wx.setStorageSync('price', '')
        }
        })
        //用户支付酬金
     },
     //上传图片到云存储
     handlePublish(){
         //检查提交内容合法性
         if(!this.isEmpty()){
             return
         }
        let that=this
        let img=this.data.img
        let newImg=this.data.newImg
        var i=0
        wx.showLoading({
          title: '上传图片中',
        })
        // while(i!=img.length){
        //     wx.cloud.uploadFile({
        //         cloudPath: new Date().getTime()+'.png', //上传后的图片名 用时间戳的方式命名
        //         filePath: img[i], //上传前的文件路径
        //         success(res){
        //           console.log("上传图片成功",res)
        //         //   that.setData({ //newImg用于储存新的图片路径
        //         //     newImg: [...newImg, ...res.fileID]
        //         //   })
        //           that.data.newImg.push(res.fileID)
        //           console.log('--', newImg)
        //           i+=1
        //           if(i==img.length){
        //             console.log('图片路径', newImg)
        //             wx.hideLoading();
        //           }
        //         },
        //         fail:console.error
        //     })
        // }
        img.forEach((v,j) =>{
            wx.cloud.uploadFile({
                cloudPath: new Date().getTime()+'.png', //上传后的图片名 用时间戳的方式命名
                filePath: v, //上传前的文件路径
                success(res){
                  console.log("上传图片成功",res)
                //   this.setData({ //newImg用于储存新的图片路径
                //     newImg: [...newImg, ...res.fileID]
                //   })
                  that.data.newImg.push(res.fileID)
                  console.log('--', newImg)
                },
                fail:console.error
            })
            if(j==img.length-1){ //如果全部图片上传成功，再上传委托到数据库
                console.log('图片路径', newImg)
                setTimeout(that.upload,1000) //1秒后上传
            }
        })
    },
     handleChange(){
        const item=this.data.item
        console.log('修改',item)
        if(item.receiver!=''){
            wx.showToast({
                title: '此委托已被领取，无法修改或删除',
                icon: 'error',
              })
              return
        }
        wx.cloud.database().collection('request').doc(item._id)
        .update({
            data:{
                title:item.title,
                body:item.body,
                hidden:item.hidden,
            },
            success: function(res) {
                console.log('更新成功',res)
                wx.showToast({
                  title: '修改成功',
                })
              },
            fail(res){
                console.log('更新失败',res)
            }
            
        })
     },
     handleDelete(){
        const item=this.data.item
        console.log('删除')
        this.isEmpty()
         
        if(item.receiver!=''){
            wx.showToast({
                title: '此委托已被领取，无法修改或删除',
                icon: 'error',
              })
              return
        }
        wx.cloud.database().collection('request').doc(item._id)
        .remove({
            success: function(res) {
                console.log('删除成功',res)
                wx.showToast({
                  title: '删除成功',
                })
            }
        })
     },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.id==0){
            this.setData({
                options:0
            })
            //获取缓存中的已填写内容
            let title=wx.getStorageSync('title')
            this.setData({title})
            let body=wx.getStorageSync('body')
            this.setData({body})
            let hidden=wx.getStorageSync('hidden')
            this.setData({hidden})
            let price=wx.getStorageSync('price')
            this.setData({price})
        }
        else{
            this.setData({
                optionsId:options.id
            })
            wx.cloud.database().collection('request')
            .doc(options.id)
            .get().then(res=>{
                console.log('发布页获取成功',res)
                this.setData({
                    item:res.data,
                    options:1,
                    title:res.data.title,
                    _title:res.data.title,
                    body:res.data.body,
                    _body:res.data.body,
                    hidden:res.data. hidden,
                    _hidden:res.data. hidden,
                    price:res.data.price,
                    _price:res.data.price
                })
            })
            .catch(res=>{
                console.log('发布页获取失败',res)
            }) 
        }
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