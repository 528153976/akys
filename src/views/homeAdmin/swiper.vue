<template>
  <div class="wrapper">
    <el-button type="success" class="homeBtn" @click="add">新增</el-button>
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
        <template slot-scope="scope">
          <img class="imgCss" :src="$showPic(scope.row.filepath)" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="update(scope.row)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="deleteImg(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增图片" :visible.sync="dialogFormVisible" width="500px">
      <div style="text-align: center">
        <img-upload :ywlx="fileywlx" :id="id" />
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogFormVisible = false;
            getList();
          "
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            getList();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from "@/views/components/imgUpload.vue";
import loginService from "@/services/comon.service";
export default {
  components: { ImgUpload },
  props: {
    fileywlx: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imageUrl: "",
      dialogFormVisible: false,
      tableData: [],
      id: "",
    };
  },
  methods: {
    add() {
      this.id = "";
      this.dialogFormVisible = true;
    },
    update(row) {
      this.id = row.id;
      this.dialogFormVisible = true;
    },
    async deleteImg(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await loginService.deleteFile(row.id);
          if (res.status == 0) {
            this.$message.success("删除成功");
            this.getList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async getList() {
      let res = await loginService.listFileInfo({ ywlx: this.fileywlx });
      if (res.status == 0) {
        this.tableData = res.data.records;
      }
    },
  },
  created() {},
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: 30px 50px;
  position: relative;
  .imgCss {
    width: 200px;
    height: 100px;
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