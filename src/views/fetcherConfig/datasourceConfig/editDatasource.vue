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
        :model="datasource"
        class="demo-form-inline"
        label-position="right" label-width="120px"
      >
        <el-form-item label="平台:" prop="platform">
          <el-select
            v-model="datasource.platform" clearable
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in platformOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="uid:" prop="uid">
          <el-input v-model="datasource.uid" placeholder="请输入博主id" />
        </el-form-item>
        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="datasource.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="头像:">
          <upload-img
            :file-list="datasource.avatar?[{name: '', url: datasource.avatar}] : []" :url="url"
            @success="(data)=>onSuccess(data)" @remove="onRemove()"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="small"
          >
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import UploadImg from "@/components/UploadImg/index.vue";
export default {
    name: "EditDatasource",
    components: { UploadImg },
    props: {
        create: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
    },
    data() {
        return {
            showDraw: true,
            url: "api/v1/admin/fetcherConfig/uploadAvatar",
            datasource: {
                platform: "",
                uid: "",
                nickname: "",
                avatar: "",
            },
            platformOptions:[],
        };
    },
    methods: {
        onClose() {

        },
        onSuccess(data) {
            this.datasource.avatar = data?.data?.url;
        },
        onRemove() {
            this.datasource.avatar = '';
        },
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