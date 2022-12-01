<template>
  <el-drawer
    :visible.sync="showDraw"
    title="编辑数据源"
    direction="rtl"
    size="40%"
    custom-class="drawer-max-height"
    @close="onClose"
  >
    <div class="edit-area pr-24 pl-24">
      el-form
    </div>
  </el-drawer>
</template>

<script>
export default {
    name: "EditDatasource",
    data() {
        return {
            showDraw: true,
        };
    },
    methods: {
        onClose() {

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