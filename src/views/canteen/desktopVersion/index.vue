<template>
  <div id="mainWindow">
    <h3>桌面端版本信息</h3>
    <el-form
      ref="desktopForm"
      :model="desktopForm"
      :rules="phoneRules"
      label-position="left"
      label-width="150px"
    >
      <el-form-item label="版本号" prop="version">
        <el-input
          v-model="desktopForm.version"
          placeholder="请输入版本号"
          @blur="changeVersion"
        />
      </el-form-item>
      <el-form-item label="强制更新" prop="force">
        <el-switch v-model="desktopForm.force" />
      </el-form-item>
      <el-form-item label="上次强制版本" prop="last_force_version">
        <el-input
          v-model="desktopForm.last_force_version"
          placeholder="请输入标题"
        />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="desktopForm.description"
          type="textarea"
          :rows="8"
          placeholder="请输入描述"
        />
      </el-form-item>
      <el-form-item label="exe下载链接" prop="exe">
        <el-input
          v-model="desktopForm.exe"
          placeholder="请输入exe下载链接"
        />
      </el-form-item>
      <el-form-item label="exe备用下载链接" prop="spare_exe">
        <el-input
          v-model="desktopForm.spare_exe"
          placeholder="请输入exe备用下载链接"
        />
      </el-form-item>
      <el-form-item label="dmg下载链接" prop="dmg">
        <el-input
          v-model="desktopForm.dmg"
          placeholder="请输入dmg下载链接"
        />
      </el-form-item>
      <el-form-item label="dmg备用下载链接" prop="spare_dmg">
        <el-input
          v-model="desktopForm.spare_dmg"
          placeholder="请输入dmg备用下载链接"
        />
      </el-form-item>
      <el-form-item label="百度云" prop="baidu">
        <el-input
          v-model="desktopForm.baidu"
          placeholder="请输入百度云链接"
        />
      </el-form-item>
      <el-form-item label="百度云描述" prop="baidu_text">
        <el-input
          v-model="desktopForm.baidu_text"
          placeholder="请输入百度云描述"
        />
      </el-form-item>
    </el-form>
    <form-button @submit="submitDesktopVersion" />
  </div>
</template>
<script>
import FormButton from "@/components/FormButton/index";
export default {
    components:{
        FormButton
    },
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
            desktopForm: {
                version: "",
                force: true,
                last_force_version: "",
                description: "",
                exe: "",
                spare_exe: "",
                dmg: "",
                spare_dmg: "",
                baidu: "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA",
                baidu_text: "备用下载（提取码 jzq9）",
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
                exe: [
                    {
                        required: true,
                        message: "不许空不许空",
                        trigger: ["change", "blur"],
                    },
                ],
                spare_exe: [
                    {
                        required: true,
                        message: "不许空不许空!!",
                        trigger: ["change", "blur"],
                    },
                ],
                dmg: [
                    {
                        required: true,
                        message: "不许空不许空",
                        trigger: ["change", "blur"],
                    },
                ],
                spare_dmg: [
                    {
                        required: true,
                        message: "不许空不许空!!",
                        trigger: ["change", "blur"],
                    },
                ],
                baidu: [
                    {
                        required: true,
                        message: "都说了不要为空了啦",
                        trigger: ["change", "blur"],
                    },
                ],
                baidu_text: [
                    {
                        required: true,
                        message: "都说了不要为空了啦",
                        trigger: ["change", "blur"],
                    },
                ],
            },
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {},
        // 提交表单到服务器
        submitDesktopVersion() {
            this.$refs["desktopForm"].validate((valid) => {
                if (valid) {
                    this.$store
                        .dispatch("version/submitDesktopVersion", this.desktopForm)
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
        changeVersion() {
            this.desktopForm.exe = `https://github.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Electron/releases/download/${this.desktopForm.version}/Ceobe-Canteen-${this.desktopForm.version}.exe`;
            this.desktopForm.spare_exe = `https://kgithub.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Electron/releases/download/${this.desktopForm.version}/Ceobe-Canteen-${this.desktopForm.version}.exe`;
            this.desktopForm.dmg = `https://github.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Electron/releases/download/${this.desktopForm.version}/Ceobe-Canteen-${this.desktopForm.version}.dmg`;
            this.desktopForm.spare_dmg = `https://kgithub.com/Enraged-Dun-Cookie-Development-Team/Ceobe-Canteen-Electron/releases/download/${this.desktopForm.version}/Ceobe-Canteen-${this.desktopForm.version}.dmg`;
        },
    },
};
</script>

<style lang="scss" scoped>
#mainWindow {

  :deep(label) {
    font-weight: 500;
  }

  .img-area {
    position: absolute;
    height: 40px;

    img {
      margin-left: 20px;
      height: 40px;
    }
  }
}
</style>
