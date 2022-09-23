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
          <el-select v-model="userTable[scope.$index].auth" placeholder="请选择">
            <el-option
              v-for="item in authOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="authChange(scope.$index)"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="pageSize.page"
        :page-sizes="[10, 20]"
        :page-size="pageSize.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageSize.total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
    name: "UserList",
    data() {
        return {
            userTable: [
                {
                    username:"dfsas",
                    auth: "chef"
                }
            ],
            pageSize: {
                page: 1,
                size: 10,
                count: 0,
                totalCount: 0
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
    mounted: {

    },
    methods: {
        init() {

        },
        getUserList() {

        },
        changeAuth(_) {

        },
        deleteUser(_) {

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