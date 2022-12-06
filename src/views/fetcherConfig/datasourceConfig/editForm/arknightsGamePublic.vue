<template>
  <el-form
    ref="configForm"
    :model="config"
    label-position="right" label-width="120px"
  >
    <el-form-item label="客户端平台:" prop="platform">
      <el-select
        v-model="config.platform"
        placeholder="请选择"
        size="small"
      >
        <el-option
          v-for="item in platformOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @blur="fillPlatform"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
      >
        确定
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    name: "ArknightsGamePublic",
    data() {
        return {
            platformOptions: [
                {
                    label: "",
                    value: "Android"
                },
                {
                    label: "",
                    value: "IOS"
                },
                {
                    label: "",
                    value: "Bilibili"
                },
            ],
            config: {
                platform: "Android"
            }
        };
    }
};
</script>