import { login } from '../../api'

const state = {
    token: null,
    paperDetail: {}
}

const mutations = {
    SET_TOKEN (state, token) {
        state.token = token
    },
    SET_PAPER (state, detail) {
        state.paperDetail = detail
    },
    UPDATE_QU (state, detail) {
        state.paperDetail[detail.key][detail.index].answer = detail.content
    }
}

const actions = {
    setToken ({ commit }, token) {
        // do something async
        commit('SET_TOKEN', token)
    },
    setPaper ({ commit }, detail) {
        commit('SET_PAPER', detail)
    },
    updateQu ({ commit }, detail) {
        commit('UPDATE_QU', detail)
    }
}

export default {
    state,
    mutations,
    actions,
    namespaced: true
}
  