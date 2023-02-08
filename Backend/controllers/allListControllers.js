// 所有手机的列表页
// 从 Models 层引入数据
const listModel = require('../Models/allList')


// 控制器层（用来渲染 list）
function listView (req, res) {
	//🔥调用 Model 层, 获取 Model 层返回的数据
	const mobileListData = listModel.getMobileDateList()

	//🔥🔥🔥🔥因为这个函数是在 router 内被调用的, 所以 res 是 router 传递过来的回调参数, 所以可以直接 render 视图!!
	// 取自 json 的数据
	res.render('list', { //🔥list 指向的是 views 文件夹下的 list.ejs！！
		mobileListData
	})

	// 写死的数据
	// res.render('list', {
	// 	title: 'Mobile List',
	// })
}



/// 控制器层（用来删除 list）
function removeMobile (req, res) {
	const id = req.body.id //🔥🔥🔥 post 请求的数据（id）要在 body 内去拿, get 请求的数据（id）要在 params 内去拿！

	const resultId = listModel.removeMobileDate(id) //🔥🔥返回要移除的 list id

	res.send(resultId) //🔥🔥🔥 用来向客户端发送响应数据的方法
}




module.exports = {
	listView,
	removeMobile
}