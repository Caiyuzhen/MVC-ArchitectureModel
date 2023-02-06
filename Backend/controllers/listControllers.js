function listView (req, res) {
	res.render('list', {
		title: 'List',
	})
}

module.exports = {
	listView
}