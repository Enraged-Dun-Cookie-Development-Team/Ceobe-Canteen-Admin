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
        ref="platformForm"
        :model="datasourceData"
        label-position="right" label-width="120px"
      >
        <el-form-item label="平台:" prop="platform">
          <el-select
            v-model="datasourceData.platform" clearable
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in platformOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @blur="fillPlatform"
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
            size="small"
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
            :file-list="datasourceData.avatar?[{name: '', url: datasourceData.avatar}] : []" :url="url"
            @success="(data)=>onSuccess(data)" @remove="onRemove()"
          />
        </el-form-item>
        <arknights-game-public v-if="datasourceData.platform == 'arknights-game'" />
        <arknights-website-public v-else-if="datasourceData.platform == 'arknights-website'" />
        <bilibili-dynamic v-else-if="datasourceData.platform == 'bilibili'" />
        <netease-cloud-albums v-else-if="datasourceData.platform == 'netease-cloud-music'" />
        <weibo-dynamic v-else-if="datasourceData.platform == 'weibo'" />
        <default v-else />
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import UploadImg from "@/components/UploadImg/index.vue";
import Default from "./datasource/default.vue";
import ArknightsGamePublic from "./datasource/arknightsGamePublic.vue";
import ArknightsWebsitePublic from "./datasource/arknightsWebsitePublic.vue";
import BilibiliDynamic from "./datasource/bilibiliDynamic.vue";
import NeteaseCloudAlbums from "./datasource/neteaseCloudAlbums.vue";
import WeiboDynamic from "./datasource/weiboDynamic.vue";
import { BILIBILI_OPTION, WEIBO_OPTION, NETEASE_OPTION, ARKNIGHTS_GAME_OPTION, ARKNIHTS_WEBSITE_OPTION } from "@/const/fetcherConfig.js";
export default {
    name: "EditDatasource",
    components: { UploadImg, ArknightsGamePublic, ArknightsWebsitePublic, BilibiliDynamic, NeteaseCloudAlbums, WeiboDynamic, Default },
    props: {
    },
    data() {
        return {
            create: false,
            showDraw: false,
            url: "api/v1/admin/fetcherConfig/uploadAvatar",
            datasourceData: {},
            platformOptions:[],
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initPlatformData();
        },
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
                detail: {}
            };
        },
        open(create, platformOptions, data) {
            this.create = create;
            this.platformOptions = platformOptions;
            if(data) {
                this.datasourceData = data;
            }
            this.showDraw = true;
        },
        onClose() {

        },
        onSuccess(data) {
            this.datasourceData.avatar = data?.data?.url;
        },
        onRemove() {
            this.datasourceData.avatar = '';
        },
        fillPlatform() {
            switch(this.datasourceData.platform) {
            case "bilibili":
                this.datasourceData = BILIBILI_OPTION;
                break;
            case "weibo":
                this.datasourceData = WEIBO_OPTION;
                break;
            case "netease-cloud-music":
                this.datasourceData = NETEASE_OPTION;
                break;
            case "arknights-game":
                this.datasourceData = ARKNIGHTS_GAME_OPTION;
                break;
            case "arknights-website":
                this.datasourceData = ARKNIHTS_WEBSITE_OPTION;
                break;
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