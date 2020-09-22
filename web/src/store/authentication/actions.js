import axios from "axios";

export default {
  signIn({ commit }, { username, password }) {
    axios
      .post("http://localhost:3000/api/v1/auth/signin", { username, password })
      .then((res) => {
        if (res.status === 200 && res.headers["authorization"]) {
          localStorage.setItem("auth_token", res.headers["authorization"]);

          window.location.reload();
        }
      })
      .catch((error) => {
        commit("SIGN_IN", {
          valid: false,
          message: error.response.data.message,
        });
      });
  },
  signUp({ commit }, { username, password }) {
    axios
      .post("http://localhost:3000/api/v1/auth/signup", { username, password })
      .then((res) => {
        if (res.status === 200 && res.headers["authorization"]) {
          localStorage.setItem("auth_token", res.headers["authorization"]);

          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          commit("SIGN_UP", {
            valid: false,
            message: error.response.data.message,
          });
        }
      });
  },
};
