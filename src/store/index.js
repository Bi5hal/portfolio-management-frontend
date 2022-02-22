import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


import auth from "./auth"
import transactions from "./transactions"

Vue.use(Vuex)

export default new Vuex.Store({
    strict: false,
    state: {
        showNavigationDrawer: true
    },
    modules:{
        auth,
        transactions
    },
    mutations: {
        changeShowNavigationDrawer(state) {
            state.showNavigationDrawer = !state.showNavigationDrawer;
        }
    },
    actions: {},
    plugins: [createPersistedState({
            storage: window.localStorage,
        }
    )]
})
