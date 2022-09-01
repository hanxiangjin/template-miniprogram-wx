// const _domain = 'https://ddc.u-road.com'
const _domain = 'https://yngst-ycic.com'
const apiPath = '/Yngsfydj/index.php?s=/index/'
const { globalData } = getApp()
// 日志管理
const realTimeLog = wx.getRealtimeLogManager() ? wx.getRealtimeLogManager() : null;

module.exports = {
	requestInfo (options) {
		options.url = `${_domain}${apiPath}${options.url}`
		
		if (!options.noShowLoad) {
			wx.showLoading({
				title: '加载中',
			})
		}
		return new Promise((resolve, reject) => {
			wx.request({
				url: options.url,
				method: options.method ? options.method : 'POST',
				data: options.data,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success (res) {
          console.log(res, '-----------> request res')
          realTimeLog.info("request.js - line26 - 接口调用成功 - res")
          realTimeLog.info(JSON.stringify(res))
					if (!options.noShowLoad) {
						wx.hideLoading()
					}
					if (res.data.Success) {
						resolve(res.data.data)
					} else {
						wx.showModal({
							title: '提示',
							content: res.data.Message || `网络错误`,
							showCancel: false
						})
						reject(res.data)
					}
				},
				fail (err) {
					reject(err)
          realTimeLog.error('request.js - line45 - 接口调用失败 - err')
          realTimeLog.error('------> userInfo',JSON.stringify(globalData.userInfo))
          realTimeLog.error(JSON.stringify(err))
					if (!options.noShowLoad) {
						wx.hideLoading()
					}
				}
			})
		})
	}
}
