export default {
  userAuth({ state, commit }, payload) {
    commit('setCurrentUser', payload);
    // console.log(555)
  },
}
