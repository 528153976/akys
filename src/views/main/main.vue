<template>
  <div class="homeMain">
    <head-nav />
    <keep-alive :include="aliveList">
      <router-view />
    </keep-alive>
    <tailInfo />
  </div>
</template>

<script>
import headNav from "./components/headNav.vue";
import tailInfo from "./components/tailInfo.vue";
export default {
  components: {
    headNav,
    tailInfo,
  },
  data() {
    return {
      aliveList: [],
    };
  },
  provide() {
    return {
      mainVue: this,
    };
  },
  // inject: ['zuzongThis'],
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.homeMain {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f4f4f4;
}
</style>