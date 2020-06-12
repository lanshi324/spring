export const state = () => ({
  user: null,
  counter: 0
})

export const mutations = {
  set_user(state, user) {
    state.userName = user
  },
  increment(state) {
    state.counter++
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req, app }) {
    if (req.session && req.session.user) {
      commit('set_user', req.session.user)
    } else {
      commit('set_user', null)
    }
  },
  set_user: ({ commit }, user) => {
    commit('set_user', user)
  }
}
