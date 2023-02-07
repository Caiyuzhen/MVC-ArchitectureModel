// 从 Model 层引入数据
const detailModel = require('../Models/detailInfo')


// 详情页（需要过滤出每组 id 下的机型数据）
// 控制器层
function detailsView (req, res) { 

	// 拿到id
	const id = req.params.id

	// 传入 id, 获取对应 id 的数据,🔥🔥 mobileDetail 记得跟 view 层内的 getMobileDetailInfo 一致！！
	const mobileDetail = detailModel.getMobileDetailInfo(id) 

	//🔥🔥🔥🔥因为这个函数是在 router 内被调用的, 所以 res 是 router 传递过来的回调参数, 所以可以直接 render 视图!!
	res.render('detail', { //🔥detail 指向的是 views 文件夹下的 detail.ejs！！
		mobileDetail
	})

	// res.render('detail', { //🔥detail 指向的是 views 文件夹下的 detail.ejs！！
	// 	title: 'Detail',
	// })
}


module.exports = {
	detailsView
}