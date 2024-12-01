<template>
  <el-drawer
    :visible.sync="showDraw"
    :title="create?'新建发布版本':'修改发布版本'"
    direction="rtl"
    size="60%"
    custom-class="drawer-max-height"
    :before-close="beforeClose"
    @close="onClose"
  >
    <div class="edit-area pr-24 pl-24">
      <el-form
        ref="versionForm"
        :model="versionData"
        label-position="right"
        label-width="160px"
      >
        <el-form-item
          label="版本号:" prop="version"
          :rules="versionRules.version"
        >
          <el-input
            v-model="versionData.version" :disabled="!create"
            placeholder="请输入版本号"
          />
        </el-form-item>
        <el-form-item
          label="最低支持版本号:" prop="previous_mandatory_version"
          :rules="versionRules.version"
        >
          <el-input
            v-model="versionData.previous_mandatory_version" :disabled="!create"
            placeholder="请输入最低支持版本号"
          />
        </el-form-item>
        <el-form-item
          label="描述:" prop="description"
          :rules="versionRules.description"
        >
          <el-input
            v-model="versionData.description"
            type="textarea"
            :rows="8"
            placeholder="请输入描述"
          />
        </el-form-item>
        <el-form-item
          label="平台:" prop="platform"
          :rules="versionRules.platform"
        >
          <el-select
            v-model="versionData.platform"
            :disabled="!create"
            placeholder="请选择平台"
          >
            <el-option
              v-for="item in platformOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="添加下载:" prop="download_source">
          <i class="el-icon-circle-plus-outline add-icon" @click="addDownload"></i>
        </el-form-item>

        <el-collapse style="margin-bottom: 24px;">
          <el-collapse-item v-for="(download_info, i) in versionData.download_source" :key="i">
            <template slot="title">
              <div class="collapse-header">
                <div style="color: #FFC86F;">
                  {{ "下载链接：" + (i+1) + ". " + (download_info.name || "") }}
                </div>
                <div>
                  <el-button
                    icon="el-icon-delete" class="btn-editor btn-delete" round
                    @click.stop="removeDownload(index)"
                  />
                </div>
              </div>
            </template>
            <el-form-item
              label="下载源名称:" :prop="`download_source[${i}].name`"
              :rules="versionRules.download_source_name"
            >
              <el-input v-model="download_info.name" placeholder="请输入下载源名称" />
            </el-form-item>
            <el-form-item label="下载源描述:" :prop="`download_source[${i}].description`">
              <el-input v-model="download_info.description" placeholder="请输入下载源描述" />
            </el-form-item>
            <el-form-item
              label="主下载链接:" :prop="`download_source[${i}].primary_url.url`"
              :rules="versionRules.download_url"
            >
              <el-input v-model="download_info.primary_url.url" placeholder="请输入主下载链接" />
            </el-form-item>
            <el-form-item label="手动安装:" :prop="`download_source[${i}].manual`">
              <el-switch v-model="download_info.primary_url.manual" />
            </el-form-item>
            <el-form-item label="支持平台:" :prop="`download_source[${i}].support_platforms`">
              <el-select
                v-model="download_info.primary_url.support_platforms"
                multiple placeholder="请选择支持平台"
              >
                <el-option
                  v-for="item in supportPlatform"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>


            <el-form-item label="备用下载:" :prop="`download_source[${i}].spare_urls`">
              <i class="el-icon-circle-plus-outline add-icon" @click="addUrl(i)"></i>
            </el-form-item>

            <el-collapse style="margin-bottom: 24px;">
              <el-collapse-item v-for="(url_info, index) in download_info.spare_urls" :key="index">
                <template slot="title">
                  <div class="collapse-header">
                    <div>{{ "备用链接：" + (index+1) + ". " + (url_info.name || "") }}</div>
                    <div>
                      <el-button
                        icon="el-icon-delete" class="btn-editor btn-delete" round
                        @click.stop="removeUrl(i, index)"
                      />
                    </div>
                  </div>
                </template>
                <el-form-item
                  label="备用下载链接名:" :prop="`download_source[${i}].spare_urls[${index}].name`"
                  :rules="versionRules.download_name"
                >
                  <el-input v-model="url_info.name" placeholder="请输入备用下载链接名" />
                </el-form-item>
                <el-form-item
                  label="备用下载链接:" :prop="`download_source[${i}].spare_urls[${index}].url`"
                  :rules="versionRules.download_url"
                >
                  <el-input v-model="url_info.url" placeholder="请输入备用下载链接" />
                </el-form-item>
                <el-form-item label="手动安装:" :prop="`download_source[${i}].spare_urls[${index}].manual`">
                  <el-switch v-model="url_info.manual" />
                </el-form-item>
                <el-form-item label="支持平台:" :prop="`download_source[${i}].spare_urls[${index}].support_platforms`">
                  <el-select
                    v-model="url_info.support_platforms"
                    multiple placeholder="请选择支持平台"
                  >
                    <el-option
                      v-for="item in supportPlatform"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>
        <el-form-item>
          <el-button
            v-if="create"
            type="primary"
            size="small"
            @click="createData"
          >
            创建
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            @click="updateData"
          >
            更新
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>

