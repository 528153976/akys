<template>
  <div class="fileAdmin">
    <el-button type="success" class="homeBtn" @click="dialogFormVisible = true"
      >新增</el-button
    >
    <el-button type="success" class="homeSy">水印管理</el-button>
    <itemDemo v-for="(v, i) in 24" :key="i" :isEdit="true"></itemDemo>
    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="标题：" label-width="80px">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面：" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文件：" label-width="80px">
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
        </el-form-item>
      </el-form>

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
import itemDemo from "../components/itemDemo.vue";
export default {
  components: { itemDemo },
  props: {},
  data() {
    return {
      form: {},
      dialogFormVisible: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      return true;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.fileAdmin {
  padding: 30px 100px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: 700px;
  overflow-x: hidden;
  overflow-y: auto;
  > .itemDemo {
    margin-right: 40px;
  }
  .homeBtn {
    position: absolute;
    right: 20px;
    top: 30px;
    z-index: 10;
  }
  .homeSy {
    position: absolute;
    right: 20px;
    top: 80px;
    z-index: 10;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
  border: 1px dashed #999;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>