import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token')
  },
  mutations: {
    token (state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    }
  }
})
export default store
