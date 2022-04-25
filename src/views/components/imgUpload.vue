<template>
  <div class="imgUpload">
    <el-upload
      action="#"
      :class="['bag-file', fileExceed]"
      list-type="picture-card"
      :on-preview="handlePreview"
      :http-request="postFile"
      :on-success="onSuccess"
      :on-error="onError"
      :before-remove="handleRemove"
      :on-remove="onRemove"
      :file-list="fileList"
      :disabled="disabled"
      :on-exceed="() => $message.warning('上传已达上限')"
      :limit="limit"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import loginService from "@/services/comon.service";

export default {
  name: "ApprovalFileUpload",
  props: {},
  computed: {
    // 是否至少上传一个文件
    hadUploaded() {
      if (this.fileList instanceof Array) {
        return Boolean(this.fileList.length);
      }
      return false;
    },
    /**
     * 文件url
     */
    urlList() {
      return this.fileList?.map((item) => item.url) || [];
    },
    /**
     * 上传达到上限样式
     */
    fileExceed() {
      return this.fileList?.length >= this.limit ? "file-exceed" : "";
    },
  },
  data() {
    return {
      fileList: [], // 文件列表
      // 已移除的图片元素映射
      removeMap: {},
      limit: 1,
      disabled: false,
      // 预览图片下标
      imagIndex: 0,
      ywlx: "T001_Y001",
      dialogVisible: false,
    };
  },

  methods: {
    /**
     * 上传成功
     */
    onSuccess(response, file, fileList) {
      this.$message.success("上传文件成功");
    },
    /**
     * 上传失败
     */
    onError(err, file, fileList) {
      this.$message.error(err.message || "上传文件失败");
    },
    /**
     * 图片预览
     */
    handlePreview(file) {},
    /**
     * 关闭预览
     */
    closeViewer() {
      this.dialogVisible = false;
    },
    /**
     * 删除图片
     * @param file
     * @param fileList
     */
    handleRemove(file, fileList) {
      return new Promise((resolve, reject) => {});
    },
    /**
     * 删除图片后
     */
    onRemove(file, fileList) {
      // 同步文件列表
      this.fileList = fileList;
    },
    /**
     * 加载图片
     */
    async getFileList() {
      // 获取附件填充到列表
      //   this.fileList = [];
    },
    /**
     * 上传图片
     */
    postFile(file) {
      return new Promise((resolve, reject) => {
        let params = {
          ywlx: this.ywlx,
          syxx: "cesces",
        };
        let formdata = new FormData();
        formdata.append("multipartFile", file.file);
        // 发起上传文件请求
        loginService
          .fileUpload(params, formdata)
          .then((res) => {
            if (res.status == 0) {
              // 上传成功
              resolve(res);
            } else {
              // 获取数据异常
              reject(res);
            }
          })
          .catch((err) => {
            // 请求异常
            reject(err);
          });
      });
    },
  },
};
</script>
<style scoped>
.imgUpload {
  width: 100%;
  text-align: center;
}
/* 禁用时去除上传区 */
.bag-file >>> .is-disabled + .el-upload--picture-card {
  display: none;
}
/* 上传达到上限去除上传区 */
.file-exceed >>> .el-upload--picture-card {
  display: none;
}
/* 无图片显示占位 */
.bag-file >>> .is-disabled:empty + .el-upload--picture-card {
  display: inline-block;
}
</style>
