<template>
  <div id="globalConfig">
    <h3>
      全局配置
    </h3>
    <el-form
      ref="globalForm"
      :model="globalData"
      label-position="right"
      :rules="datasourceRules"
    >
      <el-form-item label="蹲饼频率:" prop="interval">
        <el-input-number
          v-model="globalData.interval" controls-position="right"
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
                interval: 15000,
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

        },
        submitForm() {

        }
    }
};
</script>

<style lang="scss">
#globalInterval {
  // TODO
}
</style>