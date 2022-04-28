<template>
  <div class="itemDemo">
    <div class="itemImg" @click="open()">
      <img :src="$showPic(value.fmpath)" alt="" />
      <div class="itemWrap">
        <i class="el-icon-video-play" v-if="type == 1"></i>
        <i class="el-icon-video-play" v-if="type == 2"></i>
        <i class="el-icon-circle-plus-outline" v-if="type == 4"></i>
        <i class="el-icon-circle-plus-outline" v-if="type == 3"></i>
      </div>
    </div>
    <p>{{ title }}</p>
    <div class="itemMask" v-if="dialogVisible" @click="dialogVisible = false">
      <iframe
        width="80%"
        height="700px"
        :src="iframeUrl"
        frameborder="0"
        v-if="type != 4"
      ></iframe>
      <el-carousel style="width: 1373px" height="700px" v-if="type == 4">
        <el-carousel-item v-for="item in 1" :key="item">
          <img style="width: 1373px; height: 700px" :src="iframeUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import loginService from "@/services/comon.service";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "1",
    },
    value: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    switch (this.type) {
      case "1":
        this.fmywlx = "T003_Y003";
        this.iframeUrl = this.$showVideo(this.value?.filepath, true);
        // "https://video-c.ldycdn.com/ipBklKqllrr-inipKBllrqRliSlojlnrpnmmjkr-6a525ea8b8ab45e3afa274656e792b81.mp4";
        break;
      case "2":
        this.fmywlx = "T004_Y003";
        this.iframeUrl = this.$showVideo(this.value?.filepath, true);
        // "https://video-c.ldycdn.com/ipBklKqllrr-inipKBllrqRliSlojlnrpnmmjkr-6a525ea8b8ab45e3afa274656e792b81.mp4";
        break;
      case "3":
        // this.fmywlx = "T002_Y003";
        this.iframeUrl = this.$showPic(this.value?.filepath, true);
        break;
      case "4":
        this.iframeUrl = this.$showPic(this.value?.filepath, true);
        break;
      default:
        break;
    }
  },
  mounted() {
    // this.getFmimg();
  },
  data() {
    return {
      fmywlx: "",
      fmImg: "",
      iframeUrl: "",
      dialogVisible: false,
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    async getFmimg() {
      if (this.fmywlx) {
        let res = await loginService.listFileInfo({
          id: this.value?.fmpath,
          ywlx: this.fmywlx,
        });
        if (res.status == 0) {
          this.fmImg =
            (res.data.records || []).length > 0
              ? res.data.records[0].filepath
              : "";
          console.log("fmimg", this.fmImg);
        }
        console.log(res);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.itemDemo {
  width: 280px;
  border-radius: 10px;
  box-shadow: 0 6px 20px #b2d6f5;
  overflow: hidden;
  margin-bottom: 30px;
  cursor: pointer;
  .itemImg {
    width: 100%;
    height: 300px;
    position: relative;
    .itemWrap {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
      color: #65b7ff;
      font-size: 80px;
      text-align: center;
      line-height: 300px;
      cursor: pointer;
      display: none;
    }
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .itemImg:hover {
    > .itemWrap {
      display: block;
    }
  }
  > p {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 56px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .itemOperate {
    width: 100%;
    display: flex;
    justify-content: center;
    > button {
      width: 45%;
    }
  }
}
</style>
<style scoped>
.itemMask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>