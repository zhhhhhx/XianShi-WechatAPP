// pages/myTask/myTask.js
import {TradeService} from '../../utils/monitor/tradeService'
let tradeService=new TradeService()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        options:{},
        tradeList:[],
        userinfo:{},
        who:0, //0表示接收者（默认），1表示发布者
        url:'../../components/tradeItem/tradeItem?id='
    },
    
    /**
     * 生命周期函数--监听页面加载
     */

    //获取此用户的相关交易
    onLoad: function (options) {
        let that=this
        console.log(options)
        that.setData({
            options:options
        })
        const userinfo=wx.getStorageSync('userinfo')
        that.setData({userinfo})
        const who=options.who
        that.setData({who})
        const _ = wx.cloud.database().command
        if(who==0){ //如果操作者是买家
            let where={
                receiver: _.eq(options.id),
                state: _.neq(-1)
            }
            
            let res=tradeService.dbSearch('trade',where,'个人交易页获取成功')
            res.then(function(result){
                if(result!=false){
                    that.setData({
                        tradeList:result.data
                    })
                }
            })
        }
        else if(who==1){ //如果操作者是发布人
            //修改跳转地址到添加交易的页面
            this.setData({
                url: '../../components/addtrade/addtrade?id='
            })
            //修改查询目标到发布者
            let where={
                publisher: _.eq(options.id),
                state: _.neq(-1)
            }
            let res=tradeService.dbSearch('trade',where,'个人交易页获取成功')
            res.then(function(result){
                if(result!=false){
                    that.setData({
                        tradeList:result.data
                    })
                }
            })
        }
        else  console.error();
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
            tradeList:[],
            url:'../../components/tradeItem/tradeItem?id='
        })
        this.onLoad(this.data.options)
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})