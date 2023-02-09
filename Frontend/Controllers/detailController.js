import { DetailView } from '../views/index'


export function DetailController (params) {
	// 🔥拿到 url 的参数, 去 model内获取数据
	console.log(params)

	return DetailView ()
}