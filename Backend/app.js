const express = require('express')
const { join } = require('path')
const router = require('./router') // 导入路由

// 实例化
const app = express()



// 第二步: 🔥设置路由
app.use(router)


// 第一步: 🔥设置 view 层引擎（后端的 js 模板引擎）, 然后再在 router 内的 index.js 内去渲染模板！
app.set('view engine', 'ejs')
app.use(express.static(join(__dirname, 'public'))) //设置静态目录(前端的静态资源目录)



// 监听端口
app.listen(8080, () => {
	console.log('Server is running on port 8080')
})