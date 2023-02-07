// 从 Models 层引入数据
const listModel = require('../Models/list')


// 控制器层
function listView (req, res) {
	//获得 listModel 层返回的数据
	const mobileData = listModel.getMobileDateList()

	res.render('list', {
		title: 'Mobile List',
	})
}

module.exports = {
	listView
}