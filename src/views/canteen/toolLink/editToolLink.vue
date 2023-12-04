<template>
  <el-drawer
    :visible.sync="showDraw"
    :title="create?'创建工具链接':'编辑工具链接'"
    direction="rtl"
    size="40%"
    custom-class="drawer-max-height"
    @close="onClose"
  >
    <div class="edit-area pr-24 pl-24">
      <el-form
        ref="toolLinkForm"
        :model="toolLinkData"
        label-position="right" label-width="120px"
        :rules="toolLinkRules"
      >
        <el-form-item label="名字:" prop="nickname">
          <el-input v-model="toolLinkData.nickname" placeholder="请输入名字" />
        </el-form-item>
        <el-form-item label="头像:" prop="avatar">
          <upload-img
            :file-list="fileList" :url="url"
            @success="(data)=>onSuccess(data)" @remove="onRemove()"
          />
        </el-form-item>
        <el-form-item label="链接:" prop="jump_url">
          <el-input
            v-model="toolLinkData.jump_url" placeholder="请输入跳转链接"
            @blur="changeEmptyToNull"
          />
        </el-form-item>
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
import UploadImg from "@/components/UploadImg/index.vue";

export default {
    name: "EditToolLink",
    components: { UploadImg },
    props: {
    },
    data() {
        return {
            create: false,
            showDraw: false,
            url: "api/v1/admin/toolLink/uploadAvatar",
            toolLinkData: {},
            toolLinkRules: {
                nickname: {
                    required: true, message: "请输入名字", trigger: "blur"
                },
                avatar: {
                    required: true, message: "请上传图片", trigger: "change"
                },
                jump_url: {
                    required: false, message: "请输入链接", trigger: "blur"
                },
            }
        };
    },
    computed:{
        fileList(){
            return this.toolLinkData.avatar?[{ name: '', url: this.toolLinkData.avatar }] : [];
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initToolLinkData();
        },
        // 清除表单验证
        clearValidate() {
            this.$nextTick(() => {
                this.$refs["toolLinkForm"].clearValidate();
            });
        },
        initToolLinkData() {
            this.toolLinkData = {
                nickname: "",
                avatar: "",
                jump_url: null,
                config: {}
            };
        },
        // 打开抽屉
        open(create, data) {
            this.create = create;
            if(data) {
                this.toolLinkData = JSON.parse(JSON.stringify(data));
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
            this.toolLinkData.avatar = data?.data?.url;
        },
        // 删除图片
        onRemove() {
            this.toolLinkData.avatar = '';
        },
        createData() {
            this.$store
                .dispatch("toolLink/createToolLink",this.toolLinkData)
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
                .dispatch("toolLink/updateToolLink",this.toolLinkData)
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
            if (this.toolLinkData.jump_url.trim() == '') {
                this.toolLinkData.jump_url = null;
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