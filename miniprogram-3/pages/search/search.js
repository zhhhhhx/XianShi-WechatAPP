// pages/search/search.js
let Timeid=-1 //防抖的定时器
const DB=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      checkboxList:[
        {
          id:0,
          name:'搜标题',
          value:'title',
          default:true
        },
        {
          id:1,
          name:'搜内容',
          value:'body',
          default:false
        }
      ],
      checkResult:['title'],
      requestList:[],
      isFocus:false, //是否隐藏清空按钮
      inputValue:''
    },

    //获得复选框的勾选情况
    handleChange(e){
      this.setData({
        checkResult: e.detail.value
      })
    },

    // //判断字符串是否在列表内
    // isIn(str,list){
    //   console.log('__',list.length)
    //   for (var i=0;i<list.length;i++){
       
    //     if (list[i]==str){
    //       return true;
    //     }
    //   }
    //   return false
    // },

    // 获取用户输入的关键词
    getInput(options){
      const {value}=options.detail;
      let checkResult=this.data.checkResult;
      // console.log(checkResult)
      // let t='title'
      // console.log(t in checkResult)
      if (!value.trim() || checkResult.length==0){   //trim()检查输入合法性
        this.setData({
          requestList:[],
          isFocus:false
        })
        return;
      }
      this.setData({ //显示清空按钮
        isFocus:true
      })
      const _ = DB.command
      clearTimeout(this.Timeid) //清除定时器
      this.Timeid=setTimeout(()=>{
        if(checkResult.length==2){ //如果两个都选了，就同时检索标题和内容
          DB.collection('request')
          .where(_.or({
            title: DB.RegExp({
              regexp: options.detail.value,  
              options:'i'
            })
          },
          {body: DB.RegExp({
            regexp: options.detail.value ,
            options:'i'
            })
          }
          ))
          .get().then(res=>{
            console.log('搜索成功',res)
            this.setData({
              requestList:[...this.data.requestList,...res.data]
            })
          })
          .catch(res=>{
            console.log('搜索失败',res)
          })
        }
        else if(checkResult.length==1){ //如果只选了一个
          if(checkResult[0]=='title'){ //选了标题
            DB.collection('request')
            .where({
              title: DB.RegExp({
                regexp: options.detail.value,  
                options:'i'
              })
            })
            .get().then(res=>{
              console.log('搜索标题成功',res)
              this.setData({
                requestList:[...this.data.requestList,...res.data]
              })
            })
            .catch(res=>{
              console.log('搜索标题失败',res)
            })
          }
          if(checkResult[0]=='body'){ //选了内容
            DB.collection('request')
            .where({
              body: DB.RegExp({
                regexp: options.detail.value ,
                options:'i'
              })
            })
            .get().then(res=>{
              console.log('搜索内容成功',res)
              this.setData({
                requestList:[...this.data.requestList,...res.data]
              })
            })
            .catch(res=>{
              console.log('搜索内容失败',res)
            })
          }
        }
      },500) //0.5秒后发送请求，0.5秒内有新输入则刷新
    },
    handleClear(){
      this.setData({
        requestList:[],
        isFocus:false,
        inputValue:''
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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