<template>
  <div id="globalConfig">
    <h3>
      全局配置
    </h3>
    <el-form
      ref="globalForm"
      :model="globalData"
      label-position="right"
    >
      <el-form-item label="蹲饼频率:" prop="default_interval">
        <el-input-number
          v-model="globalData.default_interval" controls-position="right"
          :min="0" :step="1000" class="ml-5"
          step-strictly
        />
      </el-form-item>
    </el-form>
    <form-button @submit="submitForm" />
  </div>
</template>

<script>
import FormButton from "@/components/FormButton";
export default {
    name: "GlobalInterval",
    components: { FormButton },
    data() {
        return {
            globalData: {
                default_interval: 15000,
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getGlobalConfig();
        },
        submitForm() {
            this.$store
                .dispatch("fetcherConfig/uploadGlobalConfig", this.globalData)
                .then(() => {
                    this.$message({
                        showClose: true,
                        message: "上传全局配置成功",
                        type: "success",
                    });
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "上传全局配置失败",
                        type: "error",
                    });
                });
        },
        getGlobalConfig(){
            this.$store
                .dispatch("fetcherConfig/getGlobalConfig")
                .then((response) => {
                    this.globalData = response.data;
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "获取全局配置失败",
                        type: "error",
                    });
                });
        }
    }
};
</script>

<style lang="scss">
#globalInterval {
  // TODO
}
</style>