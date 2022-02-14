<template>
  <el-button
    @click="submit"
    class="btn-submit"
  >提交</el-button
  >
</template>

<script>
export default {
  name: 'FormButton',
  methods:{
    submit(){
      this.$emit("submit");
    }
  }
}
</script>


<style lang="less">
.btn-submit {
  position: fixed;
  bottom: 20px;
  right: 80px;
  background-color: #ffba4b;
  border-color: #ffba4b;
  &:focus,
  &:hover {
    background-color: #ffc76e;
    border-color: #ffc76e;
  }
}
</style>
