// 统一导入, 可以一次性的导人所有的 controller
import { HomeController, ListController, DetailController, removeListController } from "../Controllers/index"


export default function (el) {
	const $app = document.querySelector(el)

	// 🔥路由 url
	const routes = [
		{
			//   http://localhost:5173/#/
			path: '/',
			view: HomeController,
			controllers: []
		},
		{
			//   http://localhost:5173/#/list
			path: '/list',
			view: ListController, //执行 ListController ()
			// view: () => `<h1>List</h1>`
			controllers: [
				removeListController  //执行 removeListController ()
			]
		},
		{
			//   http://localhost:5173/#/detail
			path: '/detail/:id',
			view: DetailController,
			controllers: []
		}
	]


	// 总开关
	const init = () => {
		bindEvent ()
	}


	// 🌟🌟执行 Controller 层
	function initController (routeInfo) {
		console.log(routeInfo)
		// && 短路运算！ item 其实就是 controller ! 🔥去遍历上边 routes = [...] 内的 controllers!
		routeInfo.controllers.length && routeInfo.controllers.forEach(item => item())//🔥如果不等于 0 就去执行所有 controllers 的函数！
	}


	// 🌟🌟绑定事件
	function bindEvent () {
		window.addEventListener('load', loadPathView, false) //页面加载时执行
		window.addEventListener('hashchange', loadPathView, false) //🔥当哈希值变化时执行
	}


	
	/*
		🔥🔥🔥🔥核心是拿到路由的参数 params 并传递给页面 view 进行渲染！！
		因为👆上边的路由 path 留了 detail 跟 :id 的参数占位！！下边是拿到具体的值, 所以是把具体的值给到参数的位置！！然后再渲染！
	*/
	function loadPathView () {
		// location.hash 可以拿到 => #/list
		// 🔥拿到路由, 处理两种路由路径:     /list       /detail/:id 
		// routes -> ['detail', 'id', 'name']
		//hash    -> ['detail', '1', 'Zeno']
		const pathInfo = getRouteInfo(location.hash)  //pathInfo 相当于从路由跟哈希中拿到的组合成的【🔥对象】
		// console.log(pathInfo)


		// 🔥🔥 将两个数组 routeInfo.params 和 pathInfo.params 中的数据进行映射，并将结果存储在对象 params 中
		routes.forEach(async item => {
			// 👇这里相当于传入假的自己代码写的路由地址, 用来和真实的路由地址进行比较！
			const routeInfo = getRouteInfo('#' + item.path) //传入👆上面路由定义的 path, 因为👇下面 getRouteInfo() 的方法中是去掉井号的, 所以这里要加上井号！！！
			// console.log(routeInfo) //返回的是 
			// console.log(routeInfo.viewName, pathInfo.viewName);

			if(routeInfo.viewName === pathInfo.viewName) { //🔥🔥如果当前页面打开的 viewName = routes 中的 viewName！比如 list 或 detail

				const params = {} //用来组装参数
				routeInfo.params.map((routeInfoItem, routeInfoIndex) => {
					pathInfo.params.map((item, index) => { //item 就是 pathInfo 的 item!!
						if(routeInfoIndex === index) {
							params[routeInfoItem] = item //键值对(routeInfoItem 作为键，item 作为值)
						}
					})
				})

				// 🔥🔥传递参数（在这个参数中，包含了路由参数和哈希值）
				$app.innerHTML = await item.view(params) //因为要调用的对象是个异步函数, 是个 promise 对象, 所以要加 await

				// 🔥🔥当上边的传参执行完后, DOM 渲染完成, 才能去绑定 DOM 的事件处理函数（Controller 内）！！！
				initController(item) //🔥传入 routes item!! 包含了路径、路径参数跟路径内包含的 controller 方法！
			}
		})
	}



	// 🔥解析当前路由
	function getRouteInfo (hash) { //🔥👆在上边传入 location.hash
		/*🔥🔥截取字符串的第二个字符到最后一个字符，即去掉字符串的第一个字符（#号）   🔥货然后 split() 方法用于 把一个字符串分割成字符串数组。  🔥filter() 方法来过滤掉空字符串！！
			会返回 ['detail', ':id', ':name]
			然后再把冒号去掉！ */
		// console.log(hash);
		const pathItems = hash.substring(1).split('/').filter(item => item !== '')  //🔥去掉 # 号！！
		const params = pathItems.slice(1).map(item => item.replace(':', '')) //🔥slice 表示 从第二个开始截取，即去掉第一个字符，然后 map() 方法处理把两个参数的冒号去掉！

		return {
			viewName: pathItems[0], // detail、list ...
			params // ['id', 'name']  ['1', 'zeno']  -> 路由参数 + 哈希值
			//组合成对象 {id: '1', name: 'zeno'}
		}
	}


	init()
}




