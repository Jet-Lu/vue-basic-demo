import axios from 'axios'
import { Message } from 'element-ui'
import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const header = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,HEAD,GET,PUT,POST,DELETE,PATCH'
}
// 文件上传
const headers2 = { 'enctype': 'multipart/form-data' }
// 图片预览
const headers3 = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/octet-stream'
}

const postHeader = Object.assign({}, header, {
    'Content-Type': 'application/json;charset=UTF-8'
})
const CancelToken = axios.CancelToken
let source = CancelToken.source()

let cancel = null
let promiseArr = {}

axios.interceptors.request.use(config => {
    // 取消当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    // if (!config.headers.hasOwnProperty('Authorization')) {
    //     config.headers['Authorization'] = sessionStorage.getItem('jwt')
    // }
    config.cancelToken = source.token // 全局添加cancelToken
    return config
}, error => {
    Message.error({ message: '加载超时' })
    return Promise.reject(error.request)
})

// http响应拦截器
axios.interceptors.response.use(response => {
    // 登录失效401
    if (response.data.code === '401') {
        // Message.error({message: response.data.message})
        source.cancel() // 取消其他正在进行的请求
        localStorage.removeItem('user')
        router.push('/login')
        source = CancelToken.source()
    }
    return response
}, error => {
    errorHandler(error)
    if (error.message !== '操作取消') {
        if (error.message) {
            Message.error({ message: error.msg })
        }
    }
    return Promise.reject(error.response)
})

// 移除拦截器
// axios.interceptors.request.eject('拦截器名称')

function checkStatus(response) {
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response.data
    }
    return {
        success: false,
        status: -404,
        message: '网络异常'
    }
}

function checkCode(res) {
    // if (!res.success) {
    //   Message.error({
    //     message: res.message
    //   })
    // }
    if (res.status === -404) {
        Message.error({
            message: res.message
        })
    }
    return res
}

function errorHandler(error) {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.msg = '错误请求'; break
            case 401:
                error.msg = '未授权，请重新登录'; break
            case 403:
                error.msg = '拒绝访问'; break
            case 404:
                error.msg = '请求错误，未找到该资源'; break
            case 405:
                error.msg = '请求方法未允许'; break
            case 408:
                error.msg = '请求超时'; break
            case 500:
                error.msg = '服务器端出错'; break
            case 501:
                error.msg = '网络未实现'; break
            case 502:
                error.msg = '网络错误'; break
            case 503:
                error.msg = '服务不可用'; break
            case 504:
                error.msg = '网络超时'; break
            case 505:
                error.msg = 'http版本不支持该请求'; break
            default:
                error.msg = `连接错误${error.response.status}`
        }
    } else {
        error.msg = '连接到服务器失败'
    }
    console.log(error.msg)
}

export default {
    get(url, params) {
        return axios({
            method: 'get',
            url: url,
            params,
            timeout: 60000,
            headers: header
        }).then(response => {
            return checkStatus(response)
        }).then(res => {
            return checkCode(res)
        })
    },
    post(url, options) {
        return axios({
            method: 'post',
            url: url,
            data: options,
            timeout: 60000,
            headers: postHeader
        }).then(response => {
            return checkStatus(response)
        }).then(res => {
            return checkCode(res)
        })
    },
    delete(url, params) {
        return axios({
            method: 'delete',
            url: url,
            params,
            timeout: 60000,
            headers: header
        }).then(response => {
            return checkStatus(response)
        }).then(res => {
            return checkCode(res)
        })
    },
    put(url, options) {
        return axios({
            method: 'put',
            url: url,
            data: options,
            timeout: 60000,
            headers: postHeader
        }).then(response => {
            return checkStatus(response)
        }).then(res => {
            return checkCode(res)
        })
    },
    patch(url, options) {
        return axios({
            method: 'patch',
            url:  url,
            data: options,
            timeout: 60000,
            headers: postHeader
        }).then(response => {
            return checkStatus(response)
        }).then(res => {
            return checkCode(res)
        })
    },
    // 文件上传
    uploadFile(url, options) {
        return axios({
            method: 'post',
            url: url,
            data: options,
            timeout: 60000,
            headers: headers2
        }).then(response => {
            return checkStatus(response)
        }).then(res => {
            return checkCode(res)
        })
    },
    // 预览文件的请求
    imagePreview(url, params) {
        return axios({
            method: 'get',
            url: url,
            data: params,
            timeout: 60000,
            headers: headers3
        }).then(response => {
            return checkStatus(response)
        }).then(res => {
            return checkCode(res)
        })
    }
}
