<template>
  <el-form
    ref="configForm"
    :model="config"
    label-position="right" label-width="120px"
  >
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
    name: "ArknightsWebsitePublic",
    data() {
        return {
            config: {}
        };
    }
};
</script>