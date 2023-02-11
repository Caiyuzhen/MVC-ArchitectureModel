import { ListView } from '../views/index' //🌟导入视图层
import { getMobileListModel, removeMobileModel } from '../Models/index'// 🌟导入 model 层去获取数据


// 🔥🔥Controller 层 (都在 router 内执行！), 发送 【Model 层】请求【获取数据】，传递给【视图层】
export async function ListController () {
	// 获取数据
	const res = await getMobileListModel()
	
	return ListView (res.data)
}



// 🌟🌟事件处理函数（移除列表）
export async function removeListController () {
	const oMobileListItem = document.querySelector('#mobileList')

	function bindEvent () {
		oMobileListItem.addEventListener('click', handleRemoveBtnClick, false)
	}

	function handleRemoveBtnClick (event) {
		const tar = event.target

		if(tar.className === 'remove-btn') {
			// console.log(tar)
			// 🔥 拿到 id 才知道移除哪一项！
			// const _id = Number(tar.dataset.id)
			const _id = tar.dataset.id
			// console.log(_id)


			// 让 model 层去移除数据, 🔥因为是个 Promise, 所以可以用 .then！
			removeMobileModel(_id).then(res => {
				// 🔥 Model 数据删除成功了才能让 view 层去移除 dom
				if(res.status === 200) {
					console.log(res.data)
				} else {
					console.log('删除失败')
				}

				// tar.parentNode.remove()
				// console.log(_id);
			})

			//让 view 层去移除 dom
			// tar.parentNode.remove()
		}
	}

	// 总开关
	bindEvent ()
}