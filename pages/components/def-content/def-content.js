Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '标题'
    }
  },

  options:{
    multipleSlots:true   //这样就可以设置多个slot插槽
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
  }
})