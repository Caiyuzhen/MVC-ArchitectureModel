// 🔥引入读取跟修改文件的模块
const {
	readFileSync,
	writeFileSync,
} = require('fs')

// 🔥引入处理路径的模块
const {
	resolve
} = require('path')


function getMobileDateList() {
	//读取出来是个字符串, 所以还要解析成为一个对象
	const mobileDetailData = readFileSync(resolve((
		__dirname,
		'../data/mobile.json'
	), 'utf8')) //用 utf8 的编码形式来读取

	return mobileDetailData
}


module.exports = {
	getMobileDateList
}