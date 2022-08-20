<template>
  <div id="mainWindow">
    <h3>插件端版本信息</h3>
    <el-form
      ref="phoneForm"
      :model="phoneForm"
      :rules="phoneRules"
      label-position="left"
      label-width="110px"
    >
      <el-form-item label="版本号" prop="version">
        <el-input
          v-model="phoneForm.version"
          placeholder="请输入版本号"
        ></el-input>
      </el-form-item>
      <el-form-item label="强制更新" prop="force">
        <el-switch
          v-model="phoneForm.force"
          active-color="#ffba4b"
          inactive-color="#97a8be"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="上次强制版本" prop="last_force_version">
        <el-input
          v-model="phoneForm.last_force_version"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          :rows="8"
          v-model="phoneForm.description"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <form-button @submit="submitPhoneVersion"></form-button>
  </div>
</template>
<script>
import FormButton from "@/components/FormButton/index"
export default {
  data() {
    let VersionValidate = (rule, value, callback) => {
      let pattern = /^\d*\.\d+\.\d+$/i;
      if (!pattern.test(value)) {
        callback(new Error("这不是正确版本号KUSO"));
      } else {
        callback();
      }
    };
    return {
      phoneForm: {
        version: "",
        force: true,
        last_force_version: "",
        description: "",
      },
      phoneRules: {
        version: [
          {
            required: true,
            message: "全部都要填上呀",
            trigger: ["change", "blur"],
          },
          {
            validator: VersionValidate,
            message: "这不是正确版本号KUSO",
            trigger: "blur",
          },
        ],
        force: [
          {
            required: true,
            message: "这里你也触发不出来",
            trigger: "blur",
          },
        ],
        last_force_version: [
          {
            required: true,
            message: "别空着别空着",
            trigger: ["change", "blur"],
          },
          {
            validator: VersionValidate,
            message: "这不是正确版本号KUSO",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "都说了不要为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components:{
    FormButton
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    // 提交表单到服务器
    submitPhoneVersion() {
      this.$refs["phoneForm"].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("version/submitPhoneVersion", this.phoneForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "上传上去啦",
                type: "success",
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
  /deep/ label {
    font-weight: 500;
  }
  .img-area {
    position: absolute;
    height: 40px;
    img {
      height: 40px;
      margin-left: 20px;
    }
  }
}
</style>
