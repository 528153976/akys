<template>
  <div class="homePage">
    <div class="homeWrap">
      <el-carousel height="400px">
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <img
            style="width: 1373px; height: 400px"
            :src="$showPic(item.filepath)"
            alt=""
          />
        </el-carousel-item>
      </el-carousel>
      <div class="homeDemo" v-for="(v, i) in typeList" :key="i">
        <div class="homeTop">
          <div class="homeTitle">
            <div class="homeName">{{ v.title }}</div>
            <div class="homeColor"></div>
          </div>
          <div class="homeText">{{ v.text }}</div>
          <div class="homeMore" @click="more(v.type)">查看更多 ></div>
        </div>
        <div class="homeList" v-if="v.type == 1">
          <item-demo
            v-for="(element, index) in videoList"
            :key="index"
            :value="element"
            :title="element.ywbs"
            :type="v.type"
          ></item-demo>
        </div>
        <div class="homeList" v-if="v.type == 2">
          <item-demo
            v-for="(element, index) in audioList"
            :key="index"
            :value="element"
            :title="element.ywbs"
            :type="v.type"
          ></item-demo>
        </div>
        <div class="homeList" v-if="v.type == 3">
          <img-demo
            v-for="(element, index) in fileList"
            :key="index"
            :value="element"
            :title="element.ywbs"
            :type="v.type"
          ></img-demo>
        </div>
        <div class="homeList" v-if="v.type == 4">
          <img-demo
            v-for="(element, index) in imgList"
            :key="index"
            :value="element"
            :title="element.ywbs"
            :type="v.type"
          ></img-demo>
        </div>
      </div>
      <div class="homeDemo">
        <div class="homeTop">
          <div class="homeTitle">
            <div class="homeName">打字测速</div>
            <div class="homeColor"></div>
          </div>
          <div class="homeText">Typing Speed</div>
        </div>
        <div class="homeList">
          <div class="homeSpeed">
            <img src="@/assets/img/home/swiper.jpg" alt="" />
          </div>
          <div class="homeSpeed">
            <el-button type="primary" class="login-button" @click="openHtml"
              >点击开始测速</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemDemo from "@/views/components/itemDemo.vue";
import imgDemo from "@/views/components/imgDemo.vue";
import loginService from "@/services/comon.service";
export default {
  components: { itemDemo, imgDemo },
  data() {
    return {
      swiperList: [],
      videoList: [],
      audioList: [],
      fileList: [],
      imgList: [],
      typeList: [
        {
          title: "热门视频",
          text: "Hot Video",
          type: "1",
        },
        {
          title: "推荐音频",
          text: "The Audio",
          type: "2",
        },
        {
          title: "文件查看",
          text: "Documents Show",
          type: "3",
        },
        {
          title: "图片信息",
          text: "Image Information",
          type: "4",
        },
      ],
    };
  },
  mounted() {
    this.getSwiperList();
    this.getVideoList();
    this.getAudioList();
    this.getFileList();
    this.getImgList();
  },
  methods: {
    more(type) {
      this.$router.push({
        path: "/homeInfo",
        query: {
          type,
        },
      });
    },
    async getSwiperList() {
      let res = await loginService.listFileInfo({ ywlx: "T001_Y002" });
      if (res.status == 0) {
        this.swiperList = res.data.records;
      }
    },
    async getVideoList() {
      let res = await loginService.listFileInfo({ ywlx: "T003_Y001" });
      if (res.status == 0) {
        this.videoList = res.data.records;
      }
    },
    async getAudioList() {
      let res = await loginService.listFileInfo({ ywlx: "T004_Y001" });
      if (res.status == 0) {
        this.audioList = res.data.records;
      }
    },
    async getFileList() {
      let res = await loginService.listFileInfo({ ywlx: "T002_Y001" });
      if (res.status == 0) {
        this.fileList = res.data.records;
      }
    },
    async getImgList() {
      let res = await loginService.listFileInfo({ ywlx: "T001_Y003" });
      if (res.status == 0) {
        this.imgList = res.data.records;
      }
    },
    openHtml() {
      window.open("https://dazi.kukuw.com/");
    },
  },
};
</script>

<style lang="less" scoped>
.homePage {
  width: 100%;
  display: flex;
  justify-content: center;
  .homeWrap {
    width: 1373px;
    padding-bottom: 30px;
  }
  .homeDemo {
    width: 100%;
    background-color: #fff;
    margin: 0;
    padding-top: 30px;
  }
  .homeTop {
    width: 100%;
    position: relative;
    text-align: center;
    .homeMore {
      font-size: 16px;
      color: #65b7ff;
      position: absolute;
      right: 50px;
      cursor: pointer;
    }
  }
  .homeTitle {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .homeText {
    font-size: 18px;
    font-weight: 500;
    color: #707071;
    margin: 10px 0 0 0;
  }
  .homeName {
    font-size: 30px;
    color: #000b33;
    font-weight: 700;
    z-index: 10;
  }
  .homeColor {
    width: 183px;
    height: 18px;
    border-radius: 9px;
    background: #65b7ff;
    position: absolute;
    bottom: 0;
    z-index: 0;
  }
  .homeList {
    width: 100%;
    box-sizing: border-box;
    padding: 50px;
    display: flex;
    justify-content: space-between;
  }
  .homeSpeed {
    width: 48%;
    height: 350px;
    text-align: center;
    line-height: 350px;
    > img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .login-button {
    border-radius: 26px;
    width: 152px;
    height: 51px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
}
</style>
<style scoped>
::v-deep .el-carousel {
  margin-bottom: 30px;
}
</style>