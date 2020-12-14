<!-- login -->
<template>
  <div class="login">
    提示信息
  </div>
</template>

<script>
import loginService from "./login.service.js";
export default {
  data() {
    return {
      loginParam: {
        username: "",
        password: "",
      },
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    login() {
      loginService.login().then((res) => {
        if (res.success) {
          this.$router.push("/");
        }
        this.$router.push("/");
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>