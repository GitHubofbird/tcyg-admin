import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token'),
    username: sessionStorage.getItem('username')
  },
  mutations: {
    token (state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    username (state, username) {
      state.username = username
      sessionStorage.setItem('username', username)
    }
  },
  getters: {

  },
  actions: {

  }
})
export default store
