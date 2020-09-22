import Vue from "vue";
import Vuex from "vuex";
import Authentication from "./authentication";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    createPage: {
      message: "",
      valid: null,
    },
    user: {},
  },
  mutations: {
    PUSH_MESSAGE(state, payload) {
      state.messages.push({ user: payload.user, content: payload.content });
    },
    CREATE_PAGE_SET_MESSAGE(state, { message, valid }) {
      state.createPage.message = message;
      state.createPage.valid = valid;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    sendMessage({ commit, getters }, content) {
      axios
        .post(
          "http://localhost:3000/api/v1/send",
          { content },
          { headers: { authorization: getters.isAuthenticated } }
        )
        .then((res) => {
          if (res.status === 200) {
            commit("PUSH_MESSAGE", { user: "Bot", content: res.data.message });
          }
        });
    },
    fetchUser({ commit, getters }) {
      axios
        .get("http://localhost:3000/api/v1/user/fetch", {
          headers: { authorization: getters.isAuthenticated },
        })
        .then((res) => {
          if (res.status === 200) {
            commit("SET_USER", res.data);
          }
        });
    },
    createAnswer({ commit, getters }, { answer, reply }) {
      axios
        .post(
          "http://localhost:3000/api/v1/create",
          { answer, reply },
          {
            headers: {
              authorization: getters.isAuthenticated,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            commit("CREATE_PAGE_SET_MESSAGE", {
              valid: true,
              message: res.data.message,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            commit("CREATE_PAGE_SET_MESSAGE", {
              valid: false,
              message: error.response.data.message,
            });
          }
        });
    },
  },
  getters: {
    isAuthenticated() {
      return localStorage.getItem("auth_token");
    },
  },
  modules: {
    Authentication,
  },
});
