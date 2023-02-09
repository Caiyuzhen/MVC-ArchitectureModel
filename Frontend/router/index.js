export default function (el) {
	const $app = document.querySelector(el)


	// 🔥路由 url
	const routes = [
		{
			path: '/',
			view: () => '<h1> HOME </h1>',
		},
		{
			path: '/list',
			view: () => '<h1> LIST </h1>',
		},
		{
			path: '/detail/:id',
			view: () => '<h1>detail</h1>',
		}
	]


	// 总开关
	const init = () => {
		bindEvent ()
	}


	// 绑定事件
	function bindEvent () {
		window.addEventListener('load', loadView, false) //页面加载时执行
		window.addEventListener('hashchange', loadView, false) //🔥当哈希值变化时执行
	}

	
	function loadView () {
		// location.hash 可以拿到 => #/list
		// 🔥拿到路由 url path -> /list     /detail/:id/:name/   ->   /detail/1
		// 路由的参数 routes -> [detail, index, name]
		const pathInfo = getRouteInfo(location.hash)

		routes.forEach(item => {
			const routeInfo = getRouteInfo('#' + item.path)

			if(routeInfo.viewName === pathInfo.viewName) {
				const params = {} //组装参数
				routeInfo.params.map((routeInfoItem, routeInfoIndex) => {
					pathInfo.params.map((item, index) => {
						if(routeInfoIndex === index) {
							params[routeInfoItem] = item //键值对
						}
					})
				})

				// 传递参数
				$app.innerHTML = item.view(params)
			}
		})
	}



	// 🔥解析路由
	function getRouteInfo (hash) {
		/*🔥🔥截取字符串的第二个字符到最后一个字符，即去掉字符串的第一个字符（#号）   🔥货然后 split() 方法用于 把一个字符串分割成字符串数组。  🔥filter() 方法来过滤掉空字符串！！
			会返回 ['detail', ':id', ':name]
			然后再把冒号去掉！ */
		console.log(hash);
		const pathItems = hash.substring(1).split('/').filter(item => item !== '')  //🔥去掉 # 号！！
		const params = pathItems.slice(1).map(item => item.replace(':', '')) //🔥slice 表示 从第二个开始截取，即去掉第一个字符，然后 map() 方法处理把两个参数的冒号去掉！

		return {
			viewName: pathItems[0], // detail
			params: pathItems // ['id', 'name']  ['1', 'zeno']
			//{id: '1', name: 'zeno'}
		}
	}


	init()
}