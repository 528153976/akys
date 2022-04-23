<template>
  <div class="homeInfo">
    <div class="homeWrap">
      <div class="homeSearch">
        <el-input
          placeholder="请输入标题关键词"
          class="homeInput"
          v-model="input"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i> </el-input
        ><el-button type="success" class="homeBtn">立即搜索</el-button>
      </div>
      <div class="homeList">
        <item-demo
          v-for="(element, index) in 22"
          :key="index"
          :title="1"
          :type="$route.query.type"
        ></item-demo>
      </div>
    </div>
  </div>
</template>

<script>
import itemDemo from "@/views/components/itemDemo.vue";
export default {
  components: { itemDemo },
  data() {
    return {
      input: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.homeInfo {
  width: 100%;
  display: flex;
  justify-content: center;
  .homeWrap {
    width: 1373px;
    background-color: #fff;
    padding: 30px 0;
  }
  .homeSearch {
    padding-left: 50px;
    display: flex;
    margin-bottom: 30px;
  }
  .homeInput {
    width: 520px;
    height: 48px;
    margin-right: 10px;
  }
  .homeBtn {
    height: 40px;
    background: linear-gradient(90deg, #65b7ff 0%, #65b7ff 100%);
    box-shadow: 0px 4px 12px rgba(92, 162, 223, 0.2);
    border-radius: 4px;
  }
  .homeList {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0 0 50px;
    display: flex;
    flex-wrap: wrap;
    > .itemDemo {
      margin-right: 45px;
    }
  }
}
</style>

<style>
::v-deep .el-button--success {
  color: #fff;
  background-color: #65b7ff;
  border-color: #65b7ff;
}
</style>