<template>
  <el-drawer
    :visible.sync="showDraw"
    :title="create?'创建数据源':'编辑数据源'"
    direction="rtl"
    size="40%"
    custom-class="drawer-max-height"
    @close="onClose"
  >
    <div class="edit-area pr-24 pl-24">
      <el-form
        ref="datasourceForm"
        :model="datasourceData"
        label-position="right" label-width="120px"
        :rules="datasourceRules"
      >
        <el-form-item label="平台:" prop="platform">
          <el-select
            v-model="datasourceData.platform" clearable
            placeholder="请选择"
            size="small"
            :disabled="!create"
            @blur.native.capture="fillPlatform"
          >
            <el-option
              v-for="item in platformIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="datasourceData.platform" label="数据源:"
          prop="datasource"
        >
          <el-select
            v-model="datasourceData.datasource" clearable
            placeholder="请选择"
            size="small" :disabled="!create"
          >
            <el-option
              v-for="item in datasourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="datasourceData.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="头像:" prop="avatar">
          <upload-img
            :file-list="fileList" :url="url"
            @success="(data)=>onSuccess(data)" @remove="onRemove()"
          />
        </el-form-item>
        <el-form-item label="链接:" prop="jump_url">
          <el-input
            v-model="datasourceData.jump_url" placeholder="请输入跳转链接"
            @blur="changeEmptyToNull"
          />
        </el-form-item>
      </el-form>
      <arknights-game-public
        v-if="datasourceData.platform == 'arknights-game'" ref="extendForm"
        @complete="completeForm"
      />
      <arknights-website-public
        v-else-if="datasourceData.platform == 'arknights-website'" ref="extendForm"
        @complete="completeForm"
      />
      <endfield-game-public
        v-else-if="datasourceData.platform == 'endfield-game'" ref="extendForm"
        @complete="completeForm"
      />
      <bilibili-dynamic
        v-else-if="datasourceData.platform == 'bilibili'" ref="extendForm"
        @complete="completeForm"
      />
      <netease-cloud-albums
        v-else-if="datasourceData.platform == 'netease-cloud-music'" ref="extendForm"
        @complete="completeForm"
      />
      <weibo-dynamic
        v-else-if="datasourceData.platform == 'weibo'" ref="extendForm"
        @complete="completeForm"
      />
      <default
        v-else ref="extendForm"
        @complete="completeForm"
      />
    </div>
  </el-drawer>
</template>

<script>
import UploadImg from "@/components/UploadImg/index.vue";
import Default from "./editForm/default.vue";
import ArknightsGamePublic from "./editForm/arknightsGamePublic.vue";
import ArknightsWebsitePublic from "./editForm/arknightsWebsitePublic.vue";
import EndfieldGamePublic from "./editForm/endfieldGamePublic.vue";
import BilibiliDynamic from "./editForm/bilibiliDynamic.vue";
import NeteaseCloudAlbums from "./editForm/neteaseCloudAlbums.vue";
import WeiboDynamic from "./editForm/weiboDynamic.vue";
import { BILIBILI_OPTION, WEIBO_OPTION, NETEASE_OPTION, ARKNIGHTS_GAME_OPTION, ARKNIHTS_WEBSITE_OPTION, DATASOURCE_UNIQUE_KEY, ENDFIELD_GAME_OPTION } from "@/const/fetcherConfig.js";

