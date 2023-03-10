// ð¥å¼å¥è¯»åãä¿®æ¹æä»¶çæ¨¡å
const {
	readFileSync,
	writeFileSync,
} = require('fs')

// ð¥å¼å¥å¤çè·¯å¾çæ¨¡å
const {
	resolve
} = require('path')



// â¡ï¸æ¸²æææææºçåè¡¨é¡µ
function getMobileDateList () {
	// ðè¯»åæ°æ®: è¯»ååºæ¥æ¯ä¸ªå­ç¬¦ä¸², æä»¥è¿è¦è§£ææä¸ºä¸ä¸ªå¯¹è±¡
	const mobileDetailData = JSON.parse(readFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), 'utf8')) //ç¨ utf8 çç¼ç å½¢å¼æ¥è¯»å

	return mobileDetailData
}




// â¡ï¸å é¤å¯¹åºçåè¡¨
function removeMobileDate (_id) {
	// ðè¯»åæ°æ®
	let mobileDetailData = JSON.parse(readFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), 'utf8'))

	console.log(mobileDetailData);

	mobileDetailData = mobileDetailData.filter(item => item.id != _id)//éæ°èµå¼(è¿æ»¤æç¸ç­ç)

	// âï¸åå¥æ°æ®
	writeFileSync(resolve(
		__dirname, 
		'../data/mobile.json'
	), JSON.stringify(mobileDetailData)) //ð¥ð¥ð¥åå¥æä»¶æ¶è®°å¾ ãJSON.stringifyã è½¬åå­ç¬¦ä¸²ï¼ï¼
}




// â¡ï¸å¢å å¯¹åºçåè¡¨
function addMobile (mobileInfo) {
	// ðè¯»ååºæ¥çæä»¶æ°æ®æ¯å­ç¬¦ä¸²ï¼æä»¥è¦åè§£ææå¯¹è±¡
	const mobileDetailData = JSON.parse(readFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), 'utf8'))

	const id = mobileDetailData[mobileDetailData.length - 1].id + 1 //æ°ç id = æåä¸ä¸ª id + 1
	console.log(id);
	
	// æ controller å±åä¼ å¥çæ°å¢çæ°æ®ä¼ å¥å°ãè¯»ååºæ¥çæ°æ®ãä¸­
	mobileDetailData.push({
		id,
		...mobileInfo,
	})

	//âï¸åå¥æ°æ®
	writeFileSync(resolve(
		__dirname,
		'../data/mobile.json'
	), JSON.stringify(mobileDetailData))
	
	return mobileDetailData[mobileDetailData.length - 1] //ððææ°å¢çè¿é¡¹è¿ååºå» (æç»è¿åç»åç«¯)
}




module.exports = {
	getMobileDateList,
	removeMobileDate,
	addMobile
}