import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from "../views/Login";
import TransactionPage from "../views/TransactionPage";
import About from "../views/About";
import App from "../App";
import New from "../New";
import IndividualStockReport from "../views/IndividualStockReport";
import store from "../store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'App',
        component: App,
        children: [
            {
                path: '/',
                name: 'New',
                component: New,
                beforeEnter(to, from, next) {
                    if (store.getters.isLogin) {
                        next();
                    } else {
                        next("/login");
                    }
                },
                children: [
                    {
                        path: '/',
                        name: 'Home',
                        component: Home
                    },
                    {
                        path: '/transaction',
                        name: 'TransactionPage',
                        component: TransactionPage
                    },
                    {
                        path: '/about',
                        name: 'About',
                        component: About
                    },
                    {
                        path: '/individual/:id',
                        name: 'About',
                        component: IndividualStockReport
                    }
                ]
            },
            {
                path: '/login',
                name: 'Login',
                beforeEnter(to, from, next) {
                    if (store.getters.isLogin) {
                        next("/");
                    } else {
                        next();
                    }
                },
                component: Login
            },
            {

                path: '/register',
                name: 'Register',
                beforeEnter(to, from, next) {
                    if (store.getters.isLogin) {
                        next("/");
                    } else {
                        next();
                    }
                },
                component: Register
            },

        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
