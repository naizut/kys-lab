export const state = () => ({
  lang: 'cn',
})

export const mutations = {
  SET_LANG(state, v) {
    state.lang = v
  },
}

export const actions = {
  switchLanguage({ commit }, data) {
    commit('SET_LANG', data)
  },
}
