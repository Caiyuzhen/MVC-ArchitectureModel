export default function ListView (mobileData) {
	console.log(mobileData);

	return `
		<h1> 👍 Mobile List </h1>
		<ul id="mobileList">
			${
				mobileData.map((item) => {
					return `
						<li>${ mobileListItem(item) }</li>
					`
				}).join('') //🔥因为 map 返回的数组有 , 作为分界线，所以要用 join 去掉
			}
		</ul>	
		${ mobileForm() }
	`
}


// 🔥渲染每一条 list Item 的函数 (li 里边的具体内容！)
export function mobileListItem (mobileInfo) {

	const { id, brand, model } = mobileInfo

	return `
		<a href="http:#/detail/${id} ">
			${brand + '' + model}
		</a>
		<button class="remove-btn" data-id="${ id }"> Delete </button>
	`
}


// 渲染提交表单的函数
function mobileForm () {
	return `
		<div>
			<p>
				<input type="text" placeholder="Brand" id="brand"/>
			</p>
			<p>
				<input type="text" placeholder="model" id="model"/>
			</p>
			<p>
				<input type="text" placeholder="price" id="price"/>
			</p>
			<p>
				<input type="text" placeholder="spec" id="spec"/>
			</p>
			<button id="addBtn">Add</button>
		</div>
	`
}