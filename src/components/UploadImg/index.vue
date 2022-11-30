<template>
  <div>
    <el-upload
      :action="url"
      :headers="{
        'token': store.getters.token
      }"
      list-type="picture-card"
      drag="true"
      auto-upload="true"
      :limit="1"
      multiple="false"
      :file-list="fileList"
      class="upload"
      :on-error="onError"
      :on-success="onSuccess"
      :on-preview="onPreview"
      :on-remove="onRemove"
      accept="image/png, image/jpeg, image/x-icon"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <el-image style="width: 100%" :src="dialogImageUrl" />
    </el-dialog>
  </div>
</template>

<script>

export default {
    name: 'UploadImg',
    props: {
        fileList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        url: {
            type: String,
            default: () => {
                return ``;
            }
        }
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
        };
    },
    methods: {
        onError(err) {
            console.log(err);
        },
        onSuccess(data) {
            if (data.code === 0) {
                this.$message({
                    message: data.msg,
                    type: 'success'
                });
                this.$emit('success', data);
            } else {
                this.$message({
                    message: data.msg,
                    type: 'error'
                });
            }
        },
        onRemove(data) {
            this.$emit('remove', data);
        },
        onPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
    }
};
</script>

<style lang="scss" scoped>
::v-deep(.el-upload--picture-card) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px!important;
  height: 100px!important;
}

::v-deep(.el-upload-list__item) {
  width: 100px;
  height: 100px;
}

::v-deep(.is-uploading) {

  .el-progress {
    width: 100px;

    .el-progress-circle {
      width: 100px!important;
      height: 100px!important;
    }
  }
}

.upload {
  display: flex;
  flex-wrap: wrap;
}
</style>
