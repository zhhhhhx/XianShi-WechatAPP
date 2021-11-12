const positionData = require('position.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: ''
    },
    top: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 显示控制，false不显示，true显示下拉列表
    sort: false,
    task: false,
    price: false,
    // 筛选栏的数据来源
    sortData: {},
    taskData: {},
    priceData: {},
    sortSelected: '0',
    taskSelected: '0',
    priceSelected: '0',
    // 返回筛选下来的参数对象数组
    selectedArray: []
  },

  /**
   * 组件生命周期
   */
  attached() {
    if (this.properties.mode === 'position') {
      this.setData({
        sortData: positionData.sortData,
        taskData: positionData.taskData,
        priceData: positionData.priceData
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 第一项类型的下拉列表激活（同时隐藏其他的下拉列表）
    onSortActive: function(e) {
      this.setData({
        sort: !this.data.sort,//取反，点一下打开，再点一下关闭
        task: false,
        price: false
      })
    },
    // 第二项单选的下拉列表的激活
    onTaskActive: function(e) {
      this.setData({
        sort: false,
        task: !this.data.task,//取反，点一下打开，再点一下关闭
        price: false
      })
    },
    // 第三项的排序的下拉列表的激活
    onPriceActive: function(e) {
      this.setData({
        sort: false,
        task: false,
        price: !this.data.price,//取反，点一下打开，再点一下关闭
      })
    },
    // 向数组添加唯一参数（小程序没有集合set对象）
    addUnique2Array: function(array, args) {
      const _args = args.target ? args.target.dataset : args
      const value = _args.group.value + ':' + _args.item.value
      const label = _args.group.label + ':' + _args.item.label
      let flag = false
      for (let i = 0; i < array.length; i++) {
        const group = value.split(':')[0]
        const arrayGroup = array[i].value.split(':')[0]
        // 找到该组
        if (arrayGroup === group) {
          array[i].value = value
          array[i].label = label
          flag = true
        }
      }
      if (!flag) {
        array.push({
          value: value,
          label: label
        })
      }
    },
 
    // 排序
    onSort: function(e) {
      this.closeFilter()
      this.setData({
        sortSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },

     // 委托
     onTask: function(e) {
      this.closeFilter()
      this.setData({
        taskSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },

    
    // 价格
    onPrice: function(e) {
      this.closeFilter()
      this.setData({
        priceSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('confirm', {
        selectedArray: this.data.selectedArray
      })
    },
    
    // 关闭筛选
    closeFilter: function() {
      this.setData({
        sort: false,
        task: false,
        price: false
      })
    },
  }
})