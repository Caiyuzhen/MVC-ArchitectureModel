const express = require('express')
const bodyParser = require('body-parser')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')


// 创建 express 实例
const app = express()
app.use(bodyParser.urlencoded({ extended: true })) //🔥 bodyParser 处理 url 中的 post 请求
app.use(bodyParser.json()) //处理 json 数据
app.all('*', (req, res, next) => { //🔥前后端不同源，需要处理跨域！设置 header
	res.header('Access-Control-Allow-Origin', '*') //🔥🔥🔥在响应的时候, 让所有的源都同意跨域
	res.header('Access-Control-Allow-Methods', 'GET, POST') //🔥🔥🔥在响应的时候, 允许跨域的方法
	next() //🔥要执行下一个 api 中间件！不写 next 就不会执行下面的 api 了！
})



// 添加列表的 api, post 请求, 需要把 body （id、brand、model、price、spec）添加进数据库里边
app.post('/add_mobileInfo', (req, res) => {
	// 读取
	const mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	),'utf8'))

	// 🔥🔥🔥🔥生成新的 id, 名字不能自定义！🔥🔥🔥不然 push 进去的 id 名会有问题！
	const id = Number(mobileData[mobileData.length - 1].id + 1)

	mobileData.push({
		id, //👈👈👈记得把 id 放第一位!!! 
		...req.body //...👈👈👈扩展运算符 要放最后！！！
	})

	// 写入
	writeFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), JSON.stringify(mobileData))


	// 🔥把最新加入的那项返回给前端！
	const newMobileInfo = mobileData[mobileData.length - 1]
	// res.send(newMobileInfo)  //🔥🔥会返回一个新的带 id 的最终数据给到前端去做处理!!!
	res.send({
		status: 200,
		id: id,
		msg: '添加成功',
		newMobileInfo: newMobileInfo
	})
})



// 获得列表的 api
app.get('/get_mobile_list', (req, res) => {
	const mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), 'utf8'))

	res.send(mobileData)
})



// 获得详情的 api, post 请求, 需要拿到 id
app.post('/get_mobile_detail', (req, res) => {
	// 拿到 id
	const _id = Number(req.body.id) //🔥🔥需要转为数字类型！！  🔥🔥🔥把【字符串】 id 更改为 【Number 类型】的 id！
	
	// 读取数据
	const mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), 'utf8'))

	const mobileDetail = mobileData.find(item => item.id === _id)

	// 🔥🔥把数据传回给前端
	// 判断是否有数据
	if (mobileDetail) {
		res.send(mobileDetail)
	}
	else {
		res.send({
			code: 404,
			id: _id,
			msg: '没有找到该数据'
		})
	}
})




// 移除列表的 api, post 请求, 需要拿到 _id
app.post('/remove_mobile_list', (req, res) => {
	const _id = Number(req.body.id)
	console.log('👋 拿到 id 为：', + _id)

	// 读取
	let mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), 'utf8'))

	mobileData = mobileData.filter(item => item.id !== _id)

	// 写入
	writeFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), JSON.stringify(mobileData))

	// 🔥🔥把数据跟状态码传回给前端
	// res.send(_id)
	res.status(200).json({
		status: 200,
		data: _id
	})
})


// 🔥监听端口
app.listen(8080, () => {
	console.log('🤙 Server OK ~')
})