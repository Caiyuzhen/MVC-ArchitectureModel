// 引入读取、修改文件的模块
const { readFileSync } = require('fs')

// 引入处理路径的模块
const { resolve } = require('path')



// 获取单个手机详情页的数据
function getMobileDetailInfo (_id) {
	// 读取出 JSON 数据, 并解析成对象
	const MobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), 'utf8')) //用 utf8 的编码形式来读取


	const MobileDetailInfo = MobileData.find(item => item.id === _id) //🔥🔥返回找 id 对应的数据

	if (!MobileDetailInfo) {
		throw new Error('未找到对应的手机信息');
	}

	return MobileDetailInfo
	
}



// 导出模块(可以导出更多的 Model 函数)
module.exports = {
	getMobileDetailInfo
}