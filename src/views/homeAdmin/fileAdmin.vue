<template>
  <div class="fileAdmin">
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
      <el-table-column label="标题" width="350" prop="ywbs"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addSy(scope.row)"
            >添加水印</el-button
          >
          <el-button type="text" size="small" @click="deleteImg(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="标题：" label-width="80px">
          <el-input v-model="form.ywbs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面：" label-width="80px" v-show="fmywlx">
          <img-upload ref="imgUpload" :ywlx="fmywlx" :id="id" />
        </el-form-item>
        <el-form-item label="文件：" label-width="80px">
          <img-upload
            ref="fileUpload"
            type="file"
            :ywlx="fileywlx"
            :id="form.id"
            :accept="accept"
          />
        </el-form-item>
        <el-form-item label="水印：" label-width="80px">
          <el-input v-model="form.syxx" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from "@/views/components/imgUpload.vue";
import itemDemo from "../components/itemDemo.vue";
import loginService from "@/services/comon.service";
export default {
  components: { ImgUpload },
  props: {
    accept: {
      type: String,
      default: "",
    },
    fileywlx: {
      type: String,
      default: "",
    },
    fmywlx: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tableData: [],
      form: {
        id: "",
        ywlx: this.fileywlx,
        fmpath: "",
        syxx: "",
      },
      id: "",
      dialogFormVisible: false,
    };
  },
  methods: {
    add() {
      this.id = "";
      this.form.id = "";
      this.dialogFormVisible = true;
    },
    async getList() {
      let res = await loginService.listFileInfo({ ywlx: this.fileywlx });
      if (res.status == 0) {
        this.tableData = res.data.records;
      }
    },
    async addSy(row) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let res = await loginService.fileWater(row.id);
      if (res.status == 0) {
        this.$message.success("添加成功");
        loading.close();
      }
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
    update(row) {
      this.id = row.fmpath;
      this.form = row;
      this.dialogFormVisible = true;
    },
    save() {
      console.log(this.$refs.imgUpload);
      this.form.fmpath =
        this.$refs.imgUpload.fileList.length > 0
          ? this.$refs.imgUpload.fileList[0].response?.id
          : "";
      let formdata = this.$refs.fileUpload.formdata;
      loginService
        .fileUpload(this.form, formdata)
        .then((res) => {
          if (res.status == 0) {
            this.$message.success("保存成功");
            this.dialogFormVisible = false;
            this.getList();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
  mounted() {
    this.getList();
  },
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