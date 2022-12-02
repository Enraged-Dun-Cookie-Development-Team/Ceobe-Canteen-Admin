<template>
  <div id="platformConfig">
    <div>
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
      <el-table-column prop="type_id" label="平台类型id" />
      <el-table-column prop="platform" label="平台" />
      <el-table-column prop="min_request_interval" label="最小蹲饼间隔" />
      <el-table-column label="操作">
        <template slot-scope="scope">
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
            @click.native.prevent="deleteDatasource(scope.row)"
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
    <edit-platform ref="editPlatform" />
  </div>
</template>

<script>
import EditPlatform from "./editPlatform.vue";
export default {
    name: 'PlatformConfig',
    components: { EditPlatform },
    data() {
        return {
            loading: true,
            create: false, // 创建还是编辑
            dataSourceTable:[],
            pageSize: {
                page: 1,
                size: 10,
                total_count: 0,
                total_page: 0
            },
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getPlatformList();
        },
        addData() {
            this.$refs.editPlatform.open(true);
        },
        editData(data) {
            this.$refs.editPlatform.open(false, data);
        },
        getPlatformList() {
            this.loading = true;
            this.$store
                .dispatch("fetcherConfig/platformList", this.pageSize)
                .then((response) => {
                    this.dataSourceTable = response.data.list;
                    this.pageSize = response.data.page_size;
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "获取平台配置列表失败",
                        type: "error",
                    });
                }).finally(() =>{
                    this.loading = false;
                });
        },
    }
};
</script>

<style lang="scss" scoped>
  .block {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
</style>