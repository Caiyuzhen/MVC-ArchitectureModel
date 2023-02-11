// 导入 qs , url 参数化库, 可以将一个普通的object序列化成一个查询字符串，也可以将一个查询字符串解析成一个object
import Qs from 'qs'


export function getMobileListModel () {
	// return 的是个 Promise 对象！！
	return axios.get('http://localhost:8080/get_mobile_list')
	// http://localhost:8080/get_mobile_list
}

export function removeMobileModel (id) {
	// return 的是个 Promise 对象！！
	return axios.post('http://localhost:8080/remove_mobile_list', Qs.stringify({id}))//🔥注意！这里的 id 不是个对象, 所以不能序列化！！要 {id}！！！
}

export function addMobileModel (mobileInfo) {
	// return 的是个 Promise 对象！！
	return axios.post('http://localhost:8080/add_mobileInfo', Qs.stringify(mobileInfo))
}