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
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formLabelAlign.phone"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="ID号" prop="code">
          <el-input
            v-model="formLabelAlign.code"
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
import loginService from "@/services/comon.service";
export default {
  data() {
    return {
      formLabelAlign: {
        phone: "",
        code: "",
      },
      formRules: {
        phone: [{ required: true, message: "不能为空", trigger: "blur" }],
        code: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          let res = await loginService.login(this.formLabelAlign);
          if (res.status == 0) {
            this.$router.push("/homePage");
          } else {
            this.$message.error("登录失败");
          }
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