export default function DetailView (params) {
	console.log(params);
	const { id, brand, model, price, spec } = params

	if (!params) {
		// 执行相应的错误处理
		return '<h1>Error: 没有找到该数据</h1>'
	}
	
	// 👇数据已经是详情了, 所以不用再像列表那样 map 遍历了！
	return `
		<h1>Brand: ${brand} </h1>
		<h2>Model: ${model} </h2>
		<h3>Price: ${price} </h3>
		<h4>Spec: ${spec} </h4>
	`
}