<template>
  <div class="homeInfo">
    <div class="homeWrap">
      <div class="homeSearch">
        <!-- <el-input
          placeholder="请输入标题关键词"
          class="homeInput"
          v-model="input"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i> </el-input
        ><el-button type="success" class="homeBtn" @click="getList()"
          >立即搜索</el-button
        > -->
      </div>
      <div class="homeList" v-if="type == 1">
        <item-demo
          v-for="(element, index) in fileList"
          :key="index"
          :value="element"
          :title="element.ywbs"
          :type="type"
        ></item-demo>
      </div>
      <div class="homeList" v-if="type == 2">
        <item-demo
          v-for="(element, index) in fileList"
          :key="index"
          :value="element"
          :title="element.ywbs"
          :type="type"
        ></item-demo>
      </div>
      <div class="homeList" v-if="type == 3">
        <img-demo
          v-for="(element, index) in fileList"
          :key="index"
          :value="element"
          :title="element.ywbs"
          :type="type"
        ></img-demo>
      </div>
      <div class="homeList" v-if="type == 4">
        <img-demo
          v-for="(element, index) in fileList"
          :key="index"
          :value="element"
          :title="element.ywbs"
          :type="type"
        ></img-demo>
      </div>
    </div>
  </div>
</template>

<script>
import itemDemo from "@/views/components/itemDemo.vue";
import loginService from "@/services/comon.service";
import imgDemo from "@/views/components/imgDemo.vue";
export default {
  components: { itemDemo, imgDemo },
  data() {
    return {
      input: "",
      ywlx: "T003_Y001",
      fileList: [],
      type: this.$route.query.type,
    };
  },
  created() {
    switch (this.type) {
      case "1":
        this.ywlx = "T003_Y001";
        break;
      case "2":
        this.ywlx = "T004_Y001";
        break;
      case "3":
        this.ywlx = "T002_Y001";
        break;
      case "4":
        this.ywlx = "T001_Y003";
        break;
      default:
        break;
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await loginService.listFileInfo({
        ywlx: this.ywlx,
        ywbs: this.input,
      });
      if (res.status == 0) {
        this.fileList = res.data.records;
      }
    },
  },
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

