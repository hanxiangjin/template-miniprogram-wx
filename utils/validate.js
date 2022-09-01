// 检验是否为空
const isEmpty = function(val) {
  return val === '' || val === null || val === undefined
}
module.exports = {
  validateMap: {
    'name': {
      name: '姓名',
    },
    'phone': {
      name: '手机号码',
      required: true,
      validator: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    },
    'hphm': {
      name: '车牌号码',
      // validator: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
    },
    'idno': {
      name: '身份证号码',
      validator: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
      required: true,
      rely: 'hasIdCard',
      relyVal: 1
    }
  },
  validate: function(data) {
    let errMsg = null
    let valid = true
    const validator = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    for (let i = 0, length = data.length; i < length; i++) {
      let item = data[i]
      // 判断时候为空
      if (item.require && isEmpty(item.value)) {
        valid = false
        errMsg = `${item.label}不能为空`
        wx.showToast({
          icon: 'none',
          title: errMsg,
          duration: 1500
        })
        return {
          errIndex: i,
          errMsg,
          valid
        }
      }
      if (item.key === 'phone' && !validator.test(item.value)) {
        valid = false
        errMsg = `${item.label}格式错误`
        wx.showToast({
          icon: 'none',
          title: errMsg,
          duration: 1500
        })
        return {
          errIndex: i,
          errMsg,
          valid
        }
      }
    }
    return {
      errIndex: -1,
      errMsg,
      valid
    }
  }
}