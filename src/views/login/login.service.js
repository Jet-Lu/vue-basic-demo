import http from '../../auth/http.service.js';

export default {
	// 登录
	login() {
		const url = `/api/login`;
		return http.get(url).then(res => {
			return res;
		})
	},
	// 退出登录
	logout() {
		const url = `/api/loginout/`;
		return http.get(url).then(res => {
			return res;
		})
	},
	getApprovalInfo(params) {
		const url = `/api`;
		return http.get(url, params).then(res => {
			return res;
		})
	},

}
