<template>
  <div class="itemDemo">
    <div class="itemImg" @click="open()">
      <img
        src="https://ilrorwxhokqoli5p.ldycdn.com/cloud/liBplKqllrSRjjkmpkjkiq/42002.png"
        alt=""
      />
      <div class="itemWrap">
        <i class="el-icon-video-play" v-if="type == 1"></i>
        <i class="el-icon-video-play" v-if="type == 2"></i>
        <i class="el-icon-circle-plus-outline" v-if="type == 4"></i>
        <i class="el-icon-circle-plus-outline" v-if="type == 3"></i>
        <p>{{ title }}</p>
      </div>
    </div>
    <div class="itemMask" v-if="dialogVisible" @click="dialogVisible = false">
      <iframe
        width="80%"
        height="700px"
        :src="iframeUrl"
        frameborder="0"
        v-if="type != 4"
      ></iframe>
      <el-carousel style="width: 1373px" height="700px" v-else>
        <el-carousel-item v-for="item in 1" :key="item">
          <img style="width: 1373px; height: 700px" :src="iframeUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    value: {
      type: Object,
    },
    type: {
      type: String,
      default: "1",
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    switch (this.type) {
      case "1":
        this.iframeUrl = this.$showVideo(this.value?.filepath, true);
        // "https://video-c.ldycdn.com/ipBklKqllrr-inipKBllrqRliSlojlnrpnmmjkr-6a525ea8b8ab45e3afa274656e792b81.mp4";
        break;
      case "2":
        this.iframeUrl = this.$showVideo(this.value?.filepath, true);
        // "https://video-c.ldycdn.com/ipBklKqllrr-inipKBllrqRliSlojlnrpnmmjkr-6a525ea8b8ab45e3afa274656e792b81.mp4";
        break;
      case "3":
        this.iframeUrl = this.$showPic(this.value?.filepath, true);
        break;
      case "4":
        this.iframeUrl = this.$showPic(this.value?.filepath, true);
        break;
      default:
        break;
    }
  },
  data() {
    return {
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
      console.log(111);
      this.dialogVisible = true;
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
    height: 356px;
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
      cursor: pointer;
      display: none;
      > i {
        line-height: 300px;
      }
      > p {
        line-height: 56px;
        font-size: 23px;
        font-weight: 700;
      }
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