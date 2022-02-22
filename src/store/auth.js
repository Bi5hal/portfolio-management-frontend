import axios from "axios";

const state = () => ({
  user: "",
  accessToken: "",
});

const mutations = {
  SET_USER(state, payload) {
    if (payload) {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
    }
  },
  UNSET_USER(state) {
    state.user = "";
    state.accessToken = "";

  }
};

const actions = {
  loginOrRegister(state, payload) {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:8000/api/" + payload.route, payload.data, {
        headers: {
          Accept: "application/json",
        }
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  logout(state) {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:8000/api/" + 'logout', {}, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + state.rootGetters['accessToken']
        }
      }).then(function (response) {
        if (response.status === 200) {
          state.commit("UNSET_USER");
        }
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
};

const getters = {
  user(state) {
    return state.user;
  },
  accessToken(state) {
    return state.accessToken;
  },
  isLogin(state) {
    return !!state.accessToken;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};

