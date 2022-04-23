<template>
  <div class="headNav">
    <div class="headContent">
      <img
        src="@/assets/img/home/logo.png"
        alt=""
        @click="$router.push('/homePage')"
      />
      <!-- <p>微信：ACEKINGUSA</p>
      <p>电子邮件：admission@iconeducn.com</p>
      <p>联系电话：0571-87711623</p> -->
      <div>
        <p class="btn" @click="$router.push('/homePage')">首页</p>
        <a class="btn" href="https://dazi.kukuw.com/" target="_blank"
          >打字测速</a
        >
        <p class="btn" @click="$router.push('/homeAdmin')">管理端</p>
        <p class="btn" @click="$router.push('/login')">登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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