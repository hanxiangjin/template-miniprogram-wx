const dateTimePicker = require('../../../utils/datetTimePicker')

Component({
	properties: {
		currentDate: {
			value: '',
			type: String
		},
		placeholder: {
			value: '请选择时间',
			type: String
		},
    exttime: {
      value: '',
      type: String
    }
	},
	data: {
		dateTimeArray: [],
		dateTime: '',
		storageTime: [] // 日期选择器暂存值
	},
	lifetimes: {
		attached () {
			let { dateTimeArray, dateTime } = dateTimePicker.dateTimePicker()
			const currentDate = this._dataTimeFormat(dateTime, dateTimeArray)
			this.setData({
				dateTimeArray,
				// dateTime: !!this.data.exttime ? this.data.exttime : dateTime,
				dateTime,
				storageTime: dateTime,
				currentDate: !!this.data.exttime ? this.data.exttime : currentDate
			})
			this.triggerEvent('updateDate', currentDate)
		},
	},
	methods: {
		_handleChange (e) {
			const { value } = e.detail
			const selDate = this._dataTimeFormat(value)
			this.setData({
				currentDate: selDate,
				dateTime: value
			})
			this.triggerEvent('updateDate', selDate)
		},
		_handleCancel () {
			this.setData({
				dateTime: this.data.dateTime,
				storageTime: this.data.dateTime
			})
		},
		/**
		 * @desc 日期选择列改变时
		 * @date 2022/2/9
		 * @param
		 */
		_handleColumnChange (e) {
			const { column, value } = e.detail
			const { dateTimeArray, storageTime } = this.data
			
			// 将日期选择器滚动位置的值暂存
			storageTime[column] = value
			this.setData({
				storageTime
			})
			
			if (column === 1) {
				const [ storageYear, storageMonth ] = this.data.storageTime
				const days = dateTimePicker.getMonthDay(dateTimeArray[0][storageYear], dateTimeArray[1][storageMonth])
				dateTimeArray.splice(2, 1, days)
				console.log('log - dateTimeArray ---------------->', dateTimeArray)
				this.setData({
					dateTimeArray
				})
			}
		},
		/**
		 * @desc 展示时间格式化
		 * @date 2022/2/9
		 * @param
		 */
		_dataTimeFormat (dateTime, dataArray) {
			const [ yearArr, monthArr, dayArr, hourArr, minArr, secArr ] = dataArray || this.data.dateTimeArray
			const [ year, month, day, hour, min, sec ] = dateTime
			return `${ yearArr[year] }-${ monthArr[month] }-${ dayArr[day] } ${ hourArr[hour] }:${ minArr[min] }:${ secArr[sec] }`
		}
	}
})
