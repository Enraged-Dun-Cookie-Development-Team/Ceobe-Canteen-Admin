<template>
  <div id="mainWindow">
    <h3>当前用户名：{{ this.oldusername }}</h3>
    <el-form
      ref="usernameForm"
      class="username-form"
      auto-complete="on"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="新用户名">
        <el-input v-model="username" placeholder="请输入新的用户名"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changeUsername">复制信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      oldusername: this.$store.state.user.name,
      username: "",
    };
  },
  methods: {
    changeUsername() {
      this.$store
        .dispatch("user/changeUsername", this.username)
        .then((response) => {
          if (response.message == "用户名已被使用") {
            this.$message({
              showClose: true,
              message: "用户名已被使用",
              type: "warning",
            });
          } else if (response.message == "修改用户名成功") {
            this.oldusername = this.$store.state.user.name;
            this.username = "";
            this.$message({
              showClose: true,
              message: "修改用户名成功",
              type: "success",
            });
          }
        })
        .catch((_) => {
          this.$message({
            showClose: true,
            message: "修改用户名失败",
            type: "error",
          });
        });
    },
  },
};
</script>
<style lang="less" scoped>
#mainWindow {
  /deep/ label {
    font-weight: 500;
  }
}
</style>