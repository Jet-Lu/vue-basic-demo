<template>
  <div class="page-layout">
    <nav-menu></nav-menu>
    <router-view />
  </div>
</template>

<script>
import navMenu from '@/components/nav-menu/nav-menu.vue';
export default {
  components: {
    navMenu,
  },
  data() {
    return {}
  },
  mounted() {
    if (sessionStorage.demo_store) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.demo_store)))
      sessionStorage.removeItem('demo_store');
    }

    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('demo_store', JSON.stringify(this.$store.state));
    })
  },
  methods: {},
}
</script>