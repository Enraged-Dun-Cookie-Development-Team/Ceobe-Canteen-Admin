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
      <el-form-item label="旧密码" class="width50" prop="oldpassword">
        <el-input
          ref="oldpasswordType"
          :type="passwordType.oldpasswordType"
          v-model="passwordForm.oldpassword"
          placeholder="请输入旧密码进行验证"
        >
        </el-input>
        <span class="show-pwd" @click="showPwd('oldpasswordType')">
          <svg-icon
            :icon-class="
              passwordType.oldpasswordType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>
      <el-form-item label="新密码" class="width50" prop="newpassword">
        <el-input
          ref="newpasswordType"
          :type="passwordType.newpasswordType"
          v-model="passwordForm.newpassword"
          placeholder="请输入新密码"
        >
        </el-input>
        <span class="show-pwd" @click="showPwd('newpasswordType')">
          <svg-icon
            :icon-class="
              passwordType.newpasswordType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>
      <el-form-item label="再次新密码" class="width50" prop="repassword">
        <el-input
          ref="repasswordType"
          :type="passwordType.repasswordType"
          v-model="passwordForm.repassword"
          placeholder="请再次输入密码"
        >
        </el-input>
        <span class="show-pwd" @click="showPwd('repasswordType')">
          <svg-icon
            :icon-class="
              passwordType.repasswordType === 'password' ? 'eye' : 'eye-open'
            "
          />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-password" type="primary" @click="changePassword"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    const validateRepassword = (rule, value, callback) => {
      if (value !== this.passwordForm.newpassword) {
        return callback(new Error("两次密码不一致"));
      } else {
        return callback();
      }
    };
    return {
      passwordForm: {
        oldpassword: "",
        newpassword: "",
        repassword: "",
      },
      passwordType: {
        oldpasswordType: "password",
        newpasswordType: "password",
        repasswordType: "password",
      },
      passwordRules: {
        oldpassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newpassword: [
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
              oldpassword: this.passwordForm.oldpassword,
              newpassword: this.passwordForm.newpassword,
            })
            .then((_) => {
              this.$message({
                showClose: true,
                message: "修改密码成功",
                type: "success",
              });
            })
            .catch((_) => {
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
<style lang="less" scoped>
#mainWindow {
  .width50 {
    width: 50%;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  /deep/ label {
    font-weight: 500;
  }

  .btn-password {
    background-color: #ffba4b;
    border-color: #ffba4b;
  }
  .btn-password:focus,
  .btn-password:hover {
    background-color: #ffc76e;
    border-color: #ffc76e;
  }
}
</style>
