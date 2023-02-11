import { HomeView } from '../views/index'

// 🔥🔥Controller 层, 发送 【Model 层】请求【获取数据】，传递给【视图层】
export function HomeController () {
	return HomeView ()
}