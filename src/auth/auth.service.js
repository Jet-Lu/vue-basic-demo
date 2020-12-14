import { tokenNotExpired } from './auth-http.js'

export let isLoggedIn = false; //登录标识

// 是否登录(前端判断)
export const loggedIn = () => {
	return tokenNotExpired('user')
}