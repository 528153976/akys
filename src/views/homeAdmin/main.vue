<template>
  <div class="homeAdmin">
    <div class="homeWrap">
      <el-tabs tab-position="left">
        <el-tab-pane label="账号管理">
          <account />
        </el-tab-pane>
        <el-tab-pane label="首页轮播图">
          <swiper fileywlx="T001_Y002" />
        </el-tab-pane>
        <el-tab-pane label="视频管理">
          <file-admin accept="video/*" fileywlx="T003" fmywlx="T003_Y003" />
        </el-tab-pane>
        <el-tab-pane label="音频管理">
          <file-admin accept="audio/*" fileywlx="T004" fmywlx="T004_Y003" />
        </el-tab-pane>
        <el-tab-pane label="文件管理">
          <file-admin accept=".pdf" fileywlx="T002" fmywlx="T002_Y003" />
        </el-tab-pane>
        <el-tab-pane label="图片管理">
          <file-admin accept="image/*" fileywlx="T001_Y003" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import account from "./account.vue";
import swiper from "./swiper.vue";
import fileAdmin from "./fileAdmin.vue";
export default {
  components: { account, swiper, fileAdmin },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.homeAdmin {
  width: 100%;
  display: flex;
  justify-content: center;
  .homeWrap {
    width: 1373px;
    min-height: 820px;
    background-color: #fff;
  }
}
</style>
<style  scoped>
::v-deep .el-tabs__item {
  height: 60px;
  line-height: 60px;
}
::v-deep .el-button--success {
  color: #fff;
  background-color: #65b7ff;
  border-color: #65b7ff;
}
::v-deep .el-table__cell {
  text-align: center;
}
::v-deep .el-form-item {
  /* display: flex; */
  /* justify-content: center; */
}
::v-deep .el-dialog__header {
  text-align: center;
}
::v-deep .el-dialog__footer {
  text-align: center;
}
::v-deep .el-dialog__body {
  padding: 30px 80px;
}
::v-deep .el-input {
  width: 250px;
}
::v-deep .el-form-item__content {
  margin-left: 0;
}
</style>