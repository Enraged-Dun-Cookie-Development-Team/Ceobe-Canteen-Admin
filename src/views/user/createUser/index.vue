<template>
  <div id="mainWindow">
    <h3>新入职一个员工</h3>
    <el-form
      ref="permission"
      class="permission-form"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="职位" text-color="#ffba4b">
        <el-radio v-model="permission" label="chef">主厨</el-radio>
        <el-radio v-model="permission" label="cooker">厨师</el-radio>
        <el-radio v-model="permission" label="architect">建造师</el-radio>
        <el-button class="btn-submit" type="primary" @click="entryCanteen"
          >确定入职</el-button
        >
      </el-form-item>
    </el-form>
    <el-form
      ref="userForm"
      :model="user"
      class="user-form"
      auto-complete="on"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="用户名">
        <el-input v-model="user.username" :disabled="true"> </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" :disabled="true"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="btn-submit"
          v-clipboard:copy="copytext"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          >复制信息</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      permission: "chef",
      user: {
        username: "",
        password: "",
      },
      copytext: "",
    };
  },
  methods: {
    // 获取用户名和密码
    entryCanteen() {
      this.$store
        .dispatch("user/createUser", this.permission)
        .then((response) => {
          this.user = JSON.parse(JSON.stringify(response.data));
        })
        .then((_) => {
          this.copytext = `用户名：${this.user.username}\n密码：${this.user.password}`;
        })
        .catch((_) => {
          this.$message({
            showClose: true,
            message: "新建用户失败",
            type: "error",
          });
        });
    },
    // 复制成功
    onCopy(e) {
      this.$message({
        showClose: true,
        message: "已成功复制到剪贴板",
        type: "success",
      });
    },
    // 复制失败
    onError(e) {
      this.$message({
        showClose: true,
        message: "复制失败",
        type: "error",
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
  .btn-submit {
    background-color: #ffba4b;
    border-color: #ffba4b;
  }
  .btn-submit:focus,
  .btn-submit:hover {
    background-color: #ffc76e;
    border-color: #ffc76e;
  }
}
</style>
