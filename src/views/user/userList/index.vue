<template>
  <div id="mainWindow">
    <h3>用户列表</h3>
    <el-table
      :data="userTable"
      style="width: 100%"
    >
      <el-table-column prop="username" label="用户名" />
      <el-table-column label="权限">
        <template slot-scope="scope">
          <el-select
            v-if="userTable[scope.$index].username == name"
            v-model="userTable[scope.$index].auth"
            disabled placeholder="请选择"
            @change="changeAuth(scope.$index)"
          >
            <el-option
              v-for="item in authOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-else
            v-model="userTable[scope.$index].auth"
            placeholder="请选择"
            @change="changeAuth(scope.$index)"
          >
            <el-option
              v-for="item in authOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="userTable[scope.$index].username != name"
            type="text"
            size="small"
            @click.native.prevent="deleteUser(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page.sync="pageSize.page"
        :page-sizes="[10, 20]"
        :page-size.sync="pageSize.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageSize.total_count"
        @size-change="getUserList"
        @current-change="getUserList"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: "UserList",
    data() {
        return {
            loading: false,
            userTable: [],
            pageSize: {
                page: 1,
                size: 10,
                total_count: 0,
                total_page: 0
            },
            authOptions: [
                {
                    value: "chef",
                    label: "主厨",
                },
                {
                    value: "cooker",
                    label: "厨师",
                },
                {
                    value: "architect",
                    label: "饼学家",
                }
            ]
        };
    },
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getUserList();
        },
        getUserList() {
            this.loading = false;
            this.$store
                .dispatch("user/userList", this.pageSize)
                .then((response) => {
                    this.userTable = response.data.list;
                    this.pageSize = response.data.page_size;
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "获取用户列表失败",
                        type: "error",
                    });
                }).finally(() =>{
                    this.loading = true;
                });
        },
        changeAuth(index) {
            this.$store
                .dispatch("user/changeAuth", { id:this.userTable[index].id, auth:this.userTable[index].auth })
                .then(() => {
                    this.$message({
                        showClose: true,
                        message: "更新用户权限成功",
                        type: "success",
                    });
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "更新用户权限失败",
                        type: "error",
                    });
                }).finally(() => {
                    this.getUserList();
                });
        },
        deleteUser(index) {
            this.$store
                .dispatch("user/deleteUser", this.userTable[index].id)
                .then(() => {
                    this.$message({
                        showClose: true,
                        message: "删除用户成功",
                        type: "success",
                    });
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "删除用户失败",
                        type: "error",
                    });
                }).finally(() => {
                    this.getUserList();
                });
        },
    },
};
</script>
  <style lang="scss" scoped>
  #mainWindow {

    .block {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;
    }
  }
  </style>