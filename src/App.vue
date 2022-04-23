<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  height: 100%;
  font-size: 16px;
}
</style>
