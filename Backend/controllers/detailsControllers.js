function detailsView (req, res) {
	res.render('detail', {
		title: 'Detail',
	})
}


module.exports = {
	detailsView
}