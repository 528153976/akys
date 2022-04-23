<template>
  <div class="wrapper">
    <el-button type="success" class="homeBtn" @click="dialogFormVisible = true"
      >新增</el-button
    >
    <el-table
      :data="tableData"
      style="width: 100%"
      height="700px"
      align="center"
    >
      <el-table-column label="序号" width="150">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="图片" width="350">
        <img class="imgCss" src="@/assets/img/home/swiper.jpg" alt="" />
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增轮播图"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      imageUrl: "",
      dialogFormVisible: false,
      tableData: [
        {
          number: "20220420153463",
          name: "王小虎",
          iphone: "1312341234",
        },
        {
          number: "20220420153463",
          name: "王小虎",
          iphone: "1312341234",
        },
        {
          number: "20220420153463",
          name: "王小虎",
          iphone: "1312341234",
        },
        {
          number: "20220420153463",
          name: "王小虎",
          iphone: "1312341234",
        },
        {
          number: "20220420153463",
          name: "王小虎",
          iphone: "1312341234",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: 30px 50px;
  position: relative;
  .imgCss {
    width: 300px;
  }
  .homeBtn {
    position: absolute;
    right: 50px;
    top: 20px;
    z-index: 10;
  }
}
.avatar-uploader .el-upload {
  width: 300px;
  margin: 0 auto;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>