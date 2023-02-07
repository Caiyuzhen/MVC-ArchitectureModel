

// 控制器层
function detailsView (req, res) {

	//🔥调用 Model 层, 获取 Model 层返回的数据

	res.render('detail', {
		title: 'Detail',
	})
}


module.exports = {
	detailsView
}