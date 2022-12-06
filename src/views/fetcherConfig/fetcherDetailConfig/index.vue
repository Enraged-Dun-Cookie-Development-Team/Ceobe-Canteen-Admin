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
            <div class="mb-10">
              <el-tag
                v-for="sourceTypeName in sourceTypeNameList"
                :key="sourceTypeName.name"
                draggable="true"
                class="mv-10"
                @dragstart.native="setDragItem(sourceTypeName,sourceTypeNameList)"
              >
                {{
                  sourceTypeName.name
                }}
              </el-tag>
            </div>
            <!--这是组的卡片-->
            <el-card
              v-for="(group,groupIndex) in servers.server" :key="'group'+groupIndex"
              class="mh-10"
            >
              <div class="flex-start">
                <el-button
                  size="mini"
                  icon="el-icon-plus"
                  class="mb-10"
                  @click="groupAddDatasource(servers.number,groupIndex)"
                >
                  添加来源组(datasource)
                </el-button>
                <div class="flex-center flex-direction-column">
                  <el-card
                    v-for="(datasource,datasourceIndex) in group.groups"
                    :key="'datasource'+datasourceIndex"
                    class="mh-10 mv-10"
                    :data-serversIndex="servers.number"
                    :data-groupIndex="groupIndex"
                    :data-datasourceIndex="datasourceIndex"
                    @dragover.native="e=>e.preventDefault()"
                    @drop.native="addSourceInDatasource"
                  >
                    <!--这里是卡片的内容，如果你要在里面加字段，请先在groupAddDatasource方法内初始化的时候添加相应字段以免无法监听-->
                    <div>
                      <div class="mb-10">
                        <i class="el-icon-s-order mr-5"></i>{{ datasource.name }}
                      </div>
                      <div
                        class="mh-10 cursor-pointer"
                        @click="getIntervalByTimeRangeAndShowWindow(datasource,servers.number,groupIndex,datasourceIndex)"
                      >
                        非规定时间段的常规频率：<b style="color: #23ADE5">{{ datasource.time?datasource.time:0 }}</b>毫秒
                      </div>
                      <div
                        class="cursor-pointer"
                        @click="getIntervalByTimeRangeAndShowWindow(datasource,servers.number,groupIndex,datasourceIndex)"
                        v-html="datasource.intervalByTimeRange.length>0?getIntervalByTimeRangeString(datasource.intervalByTimeRange):'点击这里修改频率'"
                      >
                      </div>
                      <br />
                      <i v-if="datasource.datasource.length == 0" style="color: #848488">拖拽tag把来源添加到这里</i>
                      <div v-else>
                        <el-tag
                          v-for="sourceTypeName in datasource.datasource"
                          :key="sourceTypeName.name"
                          class="mv-10 cursor-pointer"
                          closable
                          :title="sourceTypeName.arg.ignoreEmpty?'当前是未启用的状态':''"
                          :type="sourceTypeName.arg.ignoreEmpty?'info':''"
                          @close="removeSource(sourceTypeName,servers.number,groupIndex,datasourceIndex)"
                          @click="changeIgnoreEmptyStatus(sourceTypeName,servers.number,groupIndex,datasourceIndex)"
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
    <el-dialog
      :visible.sync="timePickerWindowInfo.show"
      width="450px"
      :title="timePickerWindowInfo.title"
    >
      <el-input
        v-model="timePickerWindowInfo.time"
        class="mh-10"
        placeholder="时间段外的常规频率"
      />
      <div
        v-for="(item,index) in timePicker" :key="'timePicker'+index"
        class="flex-between mh-10"
      >
        <el-time-select
          v-model="timePicker[index].startTime"
          :picker-options="{
            step: '00:15',
            start:'00:00',
            end:'24:00'
          }"
          style="flex: 1"
          placeholder="开始时间"
        />
        <el-time-select
          v-model="timePicker[index].endTime"
          :picker-options="{
            step: '00:15',
            start:'00:00',
            end:'24:00'
          }"
          style="flex: 1"
          class="ml-5"
          placeholder="结束时间"
        />
        <el-input
          v-model="timePicker[index].interval"
          style="flex:1"
          class="ml-5"
          placeholder="蹲饼轮询毫秒"
        />
      </div>
      <div class="flex flex-between mv-10 mh-10">
        <el-button @click="addIntervalByTimeRangeLine">
          添加一行自定义时间段频率
        </el-button>
        <el-button @click="addIntervalByTimeRangeToGroups">
          确认
        </el-button>
      </div>
    </el-dialog>
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
            dragItem: {}, // 拖拽对象
            timePickerWindowInfo: {
                show: false,
                serversIndex: null,
                groupIndex: null,
                datasourceIndex: null,
                title: "",
                time: null,
            },// 打开的弹窗内保存的信息
            timePicker: [{}],// 时间列表
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
                        arg: { uid: '161775300', }
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
                this.serverAddGroups();
            }, 300);
        },
        // 每种server下添加groups
        serverAddGroups() {
            this.serverLiveList.forEach(item => {
                for (let i = 0; i < item.number; i++) {
                    item.server.push({
                        groups: [],
                    });
                }
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
                // 这里初始化卡片的对象
                findData.groups.push({
                    name: value,
                    datasource: [],
                    time: null,
                    intervalByTimeRange: []
                });
            }).catch(() => {

            });
        },
        // 获取平台信息 bilibili 微博 等
        checkSourceType(name) {
            this.nextPage();
            this.getSourceTypeNameList(name);
        },
        // 跳转到下一操作步骤
        nextPage() {
            this.stepIndex++;
            if (this.stepIndex > 3) {
                this.stepIndex = 3;
            }
        },
        // 跳转回上一操作步骤
        prevPage() {
            this.stepIndex--;
            if (this.stepIndex < 1) {
                this.stepIndex = 1;
            }
        },
        // 拖拽的条目的信息
        setDragItem(item) {
            this.dragItem = item;
        },
        // 总对象内添加蹲饼源
        addSourceInDatasource(event) {
            event.preventDefault();
            if (event.currentTarget.classList.contains('el-card')) {
                let serversIndex = event.currentTarget.dataset.serversindex;
                let groupIndex = event.currentTarget.dataset.groupindex;
                let datasourceIndex = event.currentTarget.dataset.datasourceindex;
                let serverLive = this.serverLiveList.find(x => x.number == serversIndex);
                let datasource = serverLive.server[groupIndex].groups[datasourceIndex];
                if (datasource.datasource.findIndex(x => x.name == this.dragItem.name) < 0) {
                    datasource.datasource.push(this.dragItem);
                }
            }
            this.dragItem = null;
        },
        // 点击标签的x删除总对象内的蹲饼源
        removeSource(sourceTypeName, serversIndex, groupIndex, datasourceIndex) {
            let datasource = this.serverLiveList.find(x => x.number == serversIndex).server[groupIndex].groups[datasourceIndex];
            let index = datasource.datasource.findIndex(x => x.name == sourceTypeName.name);
            datasource.datasource.splice(index, 1);
        },
        // 修改源状态（ignoreEmpty）的true和false
        changeIgnoreEmptyStatus(sourceTypeName, serversIndex, groupIndex, datasourceIndex) {
            let datasource = this.serverLiveList.find(x => x.number == serversIndex).server[groupIndex].groups[datasourceIndex];
            let source = datasource.datasource.find(x => x.name == sourceTypeName.name);
            if (source.arg && Object.prototype.hasOwnProperty.call(source.arg, "ignoreEmpty")) {
                this.$set(source.arg, 'ignoreEmpty', !source.arg.ignoreEmpty);
            } else {
                this.$set(source.arg, 'ignoreEmpty', true);
            }
        },
        // 时间添加一行
        addIntervalByTimeRangeLine() {
            this.timePicker.push({});
        },
        // 打开蹲饼时间段频率功能的窗口
        getIntervalByTimeRangeAndShowWindow(datasource, serversIndex, groupIndex, datasourceIndex) {
            this.timePickerWindowInfo = {
                show: true,
                serversIndex,
                groupIndex,
                datasourceIndex,
                title: '添加 ' + datasource.name + ' 的蹲饼频率',
                time:datasource.time
            };
            this.timePicker = datasource.intervalByTimeRange.map(x=>{
                return { startTime:x.timeRange[0],
                    endTime:x.timeRange[1],
                    interval:x.interval };
            });
        },
        // 把设置好得蹲饼时间段频率功能添加到总对象字符串内
        addIntervalByTimeRangeToGroups() {
            let datasource = this.serverLiveList.find(x => x.number == this.timePickerWindowInfo.serversIndex).server[this.timePickerWindowInfo.groupIndex].groups[this.timePickerWindowInfo.datasourceIndex];
            datasource.intervalByTimeRange = this.timePicker.map(x => {
                return {
                    timeRange: [x.startTime, x.endTime],
                    interval: x.interval
                };
            });
            datasource.time = this.timePickerWindowInfo.time;
            this.timePickerWindowInfo= {
                show: false,
                serversIndex: null,
                groupIndex: null,
                datasourceIndex: null,
                title: "",
                time: null,
            };
            this.timePicker=[{}];
        },
        // 把时间段内蹲饼频率的设置转化为HTML显示
        getIntervalByTimeRangeString(data) {
            let html = `<div class="interval-by-time-range-html"><span>共${data.length}条:</span>`;
            html += data.map((x, index) => {
                return `<span>第<b>${index + 1}</b>条:<b>${x.timeRange[0]}</b>到<b>${x.timeRange[0]}</b>,频率为<b>${x.interval}</b>毫秒;</span>`;
            });
            html += '</div>';
            return html;
        }
    }
};
</script>

<style lang="scss">
.server-source-import-json {

  .ml-5 {
    margin-left: 5px;
  }

  .mr-5 {
    margin-right: 5px;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .mv-10 {
    margin: 0 10px 0 10px;
  }

  .mh-10 {
    margin: 10px 0 10px 0;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flex-direction-column {
    flex-direction: column;
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

  .interval-by-time-range-html {

    b {
      color: #23ADE5;
    }
  }
}
</style>
