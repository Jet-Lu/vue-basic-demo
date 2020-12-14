
//路由守卫
import Vue from 'vue'
import Router from 'vue-router'
import { isLoggedIn, loggedIn } from './auth.service.js'
Vue.use(Router) 
const router = new Router({})

export const checkLogin = () => { 
    if (isLoggedIn || loggedIn()) {
        return true
    } else {
        router.push('') // 跳转至登录页面
        return false
    }
}

