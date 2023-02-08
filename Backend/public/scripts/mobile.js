// 导入 axios 
// const axios = require('axios');


// 立即执行函数,独立的作用域，避免污染全局
(()=>{

	// 点击 ul 做事件代理，找到 removeBtn 这个事件源
	const onMobileList = document.querySelector('#mobileList')


	// 按钮点击事件（判断点击的是不是 remove 按钮）
	function handleRemoveBtnClick (e) {
		const target = e.target
		const className = target.className

		if(className === 'remove-btn') {
			// 获取 id 值
			const id = target.dataset.id

			// 执行移除的操作
			removeMobileList(target, id) //🔥🔥因为要删除整个 target （整个 <li></li>, deleteBtn 在 li 内！）
		}
	}


	// 移除的函数
	function removeMobileList (target, id) {
			axios.post('http://localhost:8080/list/removeMobile', {
			id //传入 id 
		}).then(res => {
			target.parentNode.remove()
		})

	}


	// 绑定事件
	function bindEvent() {
		onMobileList.addEventListener('click', handleRemoveBtnClick, false)
	}


	const init = () => {
		bindEvent()
	}

	init()
})()