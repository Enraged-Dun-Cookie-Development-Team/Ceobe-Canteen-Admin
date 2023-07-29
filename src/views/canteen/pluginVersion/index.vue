<template>
  <div id="mainWindow">
    <h3>插件端版本信息</h3>
    <el-form
      ref="pluginForm"
      :model="pluginForm"
      :rules="pluginRules"
      label-position="left"
      label-width="150px"
    >
      <!-- <el-form-item label="LOGO" prop="logo">
        <el-select
          label="logo"
          v-model="pluginForm.logo"
          placeholder="请选择logo"
          @change="changeLogo"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span class="img-area"><img :src="logoImg" /></span>
      </el-form-item> -->
      <el-form-item label="版本号" prop="version">
        <el-input
          v-model="pluginForm.version"
          placeholder="请输入版本号"
          @blur="changeVersion"
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="pluginForm.title"
          placeholder="请输入标题"
        />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="pluginForm.description"
          type="textarea"
          :rows="8"
          placeholder="请输入描述"
        />
      </el-form-item>
    </el-form>
    <el-form
      ref="downForm"
      :model="pluginForm.down"
      :rules="downRules"
      label-position="left"
      label-width="150px"
    >
      <el-form-item label="crx下载链接" prop="crx">
        <el-input
          v-model="pluginForm.down.crx"
          placeholder="请输入crx下载链接"
        />
      </el-form-item>
      <el-form-item label="crx备用下载链接" prop="spare_crx">
        <el-input
          v-model="pluginForm.down.spare_crx"
          placeholder="请输入crx备用下载链接"
        />
      </el-form-item>
      <el-form-item label="zip下载链接" prop="zip">
        <el-input
          v-model="pluginForm.down.zip"
          placeholder="请输入zip下载链接"
        />
      </el-form-item>
      <el-form-item label="zip备用下载链接" prop="spare_zip">
        <el-input
          v-model="pluginForm.down.spare_zip"
          placeholder="请输入zip备用下载链接"
        />
      </el-form-item>
      <el-form-item label="百度云" prop="spare">
        <el-input
          v-model="pluginForm.down.spare[0]"
          placeholder="请输入百度云链接"
        />
      </el-form-item>
      <el-form-item label="百度云描述" prop="spare_text">
        <el-input
          v-model="pluginForm.down.spare[1]"
          placeholder="请输入百度云描述"
        />
      </el-form-item>
      <el-form-item label="chrome商店" prop="chrome">
        <el-input
          v-model="pluginForm.down.chrome"
          placeholder="请输入chrome商店链接"
        />
      </el-form-item>
      <el-form-item label="edge商店" prop="edge">
        <el-input
          v-model="pluginForm.down.edge"
          placeholder="请输入edge商店链接"
        />
      </el-form-item>
      <el-form-item label="firefox商店" prop="firefox">
        <el-input
          v-model="pluginForm.down.firefox"
          placeholder="请输入firefox商店链接"
        />
      </el-form-item>
    </el-form>
    <form-button @submit="submitPluginVersion()" />
  </div>
