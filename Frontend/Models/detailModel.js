// 导入 qs , url 参数化库, 可以将一个普通的object序列化成一个查询字符串，也可以将一个查询字符串解析成一个object
import Qs from 'qs'


export function getMobileDetailModel (params) {
	return axios.post('http://localhost:8080/get_mobile_detail', Qs.stringify(params))
}