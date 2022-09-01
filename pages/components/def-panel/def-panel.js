Component({
  /**
   * 组件的属性列表
   */
  properties: {
    formList: {
      type: Array,
      value: []
    },
    errIndex: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    picker_index: null
  },

  ready () {
    // 初始化
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 表单改变是触发的事件
    handleChange (e) {
      console.log('handleChange改变，携带值为', e.detail.value, e)
      const { type, index: index1, key, disable } = e.currentTarget.dataset
			const { value, index: index2 } = e.detail
      console.log(this.data.formList, '-----> formList')
      switch (type) {
        case 'radio':
          console.log(e, '--------> cData')
          if (!disable) {
            this.setData({
              [`formList[${index1}].value`]: value,
              [`formList[${index1}].curIndex`]: index2
            })
          }
          if (key === 'jkzt' && parseInt(value) === 2) {
            this.setData({
              [`formList[${index1+1}].hidden`]: false
            })
          } else if (key === 'jkzt' && parseInt(value) === 1) {
            this.setData({
              [`formList[${index1+1}].hidden`]: true,
              [`formList[${index1+1}].value`]: ''
            })
          }
          break
        case 'input':
          this.setData({
            [`formList[${index1}].value`]: value
          })
          break
        case 'select':
          const id = this.data.formList[index1].rangeList[value].id
          const name = this.data.formList[index1].rangeList[value].name
          this.setData({
            [`formList[${index1}].value`]: id,
            [`formList[${index1}].rindex`]: value
          })
          // 如何下拉菜单是选择公司，需要联动获取改公司下的部门
          if (key === 'company' || key === 'companyid') {
            this.triggerEvent('changeDepartmentList', id)
          }
          if (key === 'jclb') {
            wx.showModal({
              title: '检测类别',
              content: name,
              showCancel: false,
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
          break
        case 'date':
          console.log('时间------------->', e.detail)
          console.log(index1, '-----------> index1')
          this.setData({
            [`formList[${index1}].value`]: e.detail
          }, () => {
            console.log(this.data.formList, '-----> this.data.formList')
          })
          break
        case 'treeSelect':
          var itemid = e.detail.itemid
          var itemval = e.detail.value
          console.log("所选中的分区编号：" + itemid + "， 名称：" + itemval)
          this.setData({
            [`formList[${index1}].value`]: itemid
          })
          break
        default:
          console.log(this.data.formList, '-----> formList')
      }

      // 提交数据
      this.triggerEvent('personInfo', this.data.formList)
    },

    // tapItem: function (e) {
    //   var itemid = e.detail.itemid
    //   var itemval = e.detail.value
    //   console.log("所选中的分区编号：" + itemid + "， 名称：" + itemval)
    // }
  }
})