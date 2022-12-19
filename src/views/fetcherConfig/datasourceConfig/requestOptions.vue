<template>
  <div>
    <div>请求参数</div>
    <el-form
      ref="requestOptionsForm"
      :model="requestOptions"
      label-position="right" label-width="120px"
    >
      <el-form-item label="时间戳:" prop="appendTimestamp">
        <el-switch v-model="requestOptions.appendTimestamp" />
      </el-form-item>
      <el-form-item
        v-if="requestOptions.appendTimestamp" label="时间戳参数名:"
        prop="timestampParamName"
      >
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
          <el-input v-model="item.key" class="headers-key" />: <el-input v-model="item.value" class="headers-value" />
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
                appendTimestamp: false,
                timestampParamName: "t",
                headers: {},
            },
            headerList: []
        };
    },
    methods: {
        open(data) {
            this.requestOptions = data;
            if (!("appendTimestamp" in this.requestOptions)) {
                this.$set(this.requestOptions, "appendTimestamp", false);
            }
            if (!("timestampParamName" in this.requestOptions)) {
                this.$set(this.requestOptions, "timestampParamName", "t");
            }
            if (!("headers" in this.requestOptions)) {
                this.$set(this.requestOptions, "headers", {});
            }
        },
        complete() {
            this.headerList.forEach(header => {
                if (header.key !== "" && header.value !== "") {
                    this.$set(this.requestOptions.headers, header.key, header.value);
                }
            });
            if (this.requestOptions.appendTimestamp == false) {
                this.$delete(this.requestOptions, "appendTimestamp");
                this.$delete(this.requestOptions, "timestampParamName");
            }
            if (this.requestOptions.timestampParamName === "" || this.requestOptions.timestampParamName === "t") {
                this.$delete(this.requestOptions, "timestampParamName");
            }
            if (Object.keys(this.requestOptions.headers).length == 0) {
                this.$delete(this.requestOptions, "headers");
            }
        },
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
.headers-key {
  display: inline;

  .el-input__inner {
    margin-top: 5px;
    width: 30%;
  }
}

.headers-value {
  display: inline;

  .el-input__inner {
    margin-top: 5px;
    width: 60%;
  }
}
</style>