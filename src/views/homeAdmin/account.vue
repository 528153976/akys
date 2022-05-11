<template>
  <div class="wrapper">
    <div class="homeSearch">
      <el-input
        placeholder="请输入姓名关键词"
        class="homeInput"
        v-model="bodyInfo.name"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i> </el-input
      ><el-button type="success" class="homeBtn" @click="getList()"
        >搜索</el-button
      >
      <el-button type="success" class="homeBtn" @click="add">新增</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="600px"
      align="center"
      v-loading="loading"
    >
      <el-table-column prop="name" label="姓名" width="250"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="250">
      </el-table-column>
      <el-table-column prop="code" label="密码" width="250"> </el-table-column>
      <el-table-column prop="role" label="权限" width="250">
        <template slot-scope="scope">
          {{ scope.row.role == 0 ? "管理员" : "普通权限" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="
              dialogFormVisible = true;
              form = scope.row;
            "
            >修改</el-button
          >
          <el-button type="text" size="small" @click="deleteInfo(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增账号" :visible.sync="dialogFormVisible" width="550px">
      <el-form :model="form">
        <el-form-item label="姓名：" label-width="80px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" label-width="80px">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="80px">
          <el-input v-model="form.code">
            <!-- <template slot="append">
              <span style="cursor: pointer" @click="generate()">生成</span>
            </template> -->
          </el-input>
        </el-form-item>
        <el-form-item label="权限：" label-width="80px">
          <el-select v-model="form.role" placeholder="请选择活动区域">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="普通权限" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            userSave();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import loginService from "@/services/comon.service";
export default {
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      input: "",
      bodyInfo: {
        name: "",
        pageNum: 1,
        pageSize: 999,
      },
      form: {
        code: "",
        name: "",
        phone: "",
      },
      dialogFormVisible: false,
      tableData: [],
    };
  },
  methods: {
    async getList() {
      this.loading = true;
      let res = await loginService.listuser(this.bodyInfo);
      this.loading = false;
      if (res.status == 0) {
        this.tableData = res.data?.records;
      }
    },
    async userSave() {
      let res = await loginService.userSave(this.form);
      if (res.status == 0) {
        this.getList();
      }
    },
    generate() {
      this.form.code = new Date().getTime();
    },
    add() {
      this.dialogFormVisible = true;
      this.form = {
        code: "",
        name: "",
        phone: "",
        role: "1",
      };
    },
    async deleteInfo(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await loginService.deleteInfo(row);
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
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: 30px 50px;
}
.homeSearch {
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
}
.homeInput {
  width: 520px;
  height: 48px;
  margin-right: 10px;
}
.homeBtn {
  height: 40px;
  background: linear-gradient(90deg, #65b7ff 0%, #65b7ff 100%);
  box-shadow: 0px 4px 12px rgba(92, 162, 223, 0.2);
  border-radius: 4px;
}
</style>