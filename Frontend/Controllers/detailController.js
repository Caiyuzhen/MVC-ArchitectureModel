import { DetailView } from '../Views/index'
import { getMobileDetailModel } from '../Models/index'


// 🔥🔥Controller 层, 发送 【Model 层】请求【获取数据】，传递给【视图层】
export async function DetailController (params) {

	const res = await getMobileDetailModel(params)

	// 🔥拿到 url 的参数, 去 model内获取数据
	console.log(params)

	return DetailView (res.data)
}