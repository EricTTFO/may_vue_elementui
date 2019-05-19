import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

        {
            path: '/',
            name: 'home',
            component: Home,
            redirect:'/Welcome',
            children: [
                {path: '/Welcome', name: 'Welcome', component: () => import('./components/Welcome')},
                {path: '/Users', name: 'Users',component: () => import('./components/Users')},
                {path: '/Rights', name: 'Rights',component: () => import('./components/Rights')},
                {path: '/Roles', name: 'Roles', component: () => import('./components/Roles')},
                {path: '/Goods', name: 'Goods', component: () => import('./components/Goods')},
                {path: '/Categories', name: 'Categories', component: () => import('./components/Categories')},
                {path: '/AddGood', name: 'AddGood', component: () => import('./components/AddGood')},
            ]
        },
        {path: '/Login',name: 'Login',component: () => import('./components/Login')},
        {path: '/Register',name: 'Register',component: () => import('./components/Register')},
        {
            path: '/',
            name: 'cinema',
            component: () => import('./views/Cinema.vue')
        },
        {
            path: '/',
            name: 'hall',
            component: () => import('./views/Hall.vue')
        },
        {
            path: '/',
            name: 'welfare',
            component: () => import('./views/Welfare.vue')
        },
        {
            path: '/',
            name: 'me',
            component: () => import('./views/Me.vue')
        }
    ]
})