export default {
    name: "EditVersion",
    props: {
        platformOption: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        let VersionValidate = (rule, value, callback) => {
            let pattern = /^\d*\.\d+(\.\d+)?$/i;
            if (!pattern.test(value)) {
                callback(new Error("这不是正确版本号KUSO"));
            } else {
                callback();
            }
        };
        return {
            create: false,
            showDraw: false,
            versionData: this.initVersionData(),
            versionRules: {
                version: [
                    {
                        required: true, message: "请输入名字", trigger: "blur"
                    },
                    {
                        validator: VersionValidate,
                        message: "这不是正确版本号KUSO",
                        trigger: "blur",
                    },
                ],
                description: {
                    required: true, message: "请输入描述", trigger: "blur"
                },
                platform: {
                    required: true, message: "请选择平台", trigger: "blur"
                },
                download_source_name: {
                    required: true, message: "请输入下载源名称", trigger: "blur"
                },
                download_source_description: {
                    required: true, message: "请输入下载源描述", trigger: "blur"
                },
                download_url: {
                    required: true, message: "下载链接不能为空", trigger: "blur"
                },
                download_name: {
                    required: true, message: "请输入备用下载链接名", trigger: "blur"
                }
            },
            supportPlatform: [
                {
                    item: "Linux",
                    value: "Linux",
                },
                {
                    item: "MacOS",
                    value: "MacOS",
                },
                {
                    item: "Chrome",
                    value: "Chrome",
                },
                {
                    item: "Firefox",
                    value: "Firefox",
                },
                {
                    item: "Edge",
                    value: "Edge",
                },
                {
                    item: "Webkit",
                    value: "Webkit",
                },
                {
                    item: "Safari",
                    value: "Safari",
                },
                {
                    item: "IE",
                    value: "IE",
                },
                {
                    item: "BrowserZIP",
                    value: "BrowserZIP",
                },
                {
                    item: "Android",
                    value: "Android",
                },
                {
                    item: "Ios",
                    value: "Ios",
                },
                {
                    item: "WindowsPhone",
                    value: "WindowsPhone",
                },
                {
                    item: "Harmony",
                    value: "Harmony",
                }
            ],
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
        },
        // 清除表单验证
        clearValidate() {
            this.$nextTick(() => {
                this.$refs["versionForm"].clearValidate();
            });
        },
        initVersionData() {
            return {
                version: "",
                previous_mandatory_version: "",
                description: null,
                platform: null,
                download_source: [
                    {
                        primary_url: {
                            url: "",
                            manual: false,
                            support_platforms: [],
                        },
                        spare_urls: []
                    }
                ]
            };
        },
        initDownloadInfo() {
            return {
                primary_url: {
                    url: "",
                    manual: false,
                    support_platforms: [],
                },
                spare_urls: []
            };
        },
        initSpareUrl() {
            return {
                name: "",
                url: "",
                manual: false,
                support_platforms: [],
            };
        },
        // 打开抽屉
        open(create, data) {
            this.create = create;
            console.log(data);
            if(data) {
                this.versionData = JSON.parse(JSON.stringify(data));
            } else {
                this.versionData = this.initVersionData();
            }
            this.showDraw = true;
        },
        // 关闭抽屉前
        beforeClose(done) {
            this.$confirm("确定关闭吗？").then(_ => { this.visible = false; done(); }).catch(_ => { });
        },
        // 关闭抽屉
        onClose() {
            this.init();
            this.clearValidate();
        },
        createData() {
            let allPass = true;
            this.$refs["versionForm"].validate((valid) => {
                if (!valid) {
                    allPass = false;
                    return;
                }
            });
            if (allPass) {
                this.$store
                    .dispatch("version/createVersion",this.versionData)
                    .then(() => {
                        this.$message({
                            showClose: true,
                            message: "创建成功",
                            type: "success",
                        });
                        this.showDraw = false;
                        this.init();
                    }).catch(() =>{
                        this.$message({
                            showClose: true,
                            message: "创建失败",
                            type: "error",
                        });
                    }).finally(()=>{
                        this.$emit("uploadDone");
                    });

            }

        },
        updateData() {
            let allPass = true;
            this.$refs["versionForm"].validate((valid) => {
                if (!valid) {
                    allPass = false;
                    return;
                }
            });
            if (allPass)
                this.$store
                    .dispatch("version/modifyVersion",this.versionData)
                    .then(() => {
                        this.$message({
                            showClose: true,
                            message: "修改成功",
                            type: "success",
                        });
                        this.showDraw = false;
                        this.init();
                    }).catch(() =>{
                        this.$message({
                            showClose: true,
                            message: "修改失败",
                            type: "error",
                        });
                    }).finally(()=>{
                        this.$emit("uploadDone");
                    });
        },
        addUrl(i) {
            this.versionData.download_source[i].spare_urls.push(this.initSpareUrl());
        },
        removeUrl(i, index) {
            this.versionData.download_source[i].spare_urls.splice(index, 1);
        },
        addDownload() {
            this.versionData.download_source.push(this.initDownloadInfo());
        },
        removeDownload(index) {
            this.versionData.download_source.splice(index, 1);
        }
    }
};
</script>

<style lang="scss" scoped>

.pr-24 {
  padding-right: 24px;
}

.pl-24 {
  padding-left: 24px;
}

.add-icon {
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: #FFBA4B;
  }
}

.collapse-header {
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  width: 100%;
}

.btn-add {
  color: white;
  background-color: #67C23A;
}

.btn-delete {
  color: white;
  background-color: #F56C6C;
}
</style>