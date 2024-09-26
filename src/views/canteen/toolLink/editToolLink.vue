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
      >
        <el-form-item
          label="名字:" prop="localized_name.zh_CN"
          :rules="toolLinkRules.name"
        >
          <el-input v-model="toolLinkData.localized_name.zh_CN" placeholder="请输入名字" />
        </el-form-item>
        <el-form-item
          label="Name:" prop="localized_name.en_US"
          :rules="toolLinkRules.name"
        >
          <el-input v-model="toolLinkData.localized_name.en_US" placeholder="Please enter your name" />
        </el-form-item>
        <el-form-item
          label="图标:" prop="icon_url"
          :rules="toolLinkRules.upload"
        >
          <upload-img
            :file-list="fileList" :url="url"
            @success="(data)=>onSuccess(data)" @remove="onRemove()"
          />
        </el-form-item>
        <el-form-item
          label="描述:" prop="localized_description.zh_CN"
          :rules="toolLinkRules.description"
        >
          <el-input v-model="toolLinkData.localized_description.zh_CN" placeholder="请输入工具描述" />
        </el-form-item>
        <el-form-item
          label="Description:" prop="localized_description.en_US"
          :rules="toolLinkRules.description"
        >
          <el-input v-model="toolLinkData.localized_description.en_US" placeholder="Please enter a tool description" />
        </el-form-item>
        <el-form-item
          label="口号:" prop="localized_slogan.zh_CN"
          :rules="toolLinkRules.slogan"
        >
          <el-input v-model="toolLinkData.localized_slogan.zh_CN" placeholder="请输入工具Slogan" />
        </el-form-item>
        <el-form-item
          label="Slogan:" prop="localized_slogan.en_US"
          :rules="toolLinkRules.slogan"
        >
          <el-input v-model="toolLinkData.localized_slogan.en_US" placeholder="Please enter the tool Slogan" />
        </el-form-item>
        <el-form-item
          label="标签:" prop="localized_tags.zh_CN"
          :rules="toolLinkRules.tags"
        >
          <el-select
            v-model="toolLinkData.localized_tags.zh_CN"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择工具标签"
          >
            <el-option
              v-for="item in defaultTags"
              :key="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Tags:" prop="localized_tags.en_US"
          :rules="toolLinkRules.tags"
        >
          <el-select
            v-model="toolLinkData.localized_tags.en_US"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Please select the tool tags"
          >
            <el-option
              v-for="item in defaultTags"
              :key="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="链接">
          <i class="el-icon-circle-plus-outline add-icon" @click="addLink"></i>
        </el-form-item>

        <el-collapse style="margin-bottom: 24px;">
          <el-collapse-item v-for="(link, index) in toolLinkData.links" :key="index">
            <template slot="title">
              <div class="collapse-header">
                <div>{{ link.localized_name.zh_CN }}</div>
                <div>
                  <el-button
                    icon="el-icon-delete" class="btn-editor btn-delete" round
                    @click.stop="removeLink(index)"
                  />
                </div>
              </div>
            </template>
            <el-form-item label="primary:">
              <el-switch v-model="link.primary" />
            </el-form-item>
            <el-form-item label="regionality:">
              <el-select v-model="link.regionality" placeholder="请选择">
                <el-option
                  v-for="item in linkRegionality"
                  :key="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="链接名:">
              <el-input v-model="link.localized_name.zh_CN" placeholder="请输入链接名" />
            </el-form-item>
            <el-form-item label="Name:">
              <el-input v-model="link.localized_name.en_US" placeholder="Please enter the url name" />
            </el-form-item>
            <el-form-item label="url:">
              <el-input v-model="link.url" placeholder="请输入链接" />
            </el-form-item>
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
import UploadImg from "@/components/UploadImg/index.vue";
import { REGION } from "@/const/toolLinkConfig";

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
            toolLinkData: this.initToolLinkData(),
            toolLinkRules: {
                name: {
                    required: true, message: "请输入名字", trigger: "blur"
                },
                upload: {
                    required: true, message: "请上传图片", trigger: "change"
                },
                description: {
                    required: true, message: "请输入描述", trigger: "blur"
                },
                slogan: {
                    required: true, message: "请输入Slogan", trigger: "blur"
                },
                tags: {
                    required: true, message: "标签不能为空", trigger: ["blur", "change"]
                },
                url: {
                    required: true, message: "请输入链接", trigger: "blur"
                },
                select: {
                    required: true, message: "此选项不能为空", trigger: "blur"
                },
            },
            defaultTags: [],
            linkRegionality: REGION,
        };
    },
    computed:{
        fileList(){
            return this.toolLinkData.icon_url?[{ name: '', url: this.toolLinkData.icon_url }] : [];
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // this.initToolLinkData();
        },
        // 清除表单验证
        clearValidate() {
            this.$nextTick(() => {
                this.$refs["toolLinkForm"].clearValidate();
            });
        },
        initToolLinkData() {
            return {
                localized_name: {
                    zh_CN: "",
                    en_US: ""
                },
                icon_url: null,
                localized_description: {
                    zh_CN: "",
                    en_US: ""
                },
                localized_slogan: {
                    zh_CN: "",
                    en_US: ""
                },
                localized_tags: {
                    zh_CN: [],
                    en_US: []
                },
                links: []
            };
        },
        initLinks() {
            return {
                primary: false,
                regionality: REGION[0],
                localized_name: {
                    zh_CN: "小刻食堂",
                    en_US: "ceobe canteen"
                },
                url: 'https://www.ceobecanteen.top/'
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
            this.toolLinkData.icon_url = data?.data?.url;
        },
        // 删除图片
        onRemove() {
            this.toolLinkData.avatar = '';
        },
        createData() {
            let allPass = true;
            console.log(this.$refs["toolLinkForm"]);
            this.$refs["toolLinkForm"].validate((valid) => {
                if (!valid) {
                    allPass = false;
                    return;
                }
            });
            if (allPass) {

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

            }

        },
        updateData() {
            let allPass = true;
            this.$refs["toolLinkForm"].validate((valid) => {
                if (!valid) {
                    allPass = false;
                    return;
                }
            });
            if (allPass)
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
        },
        addLink() {
            console.log(this.toolLinkData);
            this.toolLinkData.links.push(this.initLinks());
        },
        removeLink(index) {
            this.toolLinkData.links.splice(index, 1);
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