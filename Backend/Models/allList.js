// 🔥引入读取、修改文件的模块
const {
	readFileSync,
	writeFileSync,
} = require('fs')

// 🔥引入处理路径的模块
const {
	resolve
} = require('path')



// ⚡️渲染所有手机的列表页
function getMobileDateList () {
	// 👀读取数据: 读取出来是个字符串, 所以还要解析成为一个对象
	const mobileDetailData = JSON.parse(readFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), 'utf8')) //用 utf8 的编码形式来读取

	return mobileDetailData
}




// ⚡️删除对应的列表
function removeMobileDate (_id) {
	// 👀读取数据
	let mobileDetailData = JSON.parse(readFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), 'utf8'))

	console.log(mobileDetailData);

	mobileDetailData = mobileDetailData.filter(item => item.id != _id)//重新赋值(过滤掉相等的)

	// ✏️写入数据
	writeFileSync(resolve(
		__dirname, 
		'../data/mobile.json'
	), JSON.stringify(mobileDetailData)) //🔥🔥🔥写入文件时记得 【JSON.stringify】 转回字符串！！
}




// ⚡️增加对应的列表
function addMobile (mobileInfo) {
	// 👀读取出来的文件数据是字符串，所以要先解析成对象
	const mobileDetailData = JSON.parse(readFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), 'utf8'))

	const id = mobileDetailData[mobileDetailData.length - 1].id + 1 //新的 id = 最后一个 id + 1
	
	// 把 controller 层内传入的新增的数据传入到【读取出来的数据】中
	mobileDetailData.push({
		id,
		...mobileInfo,
	})

	//✏️写入数据
	writeFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), JSON.stringify(mobileDetailData))
	
	return mobileDetailData[mobileDetailData.length - 1] //🌟🌟把新增的这项返回出去 (最终返回给前端)
}




module.exports = {
	getMobileDateList,
	removeMobileDate,
	addMobile
}