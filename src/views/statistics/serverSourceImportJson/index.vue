<template>
  <div class="server-source-import-json">
    <el-steps :active="stepIndex" align-center>
      <el-step title="选择数据来源平台" />
      <el-step title="蹲饼器不同存活状态的组设置" />
      <el-step title="生成JSON" />
    </el-steps>
    <el-card style="margin-top: 40px">
      <el-carousel
        ref="carousel" :autoplay="false"
        :loop="false" :initial-index="0" indicator-position="none"
      >
        <el-carousel-item>
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
        </el-carousel-item>
        <el-carousel-item>
          <div v-if="serverLive == 0">
            让我看看有多少存活逻辑
          </div>
          <div v-else class="flex-center">
            <el-tabs style="width: 100%;height: 100%" type="border-card">
              <el-tab-pane
                v-for="servers in jsonData.servers" :key="servers.number"
                :label="'只存活了'+servers.number+'条的情况'"
              >
                <el-tag v-for="sourceTypeName in sourceTypeNameList" :key="sourceTypeName.name">
                  {{
                    sourceTypeName.name
                  }}
                </el-tag>
                <el-button icon="el-icon-add" @click="serversAddServer(servers.number)" />

                <el-card v-for="(server,serverIndex) in servers.server" :key="serverIndex">
                  <el-button icon="el-icon-add" @click="serverAddGroup(servers.number,serverIndex)" />
                  <el-card v-for="(groups,groupsIndex) in server.groups" :key="groupsIndex">
                    {{ groups }}
                  </el-card>
                </el-card>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          3
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
export default {
    name: "ServerSourceImportJson",
    data() {
        return {
            stepIndex: 1,
            serverLive: 0,
            sourceTypeList: [],
            sourceTypeNameList: [],
            jsonData: {
                type: '',
                servers: []
            }
        };
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
                this.serverLive = 4;
                for (let i = 1; i <= this.serverLive; i++) {
                    this.jsonData.servers.push({ number: i, server: [] });
                }

            }, 300);
        },
        // 每种存活条件下添加组
        serversAddServer(number) {
            let findData = this.jsonData.servers.find(x => x.number == number);
            findData.server.push({
                groups: [],
            });
            this.serverAddGroup(number, 0);
        },
        serverAddGroup(serverNumber, groupsNumber) {
            debugger;
            let findData = this.jsonData.servers.find(x => x.number == serverNumber);
            findData.server[groupsNumber].groups.push({
                name: 'B站-明日方舟',
                datasource: [{ type: 'bilibili', arg: { uid: '161775300' } }]
            });
        },
        checkSourceType(name) {
            this.nextPage();
            this.getSourceTypeNameList();
            this.jsonData.type = name;
        },
        nextPage() {
            this.stepIndex++;
            if (this.stepIndex > 3) {
                this.stepIndex = 3;
            }
            this.$refs.carousel.setActiveItem(this.stepIndex - 1);
        },
        prevPage() {
            this.stepIndex--;
            if (this.stepIndex < 1) {
                this.stepIndex = 1;
            }
            this.$refs.carousel.setActiveItem(this.stepIndex - 1);
        }
    }
};
</script>

<style lang="scss">
.server-source-import-json {

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
