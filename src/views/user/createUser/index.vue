<template>
  <div id="mainWindow">
    <h3>新入职一个员工</h3>
    <el-form
      ref="permission"
      class="permission-form"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="职位">
        <el-radio
          v-model="permission" class="radio"
          label="chef"
        >
          主厨
        </el-radio>
        <el-radio
          v-model="permission" class="radio"
          label="cooker"
        >
          厨师
        </el-radio>
        <el-radio
          v-model="permission" class="radio"
          label="architect"
        >
          饼学家
        </el-radio>
        <el-radio
          v-model="permission" class="radio"
          label="porter"
        >
          配餐员
        </el-radio>
        <el-button
          class="btn-confirm" type="primary"
          @click="entryCanteen"
        >
          确定入职
        </el-button>
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
        <el-input v-model="user.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" :disabled="true" />
      </el-form-item>
      <el-form-item>
        <el-button
          v-clipboard:copy="copytext"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          type="primary"
          class="btn-copy"
        >
          复制信息
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    name: "CreateUser",
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
                .then(() => {
                    this.copytext = `用户名：${this.user.username}\n密码：${this.user.password}`;
                })
                .catch(() => {
                    this.$message({
                        showClose: true,
                        message: "新建用户失败",
                        type: "error",
                    });
                });
        },
        // 复制成功
        onCopy(event) {
            this.$message({
                showClose: true,
                message: "已成功复制到剪贴板",
                type: "success",
            });
        },
        // 复制失败
        onError(event) {
            this.$message({
                showClose: true,
                message: "复制失败",
                type: "error",
            });
        },
    },
};
</script>
<style lang="scss" scoped>
#mainWindow {

  :deep(label) {
    font-weight: 500;
  }
}
</style>
