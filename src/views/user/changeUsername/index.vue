<template>
  <div id="mainWindow">
    <h3>当前用户名：{{ oldusername }}</h3>
    <el-form
      ref="usernameForm"
      class="username-form"
      :model="usernameForm"
      :rules="usernameRules"
      auto-complete="on"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="新用户名" prop="username">
        <el-input
          v-model="usernameForm.username"
          placeholder="请输入新的用户名"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="btn-username" type="primary"
          @click="changeUsername"
        >
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    name: "ChangeUsername",
    data() {
        return {
            oldusername: this.$store.state.user.name,
            usernameForm: {
                username: "",
            },
            usernameRules: {
                username: [
                    { required: true, message: "用户名不能为空噢", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        changeUsername() {
            this.$refs["usernameForm"].validate((valid) => {
                if (valid) {
                    this.$store
                        .dispatch("user/changeUsername", this.usernameForm.username)
                        .then((response) => {
                            if (response.message == "用户名已被使用") {
                                this.$message({
                                    showClose: true,
                                    message: "用户名已被使用",
                                    type: "warning",
                                });
                            } else if (response.message == "修改用户名成功") {
                                this.oldusername = this.$store.state.user.name;
                                this.usernameForm.username = "";
                                this.$message({
                                    showClose: true,
                                    message: "修改用户名成功",
                                    type: "success",
                                });
                            }
                        })
                        .catch(() => {
                            this.$message({
                                showClose: true,
                                message: "修改用户名失败",
                                type: "error",
                            });
                        });
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
#mainWindow {

  ::v-deep label {
    font-weight: 500;
  }

  .btn-username {
    border-color: #FFBA4B;
    background-color: #FFBA4B;
  }

  .btn-username:focus,
  .btn-username:hover {
    border-color: #FFC76E;
    background-color: #FFC76E;
  }
}
</style>