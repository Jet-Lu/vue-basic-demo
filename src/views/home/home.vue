<!--template  -->
<template>
  <div class="home-page">
		home
    <button @click="toDemo1()">demo1</button>
    <button @click="toDemo2()">demo2</button>
		<router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    tohome() {
      this.$router.push("/home");
    },
    toDemo1() {
      this.$router.push("/demo1");
    },
    toDemo2() {
      this.$router.push("/demo2");
    },
  },
};
</script>
<style lang='scss' scoped>
</style>