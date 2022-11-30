<template>
  <div class="server-source-import-json">
    <el-steps :active="stepIndex" align-center>
      <el-step title="选择数据来源平台" />
      <el-step title="蹲饼器不同存活状态的组设置" />
    </el-steps>
    <el-card v-show="stepIndex == 1">
      <div class="flex-center">
        <div v-if="sourceTypeList.length == 0">
          Loading
        </div>
        <el-button-group v-else>
          <el-button
            v-for="item in sourceTypeList"
            :key="item"
            type="primary"
            @click="checkSourceType(item)"
          >
            {{ item }}
          </el-button>
        </el-button-group>
      </div>
    </el-card>
    <el-card v-show="stepIndex == 2">
      <div v-if="serverLiveList.length == 0">
        让我看看有多少存活逻辑
      </div>
      <div v-else class="flex-center">
        <el-tabs style="width: 100%;height: 100%" type="border-card">
          <el-tab-pane
            v-for="(servers) in serverLiveList" :key="servers.number+''"
            :label="'只存活了'+(servers.number)+'条的情况'"
          >
            <div class="flex-between mb-10">
              <div>
                <el-tag
                  v-for="sourceTypeName in sourceTypeNameList"
                  :key="sourceTypeName.name"
                  draggable="true"
                  class="mv-5"
                  @dragstart.native="setDragItem(sourceTypeName)"
                >
                  {{
                    sourceTypeName.name
                  }}
                </el-tag>
              </div>
              <el-button
                size="mini" icon="el-icon-plus"
                @click="serverAddGroups(servers.number)"
              >
                添加组(groups)
              </el-button>
            </div>
            <el-card v-for="(group,groupIndex) in servers.server" :key="'group'+groupIndex">
              <div class="flex-start">
                <el-button
                  size="mini"
                  icon="el-icon-plus"
                  class="mb-10"
                  @click="groupAddDatasource(servers.number,groupIndex)"
                >
                  添加来源组(datasource)
                </el-button>
                <div class="flex-center">
                  <el-card
                    v-for="(datasource,datasourceIndex) in group.groups"
                    :key="'datasource'+datasourceIndex"
                    class="mv-5"
                    style="width: 150px"
                    :data-serversIndex="servers.number"
                    :data-groupIndex="groupIndex"
                    :data-datasourceIndex="datasourceIndex"
                    @dragstart.native="removeSourceInDatasource(servers.number,groupIndex,datasourceIndex)"
                    @dragover.native="e=>e.preventDefault()"
                    @drop.native="addSourceInDatasource"
                  >
                    <div>
                      <i class="mb-10">{{ datasource.name }}</i>
                      <br />
                      <i v-if="datasource.datasource.length == 0" style="color: #848488">拖拽tag把来源添加到这里</i>
                      <div v-else>
                        <el-tag
                          v-for="sourceTypeName in datasource.datasource"
                          :key="sourceTypeName.name"
                          draggable="true"
                          class="mv-5"
                          @dragstart.native="setDragItem(sourceTypeName)"
                        >
                          {{ sourceTypeName.name }}
                        </el-tag>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-input
      v-model="textarea"
      type="textarea"
      class="mt-20"
      rows="20"
      autosize
      placeholder="请输入内容"
    />
  </div>
</template>

<script>
export default {
    name: "FetcherDetailConfig",
    data() {
        return {
            stepIndex: 1, // 当前步骤
            serverLiveList: [], // 生成数数组
            sourceTypeList: [], // 类别
            sourceTypeNameList: [], // 类别下的账号
            dragItem: {}
        };
    },
    computed: {
        textarea() {
            return JSON.stringify(this.serverLiveList);
        }
    },
    mounted() {
        this.getSourceType();
    },
    methods: {
    // 获取类别
        getSourceType() {
            setTimeout(_ => {
                this.sourceTypeList = ['bilibili', '微博', '网易云音乐'];
            }, 300);
        },
        // 获取类别下账号 获取存活数量的数字
        getSourceTypeNameList() {
            setTimeout(_ => {
                this.sourceTypeNameList = [
                    {
                        name: '官方账号',
                        type: 'bilibili',
                        arg: { uid: '161775300' }
                    },
                    {
                        name: '明日方舟终末地',
                        type: 'bilibili',
                        arg: { uid: '1265652806' }
                    },
                    {
                        name: '来自星尘',
                        type: 'bilibili',
                        arg: { uid: '1883857209' }
                    },
                    {
                        name: '重力井动画',
                        type: 'bilibili',
                        arg: { uid: '1554642444' }
                    },
                    {
                        name: 'CubesCollective',
                        type: 'bilibili',
                        arg: { uid: '2123591088' }
                    },
                ];
                this.serverLiveList = [{ number: 1, server: [] }, { number: 2, server: [] }, {
                    number: 3,
                    server: []
                }, { number: 4, server: [] }];

            }, 300);
        },
        // 每种server下添加groups
        serverAddGroups(number) {
            let findData = this.serverLiveList.find(x => x.number == number);
            findData.server.push({
                groups: [],
            });
        },
        // 每种groups下添加datasource
        groupAddDatasource(serverLiveListNumber, groupIndex) {
            let serverLive = this.serverLiveList.find(x => x.number == serverLiveListNumber);
            let findData = serverLive.server[groupIndex];
            this.$prompt('请输入组名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '你要打字啊'
            }).then(({ value }) => {
                findData.groups.push({
                    name: value,
                    datasource: [],
                });
            }).catch(() => {

            });
        },
        checkSourceType(name) {
            this.nextPage();
            this.getSourceTypeNameList(name);
        },

        nextPage() {
            this.stepIndex++;
            if (this.stepIndex > 3) {
                this.stepIndex = 3;
            }
        },
        prevPage() {
            this.stepIndex--;
            if (this.stepIndex < 1) {
                this.stepIndex = 1;
            }
        },

        setDragItem(item) {
            this.dragItem = item;
        },
        addSourceInDatasource(event) {
            event.preventDefault();
            if (event.currentTarget.classList.contains('el-card')) {
                let serversIndex = event.currentTarget.dataset.serversindex;
                let groupIndex = event.currentTarget.dataset.groupindex;
                let datasourceIndex = event.currentTarget.dataset.datasourceindex;
                let serverLive = this.serverLiveList.find(x => x.number == serversIndex);
                let datasource = serverLive.server[groupIndex].groups[datasourceIndex];
                datasource.datasource.push(this.dragItem);
            }
            this.dragItem = null;
        },
        removeSourceInDatasource(event) {
            console.log('remove', event);
        }
    }
};
</script>

<style lang="scss">
.server-source-import-json {

  .mb-10 {
    margin-bottom: 10px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .mv-5 {
    margin-right: 5px;
    margin-left: 5px;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex-start {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
