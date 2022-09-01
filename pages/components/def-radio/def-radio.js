Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radioList: {
      type: Array,
      value: []
    },
    activeIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  ready () {
    // 初始化
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectRaio(e) {
      const { val, index } = e.currentTarget.dataset
      console.log(val, '-------> val')
      this.triggerEvent('selectRadio', {...val, index})
    }
  }
})