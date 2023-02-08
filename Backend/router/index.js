const { Router } = require('express')
const bodyParser = require('body-parser') //请求体解析中间件
const listController = require('../controllers/allListControllers') // listController 命名空间
const detailsController = require('../controllers/detailInfoControllers')

// 🔥实例化路由组件
const router = new Router()

// 🔥处理前端传过来的 json 数据
const jsonParser = bodyParser.json()


// api 路由-渲染 list (抽象 Controller 的写法
router.get('/list', listController.listView)

// api 路由 (不抽象 Controller 的写法)
// router.get('/list', (req, res) => { 
// 	// 🚀🚀 req, res 相当于【控制器 controller】, 因为既要获取并提供数据, 又要渲染模板
// 	// 第三步: 渲染模板, 🔥🔥默认路径是指向 【views】, 如果需要修改的话, 需要去到 app.js 内去添加静态的 static
// 	res.render('list', { //渲染视图
// 		title: 'List',  //可以提供一个【 title 变量】给模板 <%= detail %>
// 	})
// })



// api 路由 -渲染 list 详情 (抽象 Controller 的写法)
router.get('/detail/:id', detailsController.detailsView)

// api 路由, 【需要传参】
// router.get('/detail/:id', (req, res) => { //req, res 相当于控制器 controller
// 	// 🚀🚀 req, res 相当于控制器 controller, 因为既要获取并提供数据, 又要渲染模板
// 	// 第三步: 渲染模板, 🔥🔥默认路径是指向 【views】, 如果需要修改的话, 需要去到 app.js 内去添加静态的 static
// 	res.render('detail', { //渲染视图
// 		title: 'Detail',  //可以提供一个【 title 变量】给模板
// 	})
// })



// api 路由 - 删除 list (抽象 Controller 的写法)
router.post('/list/removeMobile', jsonParser, listController.removeMobile) //🔥🔥🔥要先通过 jsonParser 中间键来处理前端传过来的 json 数据！


// api 路由 - 增加 list (抽象 Controller 的写法)
router.post('/list/addMobile', jsonParser, listController.addMobile)


// 🔥🔥需要导出路由！！
module.exports = router