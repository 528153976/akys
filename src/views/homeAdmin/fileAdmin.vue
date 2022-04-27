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
      <el-table-column label="标题" width="250" prop="ywbs"> </el-table-column>
      <el-table-column label="水印" width="250" prop="syxx"> </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addSy(scope.row)"
            >添加水印</el-button
          >
          <el-button type="text" size="small" @click="update(scope.row)"
            >查看</el-button
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
          <el-input
            :disabled="disabled"
            v-model="form.ywbs"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面：" label-width="80px" v-show="fmywlx">
          <img-upload
            v-if="!disabled"
            ref="imgUpload"
            :ywlx="fmywlx"
            :id="id"
          />
          <img v-else class="imgClass" :src="$showPic(id)" alt="" />
        </el-form-item>
        <el-form-item label="文件：" label-width="80px">
          <img-upload
            :disabled="disabled"
            ref="fileUpload"
            type="file"
            :ywlx="fileywlx"
            :id="form.id"
            :accept="accept"
          />
        </el-form-item>
        <el-form-item label="水印：" label-width="80px">
          <el-input
            :disabled="disabled"
            v-model="form.syxx"
            autocomplete="off"
          ></el-input>
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
      disabled: false,
      id: "",
      dialogFormVisible: false,
    };
  },
  methods: {
    add() {
      this.disabled = false;
      this.id = "";
      this.form = {
        ywlx: this.fileywlx,
        id: "",
        fmpath: "",
        syxx: "",
      };
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
      this.disabled = true;
      this.id = row.fmpath;
      this.form = row;
      this.dialogFormVisible = true;
    },
    save() {
      this.form.fmpath =
        this.$refs.imgUpload.fileList.length > 0
          ? this.$refs.imgUpload.fileList[0].response?.filepath
          : "";
      let formdata = this.$refs.fileUpload.formdata;
      if (!formdata) {
        return this.$message.error("必须上传文件");
      }
      let that = this;
      let identifier = new Date().getTime();
      let name = formdata.name;
      let size = formdata.size; //总大小
      let shardSize = 2 * 1024 * 1024; //以2MB为一个分片
      let shardCount = Math.ceil(size / shardSize);
      let attr = [];
      for (let i = 0; i < shardCount; ++i) {
        attr.push(i);
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let currentNumber = 0;
      attr.map((item) => {
        //数据进行的处理 item 为原始数据数组的元素
        let start = item * shardSize; //当前分片开始下标
        let end = Math.min(size, start + shardSize); //结束下标
        //构造一个表单，FormData是HTML5新增的
        let form = new FormData();
        form.append("file", formdata.slice(start, end)); //slice方法用于切出文件的一部分
        form.append("identifier", identifier);
        form.append("currentChunk", item + 1);
        form.append("totalChunks", shardCount);
        loginService.chunkUpload(form).then((res) => {
          if (res.status == 0) {
            currentNumber = currentNumber + 1;
            if (currentNumber == shardCount) {
              loading.close();
              //合并请求
              let data = {
                identifier: identifier,
                totalSize: size,
                filename: name,
                chunkSize: shardSize,
                totalChunks: shardCount,
              };
              that.mergeFile(this.fileywlx, data);
            }
          }
        });
      });

      // loginService
      //   .fileUpload(this.form, formdata)
      //   .then((res) => {
      //     loading.close();
      //     if (res.status == 0) {
      //       this.$message.success("保存成功");
      //       this.dialogFormVisible = false;
      //       this.getList();
      //     } else {
      //       this.$message.error(res.message);
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message.error(err);
      //   });
    },
    async mergeFile(identifier, data) {
      let res = await loginService.mergeFile(identifier, data);
      if (res.status == 0) {
        this.updateFileInfo(res.data);
      } else {
        this.$message.error(res.message);
      }
    },
    async updateFileInfo(data) {
      data.fmpath = this.form.fmpath;
      data.ywbs = this.form.ywbs;
      data.syxx = this.form.syxx;
      let res = await loginService.updateFileInfo(data);
      if (res.status == 0) {
        this.$message.success("上传成功");
        this.dialogFormVisible = false;
        this.getList();
      } else {
        this.$message.error(res.message);
      }
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
.imgClass {
  width: 200px;
  height: 200px;
}
</style>