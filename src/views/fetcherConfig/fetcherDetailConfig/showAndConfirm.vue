<template>
  <div class="page3">
    <json-viewer
      :value="fetcherConfigShow"
      :expand-depth="10"
      copyable
      :show-array-index="false"
    />
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer';
export default {
    name: 'ShowAndConfirm',
    components: { JsonViewer },
    props: {
        fetcherConfigList: {
            type: Array,
            required: true,
        },
        datasourceMap: {
            type:Object,
            required: true,
        }
    },
    data() {
        return {
            fetcherConfigShow:[]
        };
    },
    methods: {
        open() {
            this.fetcherConfigShow = JSON.parse(JSON.stringify(this.fetcherConfigList));
            this.fetcherConfigShow.forEach((situation, situationIndex) => {
                situation.server?.forEach((server, serverIndex) => {
                    // 替换config下面的datasources id为详细内容
                    server.groups?.forEach((groupItem, groupIndex) => {
                        groupItem.datasource?.forEach((datasourceItem, datasourceIndex) => {
                            groupItem.datasource?.splice(datasourceIndex, 1, this.datasourceMap[datasourceItem].config);
                        });
                        server.groups[groupIndex] = groupItem;
                    });
                    situation.server[serverIndex]= server;
                });
                this.fetcherConfigShow[situationIndex] = situation;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.page3 {
  //TODO
}
</style>