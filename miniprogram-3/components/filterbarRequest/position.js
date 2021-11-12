const sortData = {
  value: '0',
  label: '排序',
  children: [{
    value: '0',
    label: '最新发布'
  }, {
    value: '1',
    label: '价格升序'
  }, {
    value: '2',
    label: '价格降序'
  }, {
    value: '3',
    label: '距离最近'
  }]
}

const taskData = {
  value: '1',
  label: '委托类别',
  children: [{
    value: '0',
    label: '不限'
  }, {
    value: '1',
    label: '外卖代拿'
  }, {
    value: '2',
    label: '快递代拿'
  }, {
    value: '3',
    label: '其他'
  }]
}

const questionData = {
  value: '2',
  label: '问答类别',
  children: [{
    value: '0',
    label: '不限'
  }, {
    value: '1',
    label: '学习'
  }, {
    value: '2',
    label: '生活'
  }, {
    value: '3',
    label: '讲座'
  }, {
    value: '4',
    label: '比赛'
  }, {
    value: '5',
    label: '实习'
  }]
}

const tradeData = {
  value: '3',
  label: '交易类别',
  children: [{
    value: '0',
    label: '不限'
  }, {
    value: '1',
    label: '书籍'
  }, {
    value: '2',
    label: '食品'
  }, {
    value: '3',
    label: '日用品'
  }, {
    value: '4',
    label: '电子产品'
  }, {
    value: '3',
    label: '其他'
  }]
}

const priceData = {
  value: '4',
  label: '价格区间'
}

module.exports = {
  sortData: sortData,
  taskData: taskData,
  questionData: questionData,
  tradeData: tradeData,
  priceData: priceData
}