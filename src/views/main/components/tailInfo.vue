<template>
  <div class="tailInfo">
    <div class="tailText">
      关于我们
      <span>|</span>
      帮助中心
    </div>
    <div class="tailAbout">CopyRight @ 爱康优申</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
.tailInfo {
  width: 100%;
  height: 140px;
  background: url("~@/assets/img/home/tailBg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #222222;
  text-align: center;
  overflow: hidden;
  .tailText {
    margin: 45px 0 5px 0;
    font-size: 14px;
    color: #fff;
    > span {
      margin: 0 10px;
    }
  }
  .tailAbout {
    font-size: 14px;
    font-family: Source Han Sans CN;
    color: #ffffff;
    opacity: 0.3;
  }
}
</style>
