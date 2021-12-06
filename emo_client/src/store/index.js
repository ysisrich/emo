import {createStore} from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
	state () {
	  return {
		theme: localStorage.theme,
		searchKey:''
	  }
	},
	mutations: {
	  changeTheme (state) {
		state.theme = state.theme == 'black' ? 'white' : 'black'
	  }
	}
})




export default store
