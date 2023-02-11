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
	let _id = Number(req.body.id) //🔥🔥需要转为数字类型！！  🔥🔥🔥把【字符串】 id 更改为 【Number 类型】的 id！
	
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
	// console.log(_id)

	// 读取
	const mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), 'utf8')).filter(item => item.id !== _id)

	// 写入
	writeFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), JSON.stringify(mobileData))

	// 🔥🔥把数据传回给前端
	res.send(_id)
})



// 添加列表的 api, post 请求, 需要把 body （id、brand、model、price、spec）添加进数据库里边
app.post('/add_mobileInfo', (req, res) => {
	// 读取
	const mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	),'utf8'))

	// 生成新的 id
	const newId = mobileData[mobileData.length - 1].id + 1

	mobileData.push({
		...req.body,
		newId
	})

	// 写入
	writeFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), JSON.stringify(mobileData))


	// 🔥把最新加入的那项返回给前端！
	const newMobileInfo = mobileData[mobileData.length - 1]
	res.send(newMobileInfo)
})


// 🔥监听端口
app.listen(8080, () => {
	console.log('🤙 Server OK ~')
})