<template>
  <div class="page3">
    <json-viewer
      :value="serverLiveList"
      :expand-depth="10"
      copyable
      :show-array-index="false"
    />
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer';
export default {
    name: 'ValidAndConfirm',
    components: { JsonViewer },
    props: {
        serverLiveList: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.page3 {
  //TODO
}
</style>