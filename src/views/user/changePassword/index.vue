<template>
  <div id="mainWindow">
    <h3>修改密码</h3>
    <el-form
      ref="passwordForm"
      class="password-form"
      :rules="passwordRules"
      :model="passwordForm"
      auto-complete="on"
      label-position="left"
      label-width="100px"
    >
      <el-form-item
        label="旧密码" class="width50"
        prop="old_password"
      >
        <el-input
          ref="oldpasswordType"
          v-model="passwordForm.old_password"
          :type="passwordType.oldpasswordType"
          placeholder="请输入旧密码进行验证"
        />
        <span class="show-pwd" @click="showPwd('oldpasswordType')">
          <svg-icon
            :icon-class="
              passwordType.oldpasswordType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>
      <el-form-item
        label="新密码" class="width50"
        prop="new_password"
      >
        <el-input
          ref="newpasswordType"
          v-model="passwordForm.new_password"
          :type="passwordType.newpasswordType"
          placeholder="请输入新密码"
        />
        <span class="show-pwd" @click="showPwd('newpasswordType')">
          <svg-icon
            :icon-class="
              passwordType.newpasswordType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>
      <el-form-item
        label="再次新密码" class="width50"
        prop="repassword"
      >
        <el-input
          ref="repasswordType"
          v-model="passwordForm.repassword"
          :type="passwordType.repasswordType"
          placeholder="请再次输入密码"
        />
        <span class="show-pwd" @click="showPwd('repasswordType')">
          <svg-icon
            :icon-class="
              passwordType.repasswordType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          class="btn-password" type="primary"
          @click="changePassword"
        >
          提交修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    name: "ChangePassword",
    data() {
        const validateRepassword = (_, value, callback) => {
            if (value !== this.passwordForm.new_password) {
                return callback(new Error("两次密码不一致"));
            } else {
                return callback();
            }
        };
        return {
            passwordForm: {
                old_password: "",
                new_password: "",
                repassword: "",
            },
            passwordType: {
                oldpasswordType: "password",
                newpasswordType: "password",
                repasswordType: "password",
            },
            passwordRules: {
                old_password: [
                    { required: true, message: "请输入旧密码", trigger: "blur" },
                ],
                new_password: [
                    { required: true, message: "请输入新密码", trigger: "blur" },
                ],
                repassword: [
                    { required: true, message: "请再次输入新密码", trigger: "blur" },
                    { validator: validateRepassword, trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        showPwd(type) {
            if (this.passwordType[type] === "password") {
                this.passwordType[type] = "";
            } else {
                this.passwordType[type] = "password";
            }
            this.$nextTick(() => {
                this.$refs[type].focus();
            });
        },

        changePassword() {
            this.$refs["passwordForm"].validate((valid) => {
                if (valid) {
                    this.$store
                        .dispatch("user/changePassword", {
                            old_password: this.passwordForm.old_password,
                            new_password: this.passwordForm.new_password,
                        })
                        .then(() => {
                            this.$message({
                                showClose: true,
                                message: "修改密码成功",
                                type: "success",
                            });
                        })
                        .catch(() => {
                            this.$message({
                                showClose: true,
                                message: "修改密码失败",
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

  .width50 {
    width: 50%;
  }

  .show-pwd {
    position: absolute;
    top: 2px;
    right: 10px;
    font-size: 16px;
    color: #889AA4;
    cursor: pointer;
    user-select: none;
  }

  :deep(label) {
    font-weight: 500;
  }
}
</style>
