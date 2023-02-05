const { Router } = require('express')
const bodyParser = require('body-parser') //请求体解析中间件

const router = new Router()

// api 路由
router.get('/list', (req, res) => {
	// 第三步: 渲染模板, 🔥🔥默认路径是指向 【views】, 如果需要修改的话, 需要去到 app.js 内去添加静态的 static
	res.render('list', {
		title: 'List',  //可以提供一个变量给模板
	})
})

// api 路由, 【需要传参】
router.get('/detail/:id', (req, res) => {
	// 第三步: 渲染模板, 🔥🔥默认路径是指向 【views】, 如果需要修改的话, 需要去到 app.js 内去添加静态的 static
	res.render('detail', {
		title: 'Detail',  //可以提供一个变量给模板
	})
})


// 🔥🔥需要导出路由！！
module.exports = router