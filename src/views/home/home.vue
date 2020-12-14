<!--template  -->
<template>
    <div>
        home
        <button @click="toDemo1()">demo1</button>
        <button @click="toDemo2()">demo2</button>
        <router-view />
    </div>
</template>

<script>
    export default {
        data() {
            return {
				
			}
        },

        components: {},

        computed: {},

        mounted() {},

        methods: {
            toDemo1(){
                this.$router.push('/home/demo1')
            },
            toDemo2(){
                this.$router.push('/home/demo2')
            },
        }
    }
</script>
<style lang='scss' scoped>
</style>