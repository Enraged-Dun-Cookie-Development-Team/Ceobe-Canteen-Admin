<template>
  <el-form
    ref="configForm"
    :model="config"
    label-position="right" label-width="120px"
  >
    <el-form-item label="专辑id:" prop="artistId">
      <el-input v-model="config.artistId" placeholder="请输入专辑id" />
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
    name: "NeteaseCloudAlbums",
    data() {
        return {
            config: {
                artistId: "",
            }
        };
    }
};
</script>