export default {
    name: "EditDatasource",
    components: { UploadImg, ArknightsGamePublic, ArknightsWebsitePublic, EndfieldGamePublic, BilibiliDynamic, NeteaseCloudAlbums, WeiboDynamic, Default },
    props: {
    },
    data() {
        return {
            create: false,
            showDraw: false,
            url: "api/v1/admin/fetcherConfig/uploadDatasourceAvatar",
            datasourceData: {},
            platformIdOptions:[],
            datasourceOptions: [],
            datasourceRules: {
                platform: {
                    required: true, message: "请选择平台", trigger: "change"
                },
                datasource: {
                    required: true, message: "请选择数据源", trigger: "change"
                },
                nickname: {
                    required: true, message: "请选择昵称", trigger: "blur"
                },
                avatar: {
                    required: true, message: "请上传图片", trigger: "change"
                },
                jump_url: {
                    required: false, message: "请选择昵称", trigger: "blur"
                },
            }
        };
    },
    computed:{
        fileList(){
            return this.datasourceData.avatar?[{ name: '', url: this.datasourceData.avatar }] : [];
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initPlatformData();
        },
        // 清除表单验证
        clearValidate() {
            this.$nextTick(() => {
                this.$refs["datasourceForm"].clearValidate();
            });
        },
        initPlatformData() {
            this.datasourceData = {
                platform: "",
                datasource: "",
                nickname: "",
                avatar: "",
                jump_url: null,
                config: {}
            };
        },
        // 打开抽屉
        open(create, platformIdOptions, data) {
            this.create = create;
            this.platformIdOptions = platformIdOptions;
            if(data) {
                this.datasourceData = JSON.parse(JSON.stringify(data));
                // 使用nextTick避免无法获取到ref
                this.$nextTick(()=>{
                    this.$refs.extendForm.open(create, this.datasourceData.config);
                });
            }
            this.showDraw = true;
        },
        // 关闭抽屉
        onClose() {
            this.init();
            this.clearValidate();
        },
        // 图片成功
        onSuccess(data) {
            this.datasourceData.avatar = data?.data?.url;
        },
        // 删除图片
        onRemove() {
            this.datasourceData.avatar = '';
        },
        // 补充平台对应数据呀u呢信息
        fillPlatform() {
            switch(this.datasourceData.platform) {
            case "bilibili":
                this.datasourceData.datasource = "";
                this.datasourceOptions = BILIBILI_OPTION;
                // 使用nextTick避免无法获取到ref
                this.$nextTick(()=>{
                    this.$refs.extendForm.openWithoutConfig(this.create);
                });
                break;
            case "weibo":
                this.datasourceData.datasource = "";
                this.datasourceOptions = WEIBO_OPTION;
                // 使用nextTick避免无法获取到ref
                this.$nextTick(()=>{
                    this.$refs.extendForm.openWithoutConfig(this.create);
                });
                break;
            case "netease-cloud-music":
                this.datasourceData.datasource = "";
                this.datasourceOptions = NETEASE_OPTION;
                // 使用nextTick避免无法获取到ref
                this.$nextTick(()=>{
                    this.$refs.extendForm.openWithoutConfig(this.create);
                });
                break;
            case "arknights-game":
                this.datasourceData.datasource = "";
                this.datasourceOptions = ARKNIGHTS_GAME_OPTION;
                // 使用nextTick避免无法获取到ref
                this.$nextTick(()=>{
                    this.$refs.extendForm.openWithoutConfig(this.create);
                });
                break;
            case "arknights-website":
                this.datasourceData.datasource = "";
                this.datasourceOptions = ARKNIHTS_WEBSITE_OPTION;
                // 使用nextTick避免无法获取到ref
                this.$nextTick(()=>{
                    this.$refs.extendForm.openWithoutConfig(this.create);
                });
                break;
            case "endfield-game":
                this.datasourceData.datasource = "";
                this.datasourceOptions = ENDFIELD_GAME_OPTION;
                // 使用nextTick避免无法获取到ref
                this.$nextTick(()=>{
                    this.$refs.extendForm.openWithoutConfig(this.create);
                });
                break;
            default:
                this.datasourceData.datasource = "";
                // 使用nextTick避免无法获取到ref
                this.$nextTick(()=>{
                    this.$refs.extendForm.openWithoutConfig(this.create);
                });
                break;
            }
        },
        completeForm(config) {
            this.datasourceData.config = config;
            let allPass = true;
            this.$refs["datasourceForm"].validate((valid) => {
                if (!valid) {
                    allPass = false;
                    return;
                }
            });
            if (allPass) {
                this.$refs.extendForm.outValidComplete();
                if (this.create) {
                    this.createData();
                } else {
                    this.updateData();
                }
            }
        },
        createData() {
            this.$store
                .dispatch("fetcherConfig/createDatasource",{ unique_key: DATASOURCE_UNIQUE_KEY[this.datasourceData.datasource], ...this.datasourceData  })
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
        },
        updateData() {
            this.$store
                .dispatch("fetcherConfig/updateDatasource",{ unique_key: DATASOURCE_UNIQUE_KEY[this.datasourceData.datasource], ...this.datasourceData })
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
        // 更改跳转链接空为null
        changeEmptyToNull() {
            if (this.datasourceData.jump_url.trim() == '') {
                this.datasourceData.jump_url = null;
            }
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
</style>