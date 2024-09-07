<template>
  <div id="fetcherDetailConfig">
    <h3>工具链接</h3>
    <div class="search-area">
      <!-- <el-form
        :inline="true" :model="search"
        class="demo-form-inline" @submit.native.prevent
      >
        <el-form-item label="链接名">
          <el-input v-model="search.nickname" placeholder="请输入连接名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary" icon="el-icon-search"
            size="small" class="btn-search"
            @click="searchList"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="mt-30">
      <el-button
        type="primary" icon="el-icon-plus"
        size="small" class="btn-add"
        @click="addData"
      >
        新增
      </el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="dataSourceTable"
      style="width: 100%"
    >
      <el-table-column
        prop="localized_name.zh_CN" label="链接名"
        align="center"
      />
      <el-table-column
        prop="localized_description.zh_CN" label="详情描述"
        align="center"
      />
      <el-table-column
        prop="localized_slogan.zh_CN" label="Slogan"
        align="center"
      />
      <el-table-column
        label="头像"
        align="center"
      >
        <template slot-scope="scope">
          <img style="width:60px;height:60px" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editData(scope.row)"
          >
            详细
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editData(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteData(scope.row)"
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
        @size-change="getDatasourceList"
        @current-change="getDatasourceList"
      />
    </div>
    <edit-tool-link ref="editToolLink" @uploadDone="uploadDone" />
  </div>
</template>

<script>
import EditToolLink from "./editToolLink.vue";
export default {
    name: "ToolLink",
    components: { EditToolLink },
    data() {
        return {
            loading: false,
            dataSourceTable:[],
            pageSize: {},
            value: "",
            search: {
                nickname: ''
            },
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initPageSize();
            this.getDatasourceList();
        },
        initPageSize() {
            this.pageSize = {
                page: 1,
                size: 10,
                total_count: 0,
                total_page: 0
            };
        },
        getDatasourceList() {
            this.loading = true;
            this.$store
                .dispatch("toolLink/toolLinkList", { ...this.search, ...this.pageSize })
                .then((response) => {
                    this.dataSourceTable = response.data?.list;
                    this.pageSize = response.data?.page_size;
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "获取工具链接列表失败",
                        type: "error",
                    });
                }).finally(()=> {
                    this.loading = false;
                });
        },
        searchList() {
            this.initPageSize();
            this.getDatasourceList();
        },
        addData() {
            this.$refs.editToolLink.open(true);
        },
        editData(data) {
            this.$refs.editToolLink.open(false, data);
        },
        deleteData(data) {
            this.$confirm('是否确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=> {
                this.$store
                    .dispatch("toolLink/deleteToolLink", data.id)
                    .then(() => {
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: "success",
                        });
                        this.getDatasourceList();
                    }).catch(() =>{
                        this.$message({
                            showClose: true,
                            message: "删除失败",
                            type: "error",
                        });
                    });
            });
        },
        uploadDone() {
            this.getDatasourceList();
        }
    }
};
</script>

<style lang="scss" scoped>
#fetcherDetailConfig {

  .block {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }

  .ml-10 {
    margin-left: 10px;
  }

  .mt-30 {
    margin-top: 30px;
  }
}
</style>