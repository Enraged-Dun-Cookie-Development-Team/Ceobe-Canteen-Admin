<template>
  <div>
    <el-upload
      :class="{ disabled: uploadDisabled() }"
      :action="url"
      :headers="{
        'token': $store.getters.token
      }"
      list-type="picture-card"
      :drag="true"
      :auto-upload="true"
      :limit="1"
      :multiple="false"
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
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :append-to-body="true"
    >
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
                return `/`;
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
            if (data.code === "000000") {
                this.$message({
                    message: data.message,
                    type: 'success'
                });
                this.$emit('success', data);
            } else {
                this.$message({
                    message: data.message,
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
        // 隐藏图片上传按钮
        uploadDisabled() {
            return this.fileList.length > 0;   //判断图片上传的数量动态控制按钮隐藏与显示
        },
    }
};
</script>

<style lang="scss" scoped>
::v-deep(.el-upload-dragger) {
  width: 100%;
  height: 100%;
}

.disabled ::v-deep(.el-upload--picture-card) {
  display: none;
}
</style>
