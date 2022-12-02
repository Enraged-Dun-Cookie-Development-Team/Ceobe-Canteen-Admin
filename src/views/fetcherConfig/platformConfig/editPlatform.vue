<template>
  <el-drawer
    :visible.sync="showDraw"
    :title="create?'创建平台':'编辑平台'"
    direction="rtl"
    size="40%"
    custom-class="drawer-max-height"
    @close="onClose"
  >
    <div class="edit-area pr-24 pl-24">
      <el-form
        :model="datasource"
        class=""
        label-position="right" label-width="120px"
      >
        <el-form-item label="注册类型ID:" prop="type_id">
          <el-input
            v-model="platformData.type_id" placeholder="请输入博类型ID"
            :disabled="!create"
          />
        </el-form-item>
        <el-form-item label="平台名字:" prop="platform">
          <el-input
            v-model="platformData.platform" placeholder="平台名字"
            :disabled="!create"
          />
        </el-form-item>
        <el-form-item label="最小蹲饼间隔:" prop="min_request_interval">
          <el-input-number
            v-model="platformData.min_request_interval" controls-position="right"
            :min="1" @change="handleChange"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            v-if="create"
            type="primary"
            size="small"
            @click="addData"
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
    name: "EditPlatform",
    props: {
    },
    data() {
        return {
            create: false,
            showDraw: false,
            platformData: {},
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.initPlatformData();
        },
        initPlatformData() {
            this.platformData = {
                id: null,
                type_id: "",
                platform: "",
                min_request_interval: 15
            };
        },
        open(create, data) {
            this.create = create;
            if(data) {
                this.platformData = data;
            }
            this.showDraw = true;
        },
        onClose() {

        },
        createData() {
            this.$store
                .dispatch("fetcherConfig/addPlatform",this.platformData)
                .then(() => {
                    this.$message({
                        showClose: true,
                        message: "新建成功",
                        type: "success",
                    });
                    this.showDraw = false;
                    this.init();
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "新建失败",
                        type: "error",
                    });
                });
        },
        updateData() {
            this.$store
                .dispatch("fetcherConfig/updatePlatform",this.platformData)
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
                });
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