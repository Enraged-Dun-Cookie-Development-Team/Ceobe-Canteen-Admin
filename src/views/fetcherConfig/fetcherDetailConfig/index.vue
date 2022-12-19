<template>
  <div class="server-source-import-json">
    <el-steps :active="stepIndex" align-center>
      <el-step title="选择数据来源平台" />
      <el-step title="蹲饼器不同存活状态的组设置" />
      <el-step title="验证与确认" />
    </el-steps>
    <el-card v-show="stepIndex == 1">
      <div v-loading="platformLoading" class="flex-center">
        <div v-if="platformList.length == 0">
          请先到配置平台页面添加平台
        </div>
        <el-button-group v-else>
          <el-button
            v-for="item in platformList"
            :key="item.typeId"
            type="primary"
            @click="checkPlatformType(item)"
          >
            {{ item.platfromName }}
          </el-button>
        </el-button-group>
      </div>
    </el-card>
    <el-card v-show="stepIndex == 2">
      <div v-if="pageTwoNotice != ''">
        {{ pageTwoNotice }}
      </div>
      <div
        v-else v-loading="configLoading"
        class="flex-center"
      >
        <el-tabs
          style="width: 100%;height: 100%"
          type="border-card"
        >
          <el-tab-pane
            v-for="(servers) in fetcherConfigList" :key="servers.number+''"
            :label="`只存活了${servers.number}条的情况${completeServer[servers.number-1]?'✅':'❌'}`"
          >
            <div style="width:calc(100% - 100px); min-height:42px;">
              <el-tag
                v-for="sourceTypeName in datasourceList[servers.number-1]"
                :key="sourceTypeName.nickname"
                draggable="true"
                class="mb-10 mv-10"
                @dragstart.native="setDragItem(sourceTypeName,datasourceList[servers.number-1])"
              >
                {{
                  sourceTypeName.nickname
                }}
              </el-tag>
            </div>
            <div>
              <el-button
                v-if="stepIndex !== 1"
                type="primary"
                class="btn-valid"
                @click="validConfig(servers.number)"
              >
                验证
              </el-button>
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
                    class="mh-10 mv-10 position-relative"
                    :data-serversIndex="servers.number"
                    :data-groupIndex="groupIndex"
                    :data-datasourceIndex="datasourceIndex"
                    @dragover.native="e=>e.preventDefault()"
                    @drop.native="addSourceInDatasource"
                  >
                    <!--这里是卡片的内容，如果你要在里面加字段，请先在groupAddDatasource方法内初始化的时候添加相应字段以免无法监听-->
                    <div>
                      <el-button
                        type="text" class="position-absolute position-top-0 position-right-18"
                        @click="removeDatasources(servers.number, groupIndex, datasourceIndex)"
                      >
                        x
                      </el-button>
                      <div class="mb-10">
                        <i class="el-icon-s-order mr-5"></i>{{ datasource.name }}
                      </div>
                      <div
                        class="mh-10 cursor-pointer"
                        @click="getIntervalByTimeRangeAndShowWindow(datasource,servers.number,groupIndex,datasourceIndex)"
                      >
                        非规定时间段的常规频率：<b style="color: #23ADE5">{{ datasource.interval?datasource.interval:0 }}</b>毫秒
                      </div>
                      <div
                        class="cursor-pointer"
                        @click="getIntervalByTimeRangeAndShowWindow(datasource,servers.number,groupIndex,datasourceIndex)"
                        v-html="datasource.interval_by_time_range?.length>0?getIntervalByTimeRangeString(datasource.interval_by_time_range):'点击这里修改频率'"
                      >
                      </div>
                      <br />
                      <i v-if="datasource.datasource.length == 0" style="color: #848488">拖拽tag把来源添加到这里</i>
                      <div v-else>
                        <el-tag
                          v-for="sourceTypeId in datasource.datasource"
                          :key="sourceTypeId"
                          class="mb-10 mv-10 cursor-pointer"
                          closable
                          @close="removeSource(sourceTypeId,servers.number,groupIndex,datasourceIndex)"
                        >
                          {{ datasourceMap[sourceTypeId].nickname }}
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
    <el-card v-show="stepIndex == 3">
      <show-and-confirm
        ref="showAndConfirm" :fetcher-config-list="fetcherConfigList"
        :datasource-map="datasourceMap"
      />
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
      <div>
        <span>单组蹲饼时间: </span>
        <el-input-number
          v-model="timePickerWindowInfo.time" controls-position="right"
          :min="0" :step="1000" class="ml-5"
          step-strictly
        />
      </div>
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
        <el-input-number
          v-model="timePicker[index].interval" controls-position="right"
          :min="-1000" :step="1000"
          step-strictly class="ml-5"
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
    <el-button
      v-if="stepIndex === 3"
      type="primary"
      class="btn-prev"
      @click="prevPage"
    >
      上一页
    </el-button>
    <el-button
      v-if="stepIndex !== 1"
      type="danger"
      class="btn-reset"
      @click="initData"
    >
      重置
    </el-button>
    <el-button
      v-if="stepIndex === 2"
      type="primary"
      class="btn-next"
      @click="completeConfig"
    >
      准备提交
    </el-button>
    <form-button v-if="stepIndex === 3" @submit="submitConfig" />
  </div>
