const { globalData } = getApp()
import { requestInfo } from '../../utils/request'

Page({
  data: {
    isShow: false,
    is_register: 0
  },
  async onLoad() {
    const user = wx.getStorageSync('userInfo')
		const userPhone = wx.getStorageSync('userPhone')
    console.log('log------------------------------->', 'user')
		console.log(user)
		console.log(userPhone)
    if (user && userPhone) {
			globalData.userInfo = JSON.parse(user)
			globalData.userPhone = JSON.parse(userPhone)
      const code = await this.getMiniCode()
			console.log('log------------------------------->', 'code')
			console.log(code)
			if(!code) {
				wx.showToast({
					title: '登录失败',
          icon: 'none',
          duration: 1500
				})
				return
			}
			// 获取openId
			// const res = await requestInfo({
			// 	url: 'user/login',
			// 	data: {
			// 		code
			// 	}
			// })

      this.setData({
				// 跳过登录接口
        // is_register: res.is_register
        is_register: 1
      })
			this.toNext()
		} else {
			const code = await this.getMiniCode()
			console.log('log------------------------------->', 'code')
			console.log(code)
			if(!code) {
				wx.showToast({
					title: '登录失败',
          icon: 'none',
          duration: 1500
				})
				return
			}
			// 获取openId
			// const res = await requestInfo({
			// 	url: 'user/login',
			// 	data: {
			// 		code
			// 	}
			// })
			// 获取小程序code
			this.setData({
				isShow: true
			})

      this.setData({
				// 跳过登录接口
        // is_register: res.is_register
        is_register: 1
      })

			wx.setStorage({
				key: 'userInfo',
				data: JSON.stringify({
					// 跳过
					// openid: res.openid,
					// session_key: res.session_key

					openid: 'this is openid',
					// session_key用于解密微信加密过的数据
					session_key: 'this is session_key'
				})
			})
			globalData.userInfo = {
				// 跳过
				// openid: res.openid,
				// session_key: res.session_key

				openid: 'this is openid',
				session_key: 'this is session_key'
			}
		}
  },
  async getPhoneNumber (e) {
		const { errMsg, encryptedData, iv } = e.detail
		const { session_key } = globalData.userInfo
		if (errMsg === 'getPhoneNumber:fail user deny') {
			wx.showModal({
				title: '提示',
				content: '需要授权才能继续，请重新点击并授权！',
				showCancel: false
			})
			return
		}
		try {
			// 此处用户于后端交互获取加密的手机号
			// const res = await requestInfo({
			// 	url: 'user/dataCrypt',
      //   type: 'POST',
			// 	data: {
			// 		encryptedData,
			// 		iv,
			// 		sessionKey: session_key,
			// 		appid: wx.getAccountInfoSync().miniProgram.appId
			// 	}
			// })

      // wx.setStorageSync('userPhone', res.phoneNumber)
			// globalData.userPhone = res.phoneNumber

      this.toNext()
		} catch (e) {
			console.log('log------------------------------->', 'e')
			console.log(e)
		}
	},

  /* 获取小程序code */
	getMiniCode () {
		return new Promise((resolve, reject) => {
			wx.login({
				success: res => {
          console.log(res, 'wx.login -----------> res')
					resolve(res.code)
				}
			})
		})
	},

  toNext () {
		wx.reLaunch({
			url: '/pages/home/home'
		})
  }
})
