import { ListView, mobileListItem } from '../Views/index' //ðå¯¼å¥è§å¾å±
import { addMobileModel, getMobileListModel, removeMobileModel } from '../Models/index'// ðå¯¼å¥ model å±å»è·åæ°æ®



// ð¥ð¥Controller å± (é½å¨ router åæ§è¡ï¼), åé ãModel å±ãè¯·æ±ãè·åæ°æ®ãï¼ä¼ éç»ãè§å¾å±ã
// listController.js å¤ç list é¡µé¢ãç§»é¤åè¡¨ãæ·»å åè¡¨çé»è¾ï¼ï¼

// ððæ¸²æ list é¡µé¢ (â¡ï¸ å¨ router -> index.js è·¯ç±æä»¶åæ§è¡)
export async function ListController () {
	// è·åæ°æ®
	const res = await getMobileListModel()
	
	return ListView (res.data)
}



// ððäºä»¶å¤çå½æ°ï¼ç§»é¤åè¡¨ï¼(â¡ï¸ å¨ router -> index.js è·¯ç±æä»¶åæ§è¡)
export async function removeListController () {
	const oMobileListItem = document.querySelector('#mobileList')

	function bindEvent () {
		oMobileListItem.addEventListener('click', handleRemoveBtnClick, false)
	}

	// å¼æ­¥å½æ°ï¼
	async function handleRemoveBtnClick (event) {
		const tar = event.target

		if(tar.className === 'remove-btn') {
			// console.log(tar)
			// ð¥ æ¿å° id æç¥éç§»é¤åªä¸é¡¹ï¼
			// const _id = Number(tar.dataset.id)
			const _id = tar.dataset.id
			// console.log(_id)


			// ð¥ð¥ð¥åæ³ä¸: ä½¿ç¨ try catch æè· model å± Promise å¼æ­¥å½æ°çéè¯¯
			try {
				const res = await removeMobileModel(_id) //â¡ï¸â¡ï¸res æ¯æä»¬å®ä¹ç remove api çè¿åå¼ï¼ï¼
				// ð¥ Model æ°æ®å é¤æåäºæè½è®© view å±å»ç§»é¤ dom
				if(res.status === 200) {
					console.log(res.data)
					tar.parentNode.remove()
				} else {
					alert('å é¤å¤±è´¥')
				}
			} catch (err) {
				console.log(err)
			}

			// ð¥ð¥ð¥åæ³äº: ç´æ¥è®© model å±å»ç§»é¤æ°æ®, ð¥å ä¸ºæ¯ä¸ª Promise, æä»¥å¯ä»¥ç¨ .thenï¼
			// removeMobileModel(_id).then(res => {
			// 	// ð¥ Model æ°æ®å é¤æåäºæè½è®© view å±å»ç§»é¤ dom
			// 	if(res.status === 200) {
			// 		console.log(res.data)
			// 		tar.parentNode.remove()
			// 	} else {
			// 		alert('å é¤å¤±è´¥')
			// 	}
			// })

		}
	}
	// æ»å¼å³
	bindEvent ()
}



// ðð äºä»¶å¤çå½æ°ï¼æ·»å åè¡¨ï¼(â¡ï¸ å¨ router -> index.js è·¯ç±æä»¶åæ§è¡)
export async function addMobileListController () {
	const oMobileList = document.querySelector('#mobileList') //ð²æç»è¦æè½½çæ ï¼
	const oAddBtn = document.querySelector('#addBtn')
	const oBrandInfo = document.querySelector('#brand')
	const oModelInfo = document.querySelector('#model')
	const oPriceInfo = document.querySelector('#price')
	const oSpecInfo = document.querySelector('#spec')

	function bindEvent () {
		oAddBtn.addEventListener('click', handleAddBtnClick, false)
	}

	// ç¹å»çäºä»¶å½æ°
	async function handleAddBtnClick () {
		if (oBrandInfo.value.length === 0 ||
			oModelInfo.value.length === 0 ||
			oPriceInfo.value.length === 0 ||
			oSpecInfo.value.length === 0) 
		{
			alert('ð è¯·å¡«åå®æ´ Mobile ä¿¡æ¯')
			return
		}
		// è·å¾ value

		try {
			const res = await addMobileModel({
				brand: oBrandInfo.value,
				model: oModelInfo.value,
				price: oPriceInfo.value,
				spec: oSpecInfo.value
			})
			console.log(res.data) //status: 200

			if(res.data.status === 200) {
				// â¡ï¸æ api è¿åçæ°æ®ä¼ å¥ç»ä¸é¢ç createMobileListItem å½æ°ï¼
				createMobileListItem(res.data.newMobileInfo) //ð¥åé Model å±çè¯·æ±, è·åæ°æ®è¿åå¼, ä¼ éç»è§å¾å±
				resetFrom() //ð¥éç½®æ¸ç©ºè¡¨å
				alert('ð æ·»å æåï¼')
			}
		} catch (err) {
			alert('ð æ·»å å¤±è´¥ï¼');
		}	
	}


	// ð¥ð¥ æä½ DOM æ·»å åè¡¨åå®¹å° List ç li å
	function createMobileListItem (mobileInfo) {
		console.log(mobileInfo.id)
		const oLi = document.createElement('li') //å·ä½åå®¹
		oLi.innerHTML = mobileListItem (mobileInfo) //ä¸æ¡ list 
		oMobileList.appendChild(oLi) //ð²æç»æè½½å°æ´æ£µæ ä¸ï¼
	}


	// éç½®æ¸ç©ºè¡¨å
	function resetFrom () {
		oBrandInfo.value = ''
		oModelInfo.value = ''
		oPriceInfo.value = ''
		oSpecInfo.value = ''
	}

	// æ»å¼å³
	bindEvent ()
}