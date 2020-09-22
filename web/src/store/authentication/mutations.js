export default {
  SIGN_IN(state, payload) {
    state.signIn.message = payload.message;
    state.signIn.valid = payload.valid;
  },
  SIGN_UP(state, payload) {
    state.signUp.message = payload.message;
    state.signUp.valid = payload.valid;
  },
};
