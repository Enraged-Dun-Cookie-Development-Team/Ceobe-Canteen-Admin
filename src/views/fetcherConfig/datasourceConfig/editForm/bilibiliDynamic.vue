<template>
  <el-form
    ref="configForm"
    :model="config"
    label-position="right" label-width="120px"
  >
    <el-form-item label="uid:" prop="uid">
      <el-input v-model="config.uid" placeholder="请输入uid" />
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
    name: "BilibiliDynamic",
    data() {
        return {
            config: {
                uid: "",
            }
        };
    }
};
</script>