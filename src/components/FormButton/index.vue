<template>
  <el-button
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
  border-color: #ffba4b;
  color: #f4f4f5;
  background-color: #ffba4b;

  &:focus,
  &:hover {
    border-color: #ffc76e;
    color: #f4f4f5;
    background-color: #ffc76e;
  }
}
</style>
