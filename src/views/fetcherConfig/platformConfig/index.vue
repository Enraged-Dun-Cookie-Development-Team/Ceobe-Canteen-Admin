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
      :data="platformTable"
      style="width: 100%"
    >
      <el-table-column prop="type_id" label="平台类型id" />
      <el-table-column prop="platform_name" label="平台" />
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
            v-if="!scope.row.has_datasource"
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
        :page-sizes="[5, 10, 20]"
        :page-size.sync="pageSize.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageSize.total_count"
        @size-change="getPlatformList"
        @current-change="getPlatformList"
      />
    </div>
    <edit-platform ref="editPlatform" @uploadDone="uploadDone" />
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
            platformTable:[],
            pageSize: {},
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initPageSize();
            this.getPlatformList();
        },
        initPageSize() {
            this.pageSize = {
                page: 1,
                size: 10,
                total_count: 0,
                total_page: 0
            };
        },
        addData() {
            this.$refs.editPlatform.open(true);
        },
        editData(data) {
            this.$refs.editPlatform.open(false, data);
        },
        deleteData(data) {
            this.$confirm('是否确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=> {
                this.$store
                    .dispatch("fetcherConfig/deletePlatform", data.id)
                    .then(() => {
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: "success",
                        });
                        this.getPlatformList();
                    }).catch(() =>{
                        this.$message({
                            showClose: true,
                            message: "删除失败",
                            type: "error",
                        });
                    });
            });
        },
        getPlatformList() {
            this.loading = true;

            this.$store
                .dispatch("fetcherConfig/platformList", this.pageSize)
                .then((response) => {
                    this.platformTable = response.data.list;
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
        uploadDone() {
            this.init();
        }
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