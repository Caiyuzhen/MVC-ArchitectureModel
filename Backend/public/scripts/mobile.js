// 导入 axios 
// const axios = require('axios');


// 立即执行函数,独立的作用域，避免污染全局
(()=>{

	// 点击 ul 做事件代理，找到 removeBtn 这个事件源
	const onMobileList = document.querySelector('#mobileList')
	const oBrand = document.querySelector('#brand')
	const oModel = document.querySelector('#model')
	const oPrice = document.querySelector('#price')
	const oSpec = document.querySelector('#spec')
	const oAddBtn = document.querySelector('#addBtn')


	// 按钮点击事件（判断点击的是不是 remove 按钮）
	function handleRemoveBtnClick (e) {
		const target = e.target
		const className = target.className

		if(className === 'remove-btn') {
			// 获取 id 值
			const id = target.dataset.id

			// 执行移除的 Axios 请求
			removeMobileList(target, id) //🔥🔥因为要删除整个 target （整个 <li></li>, deleteBtn 在 li 内！）
		}
	}


	// 移除 list 的 Axios 请求
	function removeMobileList (target, id) {
			axios.post('http://localhost:8080/list/removeMobile', {
			id //传入 id 
		}).then(res => {
			target.parentNode.remove()
		})
	}


	// 新增 list
	function handleAddBtnClick () {
		if(
			oBrand.value.length === 0 || 
			oModel.value.length === 0 || 
			oPrice.value.length === 0 || 
			oSpec.value.length === 0
		) {
			alert('内容不能为空!')
			return
		}

		// 发送请求
		addMobileData({
			brand: oBrand.value,
			model: oModel.value,
			price: oPrice.value,
			spec: oSpec.value
		}) 
	}


	// 新增 list 的 Axios 请求
	function addMobileData (mobileInfo) {
		axios.post('http://localhost:8080/list/addMobile', mobileInfo).then(
			res => { //axios 内返回的数据需要用🌟🌟 res.data 来获取！
				createMobileListItem(res.data)
				resetForm()
			}
		)
	}


	// 创建一个新的 list 
	function createMobileListItem ({id, brand, model, price, spec}) { //🔥🔥直接在里边解构!
		const oItem = document.createElement('li')
		oItem.innerHTML = `
			<a href="http://localhost:8080/detail/${id}">
				${ brand + '' + model }
			</a>
			<button class="remove-btn" id="${id}"> Remove </button>
		`

		// 🔥🔥🔥操作 DOM, 把新的 list 添加到 ul 里！
		onMobileList.appendChild(oItem)
	}


	// 清空输入框
	function resetForm () {
		oBrand.value = '',
		oModel.value = '',
		oPrice.value = '',
		oSpec.value = ''
	}


	// 绑定事件
	function bindEvent() {
		onMobileList.addEventListener('click', handleRemoveBtnClick, false)
		oAddBtn.addEventListener('click', handleAddBtnClick, false)
	}


	// 总开关
	const init = () => {
		bindEvent()
	}

	init()
})()