export default {
  setCurrentUser(state, payload) {
    // console.log(payload)
    state.currentUser = payload;
    // state.isAuthenticated = true;
  }
};