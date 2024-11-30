<template>
  <div id="ReleaseVersion">
    <h3>发布版本</h3>
    <div class="search-area">
      <el-form
        :inline="true" :model="search"
        @submit.native.prevent
      >
        <el-form-item label="平台">
          <el-select
            v-model="search.platform" clearable
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in platformOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      </el-form>
    </div>
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
      :data="versionTable"
      style="width: 100%"
    >
      <el-table-column
        label="平台"
        align="center"
      >
        <template #default="scope">
          {{ platformMap[scope.row.platform] ?? scope.row.platform }}
        </template>
      </el-table-column>
      <el-table-column
        prop="version" label="版本号"
        align="center"
      />
      <el-table-column
        label="弃用"
        align="center"
      >
        <template #default="scope">
          {{ scope.row.deleted ? '是' : '否' }}
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
        @size-change="getVersionList"
        @current-change="getVersionList"
      />
    </div>
    <edit-version
      ref="editVersion" :platform-option="platformOptions"
      @uploadDone="uploadDone"
    />
  </div>
</template>

<script>
import { filterSearchParams } from "@/utils/field-filter";
import EditVersion from "./editVersion.vue";
export default {
    name: "ReleaseVersion",
    components: { EditVersion },
    data() {
        return {
            loading: false,
            versionTable:[],
            pageSize: {},
            platformOptions: [
                {
                    label: "插件端",
                    value: "plugin"
                },
                {
                    label: "桌面端",
                    value: "desktop"
                },
                {
                    label: "移动端",
                    value: "pocket"
                }
            ],
            platformMap: {
                "plugin": "插件端",
                "desktop": "桌面端",
                "pocket": "移动端",
            },
            search: {
                platform: "",
            },
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initPageSize();
            this.getVersionList();
        },
        initPageSize() {
            this.pageSize = {
                page: 1,
                size: 10,
                total_count: 0,
                total_page: 0
            };
        },
        getVersionList() {
            this.loading = true;
            this.$store
                .dispatch("version/getVersionList", { ...filterSearchParams(this.search), ...this.pageSize, deleted: true })
                .then((response) => {
                    this.versionTable = response.data?.list;
                    this.pageSize = response.data?.page_size;
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "获取版本列表失败",
                        type: "error",
                    });
                }).finally(()=> {
                    this.loading = false;
                });
        },
        searchList() {
            this.initPageSize();
            this.getVersionList();
        },
        addData() {
            this.$refs.editVersion.open(true);
        },
        editData(data) {
            this.$refs.editVersion.open(false, data);
        },
        deleteData(data) {
            this.$confirm('是否确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=> {
                this.$store
                    .dispatch("version/markDeleteVersion", { version: data.version, platform: data.platform })
                    .then(() => {
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: "success",
                        });
                        this.getVersionList();
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
            this.getVersionList();
        }
    }
};
</script>

<style lang="scss" scoped>
#ReleaseVersion {

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