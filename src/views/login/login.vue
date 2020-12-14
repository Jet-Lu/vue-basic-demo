<!-- login -->
<template>
    <div>
        <div class="loginBox">
            <div class="content-wrap">
                <div class="content">
                    <div class="loginTit">
                        <span>智能研发运维一体化平台</span>
                        <span>ntelligent D&O Platform</span>
                    </div>
                    <div class="inpBox username">
                        <input id="username" maxlength="18" type="text" placeholder="用户名" v-model.trim="loginParam.username" autocomplete="off">
                    </div>
                    <div class="inpBox password">
                        <input type="password" placeholder="密码" @keyup.enter="login()" v-model.trim="loginParam.password" autocomplete="off" />
                    </div>
                    <a class="fgtPwd">忘记密码</a>
                    <div class="btnBox">
                        <button class="loginBtn" type="button" @click="login()">登录</button>
                        <!-- <button class="registerBtn" type="button" @click="register()">注册</button> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- 提示信息 -->
    </div>
</template>

<script>
    import loginService from './login.service.js'
    export default {
        data() {
            return {
                loginParam: {
                    username: '',
                    password: ''
                }
            }
        },
        components: {},
        computed: {},
        mounted() {
        },
        methods: {
            login() {
                  
                loginService.login().then(res=>{
                    if (res.success) {
                        this.$router.push('/')
                    }
                    this.$router.push('/')
                })
            },
        }
    }
</script>
<style lang='scss' scoped>

</style>