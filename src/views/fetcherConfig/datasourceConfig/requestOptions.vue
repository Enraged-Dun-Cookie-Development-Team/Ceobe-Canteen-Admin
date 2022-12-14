<template>
  <div>
    <div>请求参数</div>
    <el-form
      ref="requestOptionsForm"
      :model="requestOptions"
      label-position="right" label-width="120px"
      :rules="requestOptionsRules"
    >
      <el-form-item label="时间戳:" prop="appendTimestamp">
        <el-switch v-model="requestOptions.appendTimestamp" />
      </el-form-item>
      <el-form-item label="时间戳参数名:" prop="timestampParamName">
        <el-input v-model="requestOptions.timestampParamName" />
      </el-form-item>

      <el-form-item label="头：" prop="headers">
        <el-button
          type="primary" size="mini"
          @click="addHeaders"
        >
          新增
        </el-button>
        <div v-for="(item, index) in headerList" :key="index">
          <el-input v-model="item.key" class="headers-input" />: <el-input v-model="item.value" class="headers-input" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name: 'RequestOptions',
    data() {
        return {
            requestOptions: {
                appendTimestamp: true,
                timestampParamName: "t",
                headers: {},
            },
            headerList: []
        };
    },
    methods: {
        addHeaders() {
            this.headerList.push({
                key: "",
                value: "",
            });
        }
    }
};
</script>

<style lang="scss">
.headers-input {
  display: inline;

  .el-input__inner {
    margin-top: 5px;
    width: 30%;
  }
}
</style>