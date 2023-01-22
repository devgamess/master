export default {
  currentUser: (state) => {
    if (state.currentUser != null) {
      return state.currentUser
    }
    return {
      user_id: 0,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      submit_car: "",
      role: "",
    }
  },
}
