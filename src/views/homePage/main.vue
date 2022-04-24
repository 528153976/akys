<template>
  <div class="homePage">
    <div class="homeWrap">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img
            style="width: 1373px; height: 400px"
            src="@/assets/img/home/swiper.jpg"
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
        <div class="homeList" v-if="v.type == 1 || v.type == 2">
          <item-demo
            v-for="(element, index) in 4"
            :key="index"
            :title="v.title"
            :type="v.type"
          ></item-demo>
        </div>
        <div class="homeList" v-if="v.type == 3 || v.type == 4">
          <img-demo
            v-for="(element, index) in 4"
            :key="index"
            :title="v.title"
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
            <el-button type="primary" class="login-button"
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
export default {
  components: { itemDemo, imgDemo },
  data() {
    return {
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
  mounted() {},
  methods: {
    more(type) {
      this.$router.push({
        path: "/homeInfo",
        query: {
          type,
        },
      });
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