</template>
<script>
import FormButton from "@/components/FormButton";
export default {
    components: { FormButton },
    data() {
        let VersionValidate = (rule, value, callback) => {
            let pattern = /^\d*\.\d+(\.\d+)?$/i;
            if (!pattern.test(value)) {
                callback(new Error("这不是正确版本号KUSO"));
            } else {
                callback();
            }
        };
        let spareValidate = (rule, value, callback) => {
            if (this.pluginForm.down.spare[0] == "") {
                callback(new Error("你怎么还是空着"));
            } else {
                callback();
            }
        };
        let spareTextValidate = (rule, value, callback) => {
            if (this.pluginForm.down.spare[1] == "") {
                callback(new Error("这个也不能为空啊"));
            } else {
                callback();
            }
        };
        return {
            options: [
                {
                    value: "icon.png",
                    label: "原始",
                },
                {
                    value: "icon_NewYear.png",
                    label: "新年",
                },
                {
                    value: "icon_Christmas.png",
                    label: "圣诞",
                },
            ],
            // logoImg: require("../../../assets/image/logo/icon.png"),
            pluginForm: {
                // logo: "icon.png",
                version: "",
                title: "",
                description: "",
                down: {
                    crx: "",
                    spare_crx: "",
                    zip: "",
                    spare_zip: "",
                    spare: ["https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA", "备用下载（提取码 jzq9）"],
                    chrome:
            "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                    edge: "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                    firefox:
            "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                },
            },
            pluginRules: {
                // logo: [
                //   {
                //     required: true,
                //     message: "全部都不要为空！",
                //     trigger: ["change", "blur"],
                //   },
                // ],
                version: [
                    {
                        required: true,
                        message: "全部都不要为空！！",
                        trigger: ["change", "blur"],
                    },
                    {
                        validator: VersionValidate,
                        message: "这不是正确版本号KUSO",
                        trigger: "blur",
                    },
                ],
                title: [
                    {
                        required: true,
                        message: "第二遍，全部都不要为空！！！",
                        trigger: ["change", "blur"],
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
            downRules: {
                crx: [
                    {
                        required: true,
                        message: "都说了不要为空了",
                        trigger: ["change", "blur"],
                    },
                ],
                spare_crx: [
                    {
                        required: true,
                        message: "都说了不要为空了",
                        trigger: ["change", "blur"],
                    },
                ],
                zip: [
                    {
                        required: true,
                        message: "都说了不要为空了啦",
                        trigger: ["change", "blur"],
                    },
                ],
                spare_zip: [
                    {
                        required: true,
                        message: "都说了不要为空了啦",
                        trigger: ["change", "blur"],
                    },
                ],
                spare: [
                    {
                        validator: spareValidate,
                        message: "你怎么还是空着",
                        trigger: ["change", "blur"],
                    },
                ],
                spare_text: [
                    {
                        validator: spareTextValidate,
                        message: "这个也不能为空啊",
                        trigger: ["change", "blur"],
                    },
                ],
                chrome: [
                    {
                        required: true,
                        message: "空着你是想怎样",
                        trigger: ["change", "blur"],
                    },
                ],
                edge: [
                    {
                        required: true,
                        message: "啊啊啊，别空着啊",
                        trigger: ["change", "blur"],
                    },
                ],
                firefox: [
                    {
                        required: true,
                        message: "求求你填上吧",
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
        changeVersion() {
            this.pluginForm.title = `小刻食堂翻新啦 - ${this.pluginForm.version}`;
            this.pluginForm.down.crx = `https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/${this.pluginForm.version}/Ceobe-Canteen-${this.pluginForm.version}.crx`;
            this.pluginForm.down.zip = `https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/${this.pluginForm.version}/Ceobe-Canteen-${this.pluginForm.version}.zip`;
            this.pluginForm.down.spare_crx = `https://kgithub.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/${this.pluginForm.version}/Ceobe-Canteen-${this.pluginForm.version}.crx`;
            this.pluginForm.down.spare_zip = `https://kgithub.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/${this.pluginForm.version}/Ceobe-Canteen-${this.pluginForm.version}.zip`;
        },
        // changeLogo() {
        //   this.logoImg = require(`../../../assets/image/logo/${this.pluginForm.logo}`);
        // },
        // 提交表单到服务器
        submitPluginVersion() {
            this.$refs["pluginForm"].validate((validPlugin) => {
                if (validPlugin) {
                    this.$refs["downForm"].validate((validDown) => {
                        if (validDown) {
                            this.$store
                                .dispatch("version/submitPluginVersion", this.pluginForm)
                                .then(() => {
                                    this.$message({
                                        showClose: true,
                                        message: "上传上去啦",
                                        type: "success",
                                    });
                                });
                        }
                    });
                }
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
