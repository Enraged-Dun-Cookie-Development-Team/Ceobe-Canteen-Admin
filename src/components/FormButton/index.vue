<template>
  <el-button
    type="primary"
    class="btn-submit"
    @click="submit"
  >
    提交
  </el-button>
</template>

<script>
export default {
    name: 'FormButton',
    methods:{
        submit(){
            this.$emit("submit");
        }
    }
};
</script>


<style lang="scss">
.btn-submit {
  position: fixed;
  right: 80px;
  bottom: 20px;
}
</style>