</template>

<script>
import ShowAndConfirm from "./showAndConfirm.vue";
import FormButton from "@/components/FormButton";
import { FetchController, registerDefaultDataSourceTypes } from '@enraged-dun-cookie-development-team/cookie-fetcher';
export default {
    name: "FetcherDetailConfig",
    components: { ShowAndConfirm, FormButton },
    data() {
        return {
            pageTwoNotice: '',
            fetcherLiveNumber: 0,
            platform: '',
            stepIndex: 1, // 当前步骤
            fetcherConfigList: [], // 蹲饼器配置数组
            configLoading: false,
            platformList: [], // 平台类别
            platformLoading: false, // 平台加载
            datasourceList: [], // 类别下的账号
            datasourceMap: {},
            completeServer: [], //完成情况
            dragItem: {}, // 拖拽对象
            globalConfig: {}, // 全局配置
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
            return JSON.stringify(this.fetcherConfigList);
        }
    },
    mounted() {
        registerDefaultDataSourceTypes();
        this.getGlobalConfig();
        this.getPlatformList();
    },
    methods: {
        // 获取全局配置
        getGlobalConfig(){
            this.$store
                .dispatch("fetcherConfig/getGlobalConfig")
                .then((response) => {
                    this.globalConfig = response.data;
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "获取全局配置失败",
                        type: "error",
                    });
                });
        },
        // 获取平台
        getPlatformList() {
            this.platformLoading = true;
            this.$store
                .dispatch("fetcherConfig/allPlatformList")
                .then((response) => {
                    this.platformList = response.data.map(x => { return { typeId: x.type_id, platfromName: x.platform_name, minRequestInterval: x.min_request_interval };});
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "获取平台配置列表失败",
                        type: "error",
                    });
                }).finally(() =>{
                    this.platformLoading = false;
                });
        },
        // 初始化数据
        initData() {
            this.pageTwoNotice = "";
            this.fetcherLiveNumber = 0;
            this.platform= '';
            this.stepIndex= 1; // 当前步骤
            this.fetcherConfigList= []; // 蹲饼器配置数组
            this.configLoading= false;
            this.platformLoading= false, // 平台加载
            this.datasourceList= []; // 类别下的账号
            this.datasourceMap= {};
            this.completeServer= [], //完成情况
            this.dragItem= {}; // 拖拽对象
            this.timePickerWindowInfo= {
                show: false,
                serversIndex: null,
                groupIndex: null,
                datasourceIndex: null,
                title: "",
                time: null,
            };// 打开的弹窗内保存的信息
            this.timePicker= [{}];// 时间列表
        },
        // 获取类别下账号 获取存活数量的数字
        async InitPageTwo() {
            let datasources = await this.getDatasourceList();
            if (datasources.length == 0) {
                this.pageTwoNotice = "还为配置数据源，先去配置数据源吧";
                return;
            }
            await this.getFetcherConfigList();
            if (!await this.getFetcherLiveNumber()) {
                this.pageTwoNotice = "未能获取到蹲饼器存活个数，无法继续";
                return;
            }
            if (this.fetcherLiveNumber==0) {
                this.pageTwoNotice = "还没有蹲饼器噢，不用配置，去休息一下吧";
                return;
            }
            // 获取的的数据源配置的都为已完成
            for (let i = 0; i < this.fetcherConfigList.length; i++) {
                this.completeServer.push(true);
            }
            // 如果当前配置蹲饼器小于最大存活数量，则补充
            while (this.fetcherLiveNumber > this.fetcherConfigList.length) {
                this.fetcherConfigList.push({ number: this.fetcherConfigList.length+1, server: [] });
                this.completeServer.push(false);
            }
            this.serverAddGroups();

            // 配置每种情况下未配置的数据源
            this.fetcherConfigList.forEach(data => {
                let datasourceConfigured = {};
                data.server?.forEach(server=> {
                    server.groups?.forEach(group => {
                        group.datasource?.forEach(datasourceId => {
                            datasourceConfigured[datasourceId] = true;
                        });
                    });
                });

                // let datasourceTemp = JSON.parse(JSON.stringify(datasources))
                let datasourceTemp = datasources.filter(x => {
                    if (!(x.id in datasourceConfigured)) {
                        return true;
                    }
                    return false;
                });
                this.datasourceList.push(datasourceTemp || []);
            });
        },
        // 获取数据源信息
        async getDatasourceList() {
            let datasources = [];
            try {
                let response = await this.$store.dispatch("fetcherConfig/getAllDatasourceList", { "type_id":this.platform });
                datasources = response.data;
                datasources.forEach(x => {
                    this.datasourceMap[x.id+'']={
                        nickname: x.nickname,
                        config: x.config,
                    };
                });
            } catch {
                this.$message({
                    showClose: true,
                    message: "获取数据源失败",
                    type: "error",
                });
            }
            return datasources;
        },
        // 获取最高存活个数
        async getFetcherLiveNumber() {
            let success = true;
            try {
                let response = await this.$store.dispatch("fetcherConfig/getFetcherLiveNumber");
                this.fetcherLiveNumber = response.data.fetcher_live_number;
            } catch {
                success = false;
                this.$message({
                    showClose: true,
                    message: "获取最高存活数失败",
                    type: "error",
                });
            }
            return success;
        },
        // 获取已配置列表
        async getFetcherConfigList() {
            try {
                let response = await this.$store.dispatch("fetcherConfig/getFetcherConfigList", { "type_id":this.platform });
                this.fetcherConfigList = response.data;
            } catch{
                this.$message({
                    showClose: true,
                    message: "获取蹲饼器列表失败",
                    type: "error",
                });
            }
        },
        // 每种server下添加groups
        serverAddGroups() {
            this.fetcherConfigList.forEach((item,index) => {
                if (!this.completeServer[index]) {
                    for (let i = 0; i < item.number; i++) {
                        item.server.push({
                            groups: [],
                        });
                    }
                }
            });
        },
        // 每种groups下添加datasource
        groupAddDatasource(serverLiveListNumber, groupIndex) {
            let serverLive = this.fetcherConfigList.find(x => x.number == serverLiveListNumber);
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
                    type: this.platform,
                    datasource: [],
                });
                this.completeServer[serverLiveListNumber-1] = false;
            }).catch(() => {

            });
        },
        // 删除一个来源组(datasource)
        removeDatasources(serversNumber, groupIndex, datasourceIndex) {
            if (this.fetcherConfigList[serversNumber-1]?.server[groupIndex]?.groups[datasourceIndex]) {
                this.fetcherConfigList[serversNumber-1]?.server[groupIndex]?.groups[datasourceIndex];
                this.fetcherConfigList[serversNumber-1]?.server[groupIndex]?.groups[datasourceIndex]?.datasource.find(sourceTypeId => {
                    this.datasourceList[serversNumber-1].push({
                        nickname: this.datasourceMap[sourceTypeId].nickname,
                        id: sourceTypeId
                    });
                });
                this.fetcherConfigList[serversNumber-1]?.server[groupIndex]?.groups.splice(datasourceIndex,1);
                this.completeServer[serversNumber-1] = false;
            }
        },
        // 获取平台信息 bilibili 微博 等
        async checkPlatformType(platform) {
            this.platform=platform.typeId;
            this.nextPage();
            await this.InitPageTwo(platform.typeId);
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
        // 从对象内添加蹲饼源
        addSourceInDatasource(event) {
            event.preventDefault();
            if (event.currentTarget.classList.contains('el-card')) {
                let serversIndex = event.currentTarget.dataset.serversindex;
                let groupIndex = event.currentTarget.dataset.groupindex;
                let datasourceIndex = event.currentTarget.dataset.datasourceindex;
                let serverLive = this.fetcherConfigList.find(x => x.number == serversIndex);
                let datasource = serverLive.server[groupIndex].groups[datasourceIndex];
                if (datasource.datasource.findIndex(x => x == this.dragItem.id) < 0) {
                    datasource.datasource.push(this.dragItem.id);
                    let index = this.datasourceList[serversIndex-1].findIndex(x => x.id == this.dragItem.id);
                    this.datasourceList[serversIndex-1].splice(index, 1);
                }
                this.completeServer[serversIndex-1] = false;
            }
            this.dragItem = null;
        },
        // 点击标签的x删除总对象内的蹲饼源
        removeSource(sourceTypeId, serversIndex, groupIndex, datasourceIndex) {
            let datasource = this.fetcherConfigList.find(x => x.number == serversIndex).server[groupIndex].groups[datasourceIndex];
            let index = datasource.datasource.findIndex(x => x == sourceTypeId);
            datasource.datasource.splice(index, 1);
            this.datasourceList[serversIndex-1].push({
                nickname: this.datasourceMap[sourceTypeId].nickname,
                id: sourceTypeId
            });
            this.completeServer[serversIndex-1] = false;
        },
        // 时间添加一行
        addIntervalByTimeRangeLine() {
            this.timePicker.push({ startTime: "04:00", endTime: "04:00", interval:-1000 });
        },
        // 打开蹲饼时间段频率功能的窗口
        getIntervalByTimeRangeAndShowWindow(datasource, serversIndex, groupIndex, datasourceIndex) {
            this.timePickerWindowInfo = {
                show: true,
                serversIndex,
                groupIndex,
                datasourceIndex,
                title: '添加 ' + datasource.name + ' 的蹲饼频率',
                time:datasource.interval?datasource.interval:0
            };
            this.timePicker = datasource.interval_by_time_range?datasource.interval_by_time_range.map(x=>{
                return { startTime:x.time_range[0]?x.time_range[0]:null,
                    endTime:x.time_range[1]?x.time_range[1]:null,
                    interval:x.interval };
            }):[];
        },
        // 把设置好得蹲饼时间段频率功能添加到总对象字符串内
        addIntervalByTimeRangeToGroups() {
            let datasource = this.fetcherConfigList.find(x => x.number == this.timePickerWindowInfo.serversIndex).server[this.timePickerWindowInfo.groupIndex].groups[this.timePickerWindowInfo.datasourceIndex];
            let timeRangeInterval = [];
            this.$delete(datasource, "interval_by_time_range");
            for (let i = 0; i < this.timePicker.length; i++) {
                if (this.timePicker[i]?.interval != -1000 && this.timePicker[i]?.startTime && this.timePicker[i]?.endTime) {
                    if (!("interval_by_time_range" in datasource)) {
                        datasource.interval_by_time_range=[];
                    }
                    timeRangeInterval.push({
                        time_range: [this.timePicker[i].startTime, this.timePicker[i].endTime],
                        interval: this.timePicker[i].interval
                    });
                }
            }
            if (timeRangeInterval.length > 0) {
                this.$set(datasource, 'interval_by_time_range', timeRangeInterval);
            }
            this.$delete(datasource, "interval");
            if (this.timePickerWindowInfo.time != 0) {
                this.$set(datasource, 'interval', this.timePickerWindowInfo.time);
            }
            this.completeServer[this.timePickerWindowInfo.serversIndex-1] = false;

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
                return `<span>第<b>${index + 1}</b>条:<b>${x.time_range[0]}</b>到<b>${x.time_range[1]}</b>,频率为<b>${x.interval}</b>毫秒;</span>`;
            });
            html += '</div>';
            return html;
        },
        // 完成配置
        completeConfig() {
            let allComplete = this.completeServer.every((item)=>{
                return item;
            });
            if (allComplete) {
                this.nextPage();
                this.$refs["showAndConfirm"].open();
            } else {
                this.$message({
                    message: '还有情况没有配置完成噢',
                    type: 'warning'
                });
            }
        },
        // 验证一种情况下的配置
        validConfig(serverLiveNumber) {
            this.configLoading = true;
            let fetcherConfigValidationMessage = [];
            this.fetcherConfigList[serverLiveNumber - 1]?.server?.forEach((server, index) => {
                try {
                    // 替换config下面的datasources id为详细内容
                    let singleFetcher = JSON.parse(JSON.stringify(server));
                    singleFetcher.groups?.forEach((groupItem, groupIndex) => {
                        groupItem.datasource?.forEach((datasourceItem, datasourceIndex) => {
                            groupItem.datasource?.splice(datasourceIndex, 1, this.datasourceMap[datasourceItem].config);
                        });
                        singleFetcher.groups[groupIndex] = groupItem;
                    });
                    // 如果组内没有这数据则去掉蹲饼
                    for (let i = 0; i < singleFetcher.groups.length; i++) {
                        if (singleFetcher.groups[i].datasource.length == 0) {
                            singleFetcher.groups.splice(i, 1);
                            i--;
                        }
                    }
                    let needValid = true;
                    // 去除后，如果已经没有组，就不用验证
                    if (singleFetcher.groups.length == 0) {
                        needValid = false;
                    }
                    if (needValid) {
                        // 制作平台配置
                        let platform = {};
                        this.platformList.forEach((item) => {
                            platform[item.typeId] = { min_request_interval: item.minRequestInterval };
                        });
                        // 拼接全局变量与平台配置
                        let fetcherConfig = { ...this.globalConfig, ...singleFetcher, platform };
                        FetchController.validateConfig(fetcherConfig);
                    }
                } catch (e) {
                    fetcherConfigValidationMessage.push({ number: index+1, message: e.message });
                }

            });
            if (fetcherConfigValidationMessage.length == 0) {
                this.$set(this.completeServer, serverLiveNumber - 1, true);
                this.$message({
                    message: '验证成功',
                    type: 'success'
                });
            } else {
                let noticeStr = "";
                fetcherConfigValidationMessage.forEach(item => {
                    noticeStr += `第${item.number}个蹲饼器，配置失败\n失败原因：${item.message}\n`;
                });
                this.$alert(noticeStr, '验证失败', {
                    confirmButtonText: '确定',
                    customClass: "notice-box",
                });
            }
            this.configLoading = false;
        },
        // 提交配置
        submitConfig () {
            this.$store
                .dispatch("fetcherConfig/uploadFetcherConfig", this.fetcherConfigList)
                .then(() => {
                    this.$message({
                        showClose: true,
                        message: "上传蹲饼器配置成功",
                        type: "success",
                    });
                }).catch(() =>{
                    this.$message({
                        showClose: true,
                        message: "上传蹲饼器配置失败",
                        type: "error",
                    });
                });
            this.initData();
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
    margin-bottom: 10px !important;
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

  .position-relative {
    position: relative;
  }

  .position-absolute {
    position: absolute;
  }

  .position-top-0 {
    top: 0
  }

  .position-right-18 {
    right: 18px
  }

  .btn-valid {
    position: absolute;
    top: 10px;
    right: 29px;
  }

  .btn-prev {
    position: fixed;
    right: 280px;
    bottom: 20px;
  }

  .btn-reset {
    position: fixed;
    right: 180px;
    bottom: 20px;
  }

  .btn-next {
    position: fixed;
    right: 80px;
    bottom: 20px;
  }
}
</style>
<style lang="scss">
.notice-box {
  white-space: pre-line;
}
</style>
