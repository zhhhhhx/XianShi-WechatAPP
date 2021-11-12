// pages/request/request.js
let totalNum=-1
// let utils=require('../../utils/util.js')
import {RequestService} from '../../utils/monitor/requestService'
let requestService=new RequestService()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current:'',
        tabs:[
            {
                id:0,
                name:'委托',
                isActive:true
            },
            {
                id:1,
                name:'问答',
                isActive:false
            },
            {
                id:2,
                name:'交易',
                isActive:false
            }
        ], //标题栏列表
        RequestViewImg:['../../icon/view0.png','../../icon/view1.png'], //委托的视图的图标列表
        TradeViewImg:['../../icon/view0.png','../../icon/view2.png'], //交易的视图的图标列表
        viewType:true, //视图种类 true表示带图，false表示无图
        requestList:[] //委托列表

    },

    //切换视图
    handleView(e){
        console.log(e)
        if(this.data.tabs[0].isActive){ //切换委托视图
           let newImg= this.data.RequestViewImg.reverse()
           this.setData({
               RequestViewImg:newImg,
               viewType:!this.data.viewType
           })
        }
        else if(this.data.tabs[1].isActive){ //切换交易视图
            let newImg= this.data.TradeViewImg.reverse()
           this.setData({
            TradeViewImg:newImg,
            viewType:!this.data.viewType
           })
        }
    },

    //处理标题栏的点击
    handleItemChange(e){
        const {index}=e.detail;
        let tabs= this.data.tabs;
        tabs.forEach((v,i)=>v.isActive=(i===index));
        this.setData({
            tabs
        })
    },
    //获取数据库内的委托数据
    // getDBList(){
    //     let len=this.data.requestList.length //获取数组长度 用来跳过
    //     if (len==totalNum){
    //         wx.showToast({ //显示小弹窗提示用户
    //           title: '已经到底啦',
    //           icon:'none'
    //         })
    //         return
    //     }
    //     wx.showLoading({ //提示用户目前正加载下一页
    //       title: '加载中',
    //     })
    //     wx.cloud.database().collection('request').skip(len).get()
    //     .then(res=>{ //箭头函数可以直接用this 不需要that
    //         console.log('获取成功',res)
    //         this.setData({
    //             requestList: this.data.requestList.concat (res.data) //concat 拼接
    //         })
    //         wx.hideLoading() //加载完成后隐藏加载窗口
    //     })
    //     .catch(res=>{
    //         console.log('获取失败',res)
    //         wx.showToast({
    //           title: '加载失败',
    //         })
    //     })
    // },

    //将上面注释的函数封装成utils.getDBList 用于获取数据库内的委托数据
    getDBList(){
        let requestList=this.data.requestList
        //参数分别为this指针，数据库表名，存放结果的列表名，存放结果的列表，数据库表总长度
        requestService.getDBList(this,'request','requestList',requestList,totalNum)
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    //    this.getDBList()
       
    //    wx.cloud.database().collection('request').count()
    //     .then(res=>{
    //         totalNum=res.total
    //     })
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
        this.setData({
            requestList:[]
        })
        this.getDBList()
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
        this.onHide()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.getDBList()
        console.log('触底')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})