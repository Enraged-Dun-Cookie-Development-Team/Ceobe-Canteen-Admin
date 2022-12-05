<template>
  <div id="fetcherDetailConfig">
    <h3>数据源配置</h3>
    <div class="search-area">
      <el-form
        :inline="true" :model="search"
        class="demo-form-inline" @submit.native.prevent
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
        <el-form-item label="数据源">
          <el-select
            v-model="search.datasource" clearable
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in datasourceOptions"
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
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
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
      :data="dataSourceTable"
      style="width: 100%"
    >
      <el-table-column prop="platform" label="平台" />
      <el-table-column prop="datasource" label="数据源" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="avatar" label="头像" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="checkDetail(scope.row)"
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
            @click.native.prevent="deleteData(scope.$row)"
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
    <edit-datasource ref="editDatasource" />
  </div>
</template>

<script>
import EditDatasource from "./editDatasource.vue";
export default {
    name: "FetcherDetailConfig",
    components: { EditDatasource },
    data() {
        return {
            dataSourceTable:[],
            pageSize: {
                page: 1,
                size: 10,
                total_count: 0,
                total_page: 0
            },
            platformOptions:[],
            datasourceOptions: [],
            value: "",
            search: {
                platform: "",
                datasource: "",
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
        getDatasourceList() {

        },
        getPlatformList() {
            this.$store
                .dispatch("fetcherConfig/getPlatform")
                .then((response) => {
                    response.data.platform_list.forEach(item => {
                        this.platformOptions.append({
                            label: item,
                            value: item
                        });
                    });
                    response.data.datasource_list.forEach(item => {
                        this.datasourceOptions.append({
                            label: item,
                            value: item
                        });
                    });
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "获取平台列表失败",
                        type: "error",
                    });
                });
        },
        addData() {
            this.$refs.editDatasource.open(true, this.platformOptions);
        },
        editData(data) {
            this.$refs.editDatasource.open(false, this.platformOptions, data);
        },
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