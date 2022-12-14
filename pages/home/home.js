// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    components: [
      {
        key: 'calender',
        name: '日历',
        description: '日历组件用于选择日期或日期区间。'
      },
      {
        key: 'date-time-picker',
        name: '时间选择器',
        description: '时间选择器用于获取/选择当前具体时间详情。'
      },
      {
        key: 'tree-select',
        name: '树形级联选择器',
        description: '树形级联选择器用于多层级联动。'
      },
      {
        key: 'def-panel',
        name: 'Form 表单',
        description: '该组件用于表单提交及校验。'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getDateList(e) {
    console.log(e, '----------------> eee')
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