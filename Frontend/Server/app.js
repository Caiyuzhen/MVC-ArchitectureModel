const express = require('express')
const bodyParser = require('body-parser')
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')


// åå»º express å®ä¾
const app = express()
app.use(bodyParser.urlencoded({ extended: true })) //ð¥ bodyParser å¤ç url ä¸­ç post è¯·æ±
app.use(bodyParser.json()) //å¤ç json æ°æ®
app.all('*', (req, res, next) => { //ð¥ååç«¯ä¸åæºï¼éè¦å¤çè·¨åï¼è®¾ç½® header
	res.header('Access-Control-Allow-Origin', '*') //ð¥ð¥ð¥å¨ååºçæ¶å, è®©ææçæºé½åæè·¨å
	res.header('Access-Control-Allow-Methods', 'GET, POST') //ð¥ð¥ð¥å¨ååºçæ¶å, åè®¸è·¨åçæ¹æ³
	next() //ð¥è¦æ§è¡ä¸ä¸ä¸ª api ä¸­é´ä»¶ï¼ä¸å next å°±ä¸ä¼æ§è¡ä¸é¢ç api äºï¼
})



// æ·»å åè¡¨ç api, post è¯·æ±, éè¦æ body ï¼idãbrandãmodelãpriceãspecï¼æ·»å è¿æ°æ®åºéè¾¹
app.post('/add_mobileInfo', (req, res) => {
	// è¯»å
	const mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	),'utf8'))

	// ð¥ð¥ð¥ð¥çææ°ç id, åå­ä¸è½èªå®ä¹ï¼ð¥ð¥ð¥ä¸ç¶ push è¿å»ç id åä¼æé®é¢ï¼
	const id = Number(mobileData[mobileData.length - 1].id + 1)

	mobileData.push({
		id, //ðððè®°å¾æ id æ¾ç¬¬ä¸ä½!!! 
		...req.body //...ðððæ©å±è¿ç®ç¬¦ è¦æ¾æåï¼ï¼ï¼
	})

	// åå¥
	writeFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), JSON.stringify(mobileData))


	// ð¥æææ°å å¥çé£é¡¹è¿åç»åç«¯ï¼
	const newMobileInfo = mobileData[mobileData.length - 1]
	// res.send(newMobileInfo)  //ð¥ð¥ä¼è¿åä¸ä¸ªæ°çå¸¦ id çæç»æ°æ®ç»å°åç«¯å»åå¤ç!!!
	res.send({
		status: 200,
		id: id,
		msg: 'æ·»å æå',
		newMobileInfo: newMobileInfo
	})
})



// è·å¾åè¡¨ç api
app.get('/get_mobile_list', (req, res) => {
	const mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), 'utf8'))

	res.send(mobileData)
})



// è·å¾è¯¦æç api, post è¯·æ±, éè¦æ¿å° id
app.post('/get_mobile_detail', (req, res) => {
	// æ¿å° id
	const _id = Number(req.body.id) //ð¥ð¥éè¦è½¬ä¸ºæ°å­ç±»åï¼ï¼  ð¥ð¥ð¥æãå­ç¬¦ä¸²ã id æ´æ¹ä¸º ãNumber ç±»åãç idï¼
	
	// è¯»åæ°æ®
	const mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), 'utf8'))

	const mobileDetail = mobileData.find(item => item.id === _id)

	// ð¥ð¥ææ°æ®ä¼ åç»åç«¯
	// å¤æ­æ¯å¦ææ°æ®
	if (mobileDetail) {
		res.send(mobileDetail)
	}
	else {
		res.send({
			code: 404,
			id: _id,
			msg: 'æ²¡ææ¾å°è¯¥æ°æ®'
		})
	}
})




// ç§»é¤åè¡¨ç api, post è¯·æ±, éè¦æ¿å° _id
app.post('/remove_mobile_list', (req, res) => {
	const _id = Number(req.body.id)
	console.log('ð æ¿å° id ä¸ºï¼', + _id)

	// è¯»å
	let mobileData = JSON.parse(readFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), 'utf8'))

	mobileData = mobileData.filter(item => item.id !== _id)

	// åå¥
	writeFileSync(resolve(
		__dirname,
		'./Data/mobile.json'
	), JSON.stringify(mobileData))

	// ð¥ð¥ææ°æ®è·ç¶æç ä¼ åç»åç«¯
	// res.send(_id)
	res.status(200).json({
		status: 200,
		data: _id
	})
})


// ð¥çå¬ç«¯å£
app.listen(8080, () => {
	console.log('ð¤ Server OK ~')
})