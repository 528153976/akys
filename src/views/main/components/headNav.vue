<template>
  <div class="headNav">
    <div class="headContent">
      <img
        src="@/assets/img/home/logo.png"
        alt=""
        @click="$router.push('/homePage')"
      />
      <div v-if="isShow">
        <p class="btn" @click="$router.push('/homePage')">首页</p>
        <p class="btn" @click="$router.push('/homeAdmin')">管理端</p>
        <p class="btn" @click="$router.push('/login')">退出登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: localStorage.getItem("code") == 10 ? true : false,
    };
  },
  methods: {
    handleSelect() {},
  },
};
</script>

<style lang="less" scoped>
.headNav {
  width: 100%;
  background-color: #f5f9fc;
  .headContent {
    width: 1373px;
    height: 90px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > img {
      cursor: pointer;
    }
    > div {
      display: flex;
    }
    .btn {
      font-size: 18px;
      cursor: pointer;
      font-weight: 600;
      margin-left: 40px;
    }
  }
}
</style>