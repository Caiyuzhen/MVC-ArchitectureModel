import { ListView, mobileListItem } from '../Views/index' //🌟导入视图层
import { addMobileModel, getMobileListModel, removeMobileModel } from '../Models/index'// 🌟导入 model 层去获取数据



// 🔥🔥Controller 层 (都在 router 内执行！), 发送 【Model 层】请求【获取数据】，传递给【视图层】
// listController.js 处理 list 页面、移除列表、添加列表的逻辑！！

// 🌟🌟渲染 list 页面 (⚡️ 在 router -> index.js 路由文件内执行)
export async function ListController () {
	// 获取数据
	const res = await getMobileListModel()
	
	return ListView (res.data)
}



// 🌟🌟事件处理函数（移除列表）(⚡️ 在 router -> index.js 路由文件内执行)
export async function removeListController () {
	const oMobileListItem = document.querySelector('#mobileList')

	function bindEvent () {
		oMobileListItem.addEventListener('click', handleRemoveBtnClick, false)
	}

	// 异步函数！
	async function handleRemoveBtnClick (event) {
		const tar = event.target

		if(tar.className === 'remove-btn') {
			// console.log(tar)
			// 🔥 拿到 id 才知道移除哪一项！
			// const _id = Number(tar.dataset.id)
			const _id = tar.dataset.id
			// console.log(_id)


			// 🔥🔥🔥写法一: 使用 try catch 捕获 model 层 Promise 异步函数的错误
			try {
				const res = await removeMobileModel(_id) //⚡️⚡️res 是我们定义的 remove api 的返回值！！
				// 🔥 Model 数据删除成功了才能让 view 层去移除 dom
				if(res.status === 200) {
					console.log(res.data)
					tar.parentNode.remove()
				} else {
					alert('删除失败')
				}
			} catch (err) {
				console.log(err)
			}

			// 🔥🔥🔥写法二: 直接让 model 层去移除数据, 🔥因为是个 Promise, 所以可以用 .then！
			// removeMobileModel(_id).then(res => {
			// 	// 🔥 Model 数据删除成功了才能让 view 层去移除 dom
			// 	if(res.status === 200) {
			// 		console.log(res.data)
			// 		tar.parentNode.remove()
			// 	} else {
			// 		alert('删除失败')
			// 	}
			// })

		}
	}
	// 总开关
	bindEvent ()
}



// 🌟🌟 事件处理函数（添加列表）(⚡️ 在 router -> index.js 路由文件内执行)
export async function addMobileListController () {
	const oMobileList = document.querySelector('#mobileList') //🌲最终要挂载的树！
	const oAddBtn = document.querySelector('#addBtn')
	const oBrandInfo = document.querySelector('#brand')
	const oModelInfo = document.querySelector('#model')
	const oPriceInfo = document.querySelector('#price')
	const oSpecInfo = document.querySelector('#spec')

	function bindEvent () {
		oAddBtn.addEventListener('click', handleAddBtnClick, false)
	}

	// 点击的事件函数
	async function handleAddBtnClick () {
		if (oBrandInfo.value.length === 0 ||
			oModelInfo.value.length === 0 ||
			oPriceInfo.value.length === 0 ||
			oSpecInfo.value.length === 0) 
		{
			alert('🌞 请填写完整 Mobile 信息')
			return
		}
		// 获得 value

		try {
			const res = await addMobileModel({
				brand: oBrandInfo.value,
				model: oModelInfo.value,
				price: oPriceInfo.value,
				spec: oSpecInfo.value
			})
			console.log(res.data) //status: 200

			if(res.data.status === 200) {
				// ⚡️把 api 返回的数据传入给下面的 createMobileListItem 函数！
				createMobileListItem(res.data.newMobileInfo) //🔥发送 Model 层的请求, 获取数据返回值, 传递给视图层
				resetFrom() //🔥重置清空表单
				alert('🌟 添加成功！')
			}
		} catch (err) {
			alert('🌞 添加失败！');
		}	
	}


	// 🔥🔥 操作 DOM 添加列表内容到 List 的 li 内
	function createMobileListItem (mobileInfo) {
		console.log(mobileInfo.id)
		const oLi = document.createElement('li') //具体内容
		oLi.innerHTML = mobileListItem (mobileInfo) //一条 list 
		oMobileList.appendChild(oLi) //🌲最终挂载到整棵树上！
	}


	// 重置清空表单
	function resetFrom () {
		oBrandInfo.value = ''
		oModelInfo.value = ''
		oPriceInfo.value = ''
		oSpecInfo.value = ''
	}

	// 总开关
	bindEvent ()
}