<template>
  <div id="fetcherDetailConfig">
    <h3>数据源配置</h3>
    <div class="search-area">
      <el-form
        :inline="true" :model="queryParams"
        class="demo-form-inline" @submit.native.prevent
      >
        <el-form-item label="平台">
          <el-select
            v-model="value" clearable
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in options"
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
      >
        新增
      </el-button>
    </div>
    <el-table
      :data="dataSourceTable"
      style="width: 100%"
    >
      <el-table-column prop="platform" label="平台" />
      <el-table-column prop="uid" label="uid" />
      <el-table-column prop="name" label="昵称" />
      <el-table-column prop="avatar" label="头像" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editDatasource(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteDatasource(scope.$row)"
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
    <edit-datasource />
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
            options:[
                {
                    label:"",
                    value: "",
                }
            ],
            value: "",
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

        },
        getDatasourceList() {

        }
    }
};
</script>

<style lang="scss" scoped>
#fetcherDetailConfig {

  .btn-search,
  .btn-add {
    border-color: #FFBA4B;
    background-color: #FFBA4B;
  }

  .btn-search:focus,
  .btn-search:hover,
  .btn-add:focus,
  .btn-coaddpy:hover {
    border-color: #FFC76E;
    background-color: #FFC76E;
  }

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