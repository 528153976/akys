<template>
  <div class="imgUpload">
    <el-upload
      v-if="type == 'img'"
      action="#"
      :class="['bag-file', fileExceed]"
      list-type="picture-card"
      :http-request="postFile"
      :on-success="onSuccess"
      :on-error="onError"
      :before-remove="handleRemove"
      :on-remove="onRemove"
      :file-list="fileList"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      :on-exceed="() => $message.warning('上传已达上限')"
      :limit="limit"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-upload
      v-if="type == 'file'"
      class="upload-demo"
      action="#"
      :http-request="postFile"
      :on-success="onSuccess"
      :on-error="onError"
      :before-remove="handleRemove"
      :on-remove="onRemove"
      :file-list="fileList"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import loginService from "@/services/comon.service";

export default {
  name: "ApprovalFileUpload",
  props: {
    //类型：图片还是文件
    type: {
      type: String,
      default: "img",
    },
    // 主键
    id: {},
    // 文件类型
    ywlx: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 限制上传的数量，0为无限制
    limit: {
      type: Number,
      default: 1,
    },
    // 文件格式
    accept: {
      type: String,
      default: "image/*",
    },
    // 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    id: {
      handler(val) {
        this.getFileList();
      },
      immediate: true,
    },
  },
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
      formdata: "",
      // 预览图片下标
      imagIndex: 0,
      dialogVisible: false,
    };
  },
  mounted() {},

  methods: {
    /**
     * 上传成功
     */
    onSuccess(response, file, fileList) {
      console.log(fileList);
      this.fileList = fileList;
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
      console.log(file);
      return new Promise((resolve, reject) => {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // let res = await loginService.deleteFile(file.response.id);
            // if (res.status == 0) {
            // this.$message.success("删除成功");
            resolve();
            // }
          })
          .catch(() => {
            reject();
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
    /**
     * 删除图片后
     */
    onRemove(file, fileList) {
      this.fileList = fileList;
      if (file.response?.id) {
        loginService.deleteFile(file.response?.id);
      }
      // 同步文件列表
    },
    /**
     * 加载图片
     */
    async getFileList() {
      // 获取附件填充到列表
      this.fileList = [];
      this.formdata = null;
      if (this.id) {
        let res = await loginService.listFileInfo({
          id: this.id,
          ywlx: this.ywlx,
        });
        if (res.status == 0) {
          this.fileList = res.data.records.map((item) => {
            return {
              id: item.id,
              response: item,
              name: item.filename,
              url: this.$showPic(item.filepath),
            };
          });
        }
      }
    },
    /**
     * 上传图片
     */
    postFile(file) {
      console.log(file);
      // return false;
      return new Promise((resolve, reject) => {
        if (this.type == "file") {
          this.formdata = file.file;
          // this.formdata.append("multipartFile", file.file);
          resolve();
        } else {
          let params = {
            ywlx: this.ywlx,
            id: this.id,
          };
          let formdata = new FormData();
          formdata.append("multipartFile", file.file);
          // 发起上传文件请求
          loginService
            .fileUpload(params, formdata)
            .then((res) => {
              if (res.status == 0) {
                // 上传成功
                resolve(res.data);
              } else {
                // 获取数据异常
                reject(res);
              }
            })
            .catch((err) => {
              // 请求异常
              reject(err);
            });
        }
      });
    },
  },
};
</script>
<style scoped>
.imgUpload {
  width: 100%;
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
