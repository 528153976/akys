<template>
  <div class="wrapper">
    <div class="homeSearch">
      <el-input
        placeholder="请输入姓名关键词"
        class="homeInput"
        v-model="input"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i> </el-input
      ><el-button type="success" class="homeBtn">搜索</el-button>
      <el-button
        type="success"
        class="homeBtn"
        @click="dialogFormVisible = true"
        >新增</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="600px"
      align="center"
    >
      <el-table-column prop="number" label="ID号" width="250">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="250"> </el-table-column>
      <el-table-column prop="iphone" label="手机号" width="250">
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
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增账号" :visible.sync="dialogFormVisible" width="550px">
      <el-form :model="form">
        <el-form-item label="ID号：" label-width="80px">
          <el-input v-model="form.number">
            <template slot="append">生成</template>
          </el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="80px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" label-width="80px">
          <el-input v-model="form.iphone"></el-input>
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
export default {
  components: {},
  props: {},
  data() {
    return {
      input: "",
      form: {},
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
  methods: {},
  created() {},
  mounted() {},
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