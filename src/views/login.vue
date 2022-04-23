<template>
  <div class="login">
    <div class="loginWrap">
      <p>登录</p>
      <el-form
        ref="formRef"
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
        :rules="formRules"
      >
        <el-form-item label="手机号" prop="iphone">
          <el-input
            v-model="formLabelAlign.iphone"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="ID号" prop="number">
          <el-input
            v-model="formLabelAlign.number"
            prefix-icon="el-icon-postcard"
            placeholder="请输入ID号"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="ljlogin" @click="login"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelAlign: {
        iphone: "",
        number: "",
      },
      formRules: {
        iphone: [{ required: true, message: "不能为空", trigger: "blur" }],
        number: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$router.push("/homePage");
      this.$refs.formRef.validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: calc(100vh - 200px);
  background-color: #f4f4f4;
  overflow: hidden;
  background-image: url("../assets/img/loginbg.jpg");
  background-size: 100% 100%;
  position: relative;
  .loginWrap {
    width: 500px;
    height: 400px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    padding: 26px 80px;
    position: absolute;
    right: 100px;
    top: 160px;
    > p:nth-child(1) {
      width: 100%;
      text-align: center;
      font-size: 20px;
      margin-bottom: 36px;
    }
    .ljlogin {
      display: block;
      margin: 50px auto 0;
      background-color: #2a71f5;
      border-color: #2a71f5;
      color: #fff;
      width: 200px;
    }
  }
}
</style>
<style scoped>
::v-deep .loginWrap .el-form-item label {
  padding-bottom: 10px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
}
</style>