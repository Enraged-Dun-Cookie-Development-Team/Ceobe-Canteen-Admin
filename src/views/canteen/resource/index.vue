<template>
  <div id="mainWindow">
    <h3>资源全开放时间</h3>
    <el-form
      ref="openForm" :model="resourceForm"
      :rules="resourceRules"
    >
      <el-form-item prop="resources">
        <el-date-picker
          v-model="resourceForm.resources" class="resourceSelect" type="datetimerange"
          align="left"
          value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"
          :default-time="['16:00:00', '03:59:59']"
        />
      </el-form-item>
    </el-form>
    <h3>倒计时管理</h3>
    <draggable
      tag="el-collapse" handle=".collapse-header" :list="resourceForm.countdown"
      :component-data="collapseComponentData" @start="draggStart" @end="draggEnd"
    >
      <el-collapse-item
        v-for="(item, index) in resourceForm.countdown" :key="index" :name="index"
        class="btn"
      >
        <template slot="title">
          <div class="collapse-header">
            <div>
              {{
                (item.text ? item.text : "未填写") +
                  "从" +
                  (item.start_time ? item.start_time : " ") +
                  "显示到" +
                  item.over_time +
                  (setAll[index].set ? " (已完成) " : " (未完成) ")
              }}
            </div>
            <div>
              <el-button
                icon="el-icon-plus" class="btn-editor btn-add" round
                @click.stop="addItem(index)"
              />
              <el-button
                icon="el-icon-delete" class="btn-editor btn-delete" round
                @click.stop="removeItem(item)"
              />
            </div>
          </div>
        </template>
        <el-card class="single-card">
          <el-form
            :ref="'countdownForm' + index" :model="resourceForm.countdown[index]" :rules="resourceRules"
            class="item-list" label-width="100px" label-position="left"
          >
            <el-form-item label="标题" prop="text">
              <el-input
                v-model="item.text" class="width50" placeholder="请输入标题"
                @blur="checkForm(index)"
              />
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input
                v-model="item.remark" class="width50" placeholder="请输入描述"
                @blur="checkForm(index)"
              />
            </el-form-item>
            <el-form-item
              label="显示时间" prop="start_time"
              required
            >
              <el-date-picker
                v-model="item.start_time" type="datetime" placeholder="选择开始显示日期时间"
                align="center"
                :picker-options="pickerStarTime" value-format="yyyy-MM-dd HH:mm:ss" @focus="activeIndex = index"
                @blur="checkForm(index)"
              />
              -
              <el-date-picker
                v-model="item.over_time" type="datetime" placeholder="选择结束显示日期时间"
                align="center"
                :picker-options="pickerOverTime" value-format="yyyy-MM-dd HH:mm:ss" @focus="activeIndex = index"
                @blur="checkForm(index)"
              />
            </el-form-item>
            <el-form-item label="倒计时终点" prop="time">
              <el-date-picker
                v-model="item.time" type="datetime" placeholder="选择倒计时终点时间"
                align="center"
                value-format="yyyy-MM-dd HH:mm:ss" @blur="checkForm(index)"
              />
              <el-button
                round class="sync-btn"
                @click="syncTime(index)"
              >
                同步显示结束时间
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </draggable>
    <form-button @submit="submitResourceList('videoListForm')" />
  </div>
</template>
<script>
import TimeUtil from "@/utils/time";
import FormButton from '@/components/FormButton';
import draggable from "vuedraggable";

export default {
    components: { FormButton, draggable },
    data() {
        let timeValidate = (rule, value, callback) => {
            if (
                this.resourceForm.countdown[this.activeIndex].start_time == "" ||
        this.resourceForm.countdown[this.activeIndex].over_time == "" ||
        this.resourceForm.countdown[this.activeIndex].start_time == null ||
        this.resourceForm.countdown[this.activeIndex].over_time == null
            ) {
                callback(new Error("我要什么时候显示呀"));
            } else {
                callback();
            }
        };
        const collapseProps = {
            accordion: true,
            value: '',
        };
        return {
            collapseProps: collapseProps,
            collapseComponentData: {
                on: {
                    input: this.inputChanged
                },
                props: collapseProps
            },
            activeIndex: 0,
            old_resourceFrom: {
                resources: [],
                countdown: [
                    {
                        text: "",
                        remark: "",
                        time: "",
                        start_time: "",
                        over_time: "",
                    },
                ],
            },
            resourceForm: {
                resources: [],
                countdown: [
                    {
                        text: "",
                        remark: "",
                        time: "",
                        start_time: "",
                        over_time: "",
                    },
                ],
            },
            setAll: [
                {
                    set: false,
                },
            ],
            resourceRules: {
                resources: [
                    {
                        required: true,
                        message: "什么时候才有资源全开放呀",
                        trigger: "blur",
                    },
                ],
                text: [
                    {
                        required: true,
                        message: "没标题怎么知道是什么呢",
                        trigger: "blur",
                    },
                ],
                start_time: [
                    {
                        required: true,
                        message: "我要什么时候显示呀",
                        trigger: "blur",
                    },
                    {
                        validator: timeValidate,
                        message: "我要什么时候显示呀",
                        trigger: "blur",
                    },
                ],
                time: [
                    {
                        required: true,
                        message: "啊喂~给个终点时间呀",
                        trigger: ["blur", "change"],
                    },
                ],
            },
            pickerStarTime: {
                shortcuts: [
                    {
                        text: "上一个后1秒",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.format(
                                    TimeUtil.passSecondTime(
                                        new Date(
                                            this.activeIndex != 0
                                                ? this.resourceForm.countdown[this.activeIndex - 1]
                                                    .over_time
                                                : ""
                                        ),
                                        1
                                    ),
                                    "yyyy-MM-dd hh:mm:ss"
                                )
                            );
                        },
                    },
                    {
                        text: "当前日期4点",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.format(
                                    TimeUtil.fourTime(
                                        new Date(
                                            this.resourceForm.countdown[this.activeIndex].start_time
                                        )
                                    ),
                                    "yyyy-MM-dd hh:mm:ss"
                                )
                            );
                        },
                    },
                    {
                        text: "当前日期16点",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.format(
                                    TimeUtil.sixteenTime(
                                        new Date(
                                            this.resourceForm.countdown[this.activeIndex].start_time
                                        )
                                    ),
                                    "yyyy-MM-dd hh:mm:ss"
                                )
                            );
                        },
                    },
                ],
            },
            pickerOverTime: {
                shortcuts: [
                    {
                        text: "半天",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.passHourTime(
                                    this.resourceForm.countdown[this.activeIndex].start_time,
                                    12
                                )
                            );
                        },
                    },
                    {
                        text: "7天",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.passHourTime(
                                    this.resourceForm.countdown[this.activeIndex].start_time,
                                    6 * 24 + 12
                                )
                            );
                        },
                    },
                    {
                        text: "10天",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.passHourTime(
                                    this.resourceForm.countdown[this.activeIndex].start_time,
                                    9 * 24 + 12
                                )
                            );
                        },
                    },
                    {
                        text: "14天",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.passHourTime(
                                    this.resourceForm.countdown[this.activeIndex].start_time,
                                    13 * 24 + 12
                                )
                            );
                        },
                    },
                    {
                        text: "21天",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.passHourTime(
                                    this.resourceForm.countdown[this.activeIndex].start_time,
                                    20 * 24 + 12
                                )
                            );
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$store.dispatch("resource/getResourceList").then((response) => {
                response.data.countdown.map((countdown, index) => {
                    if (index == 0) {
                        this.setAll[index]["set"] = true;
                    } else {
                        this.setAll.splice(index, 0, {
                            set: true,
                        });
                    }
                });
                this.resourceForm.countdown = JSON.parse(JSON.stringify(response.data.countdown));
                this.resourceForm.resources = [response.data.resources.start_time, response.data.resources.over_time];
                this.old_resourceFrom = JSON.parse(JSON.stringify(this.resourceForm));
            });
        },
        // 提交表单到服务器
        submitResourceList() {
            let allPass = true;
            this.$refs["openForm"].validate((valid) => {
                if (valid) {
                    this.resourceForm.countdown.forEach((item, index) => {
                        this.$refs["countdownForm" + index][0].validate((valid) => {
                            if (!valid) {
                                allPass = false;
                                return;
                            }
                        });
                    });
                } else {
                    allPass = false;
                }
            });
            if (allPass) {
                let resource_form_submit = {};
                resource_form_submit.countdown = JSON.parse(JSON.stringify(this.resourceForm.countdown));
                resource_form_submit.resources = {
                    start_time: this.resourceForm.resources[0],
                    over_time: this.resourceForm.resources[1],
                };

                // 判断有没有修改，没有修改给null
                if (this.resourceForm.resources[0] == this.old_resourceFrom.resources[0] && this.resourceForm.resources[1] == this.old_resourceFrom.resources[1]) {
                    resource_form_submit.resources = null;
                }
                if (JSON.stringify(this.resourceForm.countdown) == JSON.stringify(this.old_resourceFrom.countdown)) {
                    resource_form_submit.countdown = null;
                }
                this.$store
                    .dispatch("resource/submitResourceList", resource_form_submit)
                    .then(() => {
                        this.$message({
                            showClose: true,
                            message: "上传上去啦",
                            type: "success",
                        });
                    })
                    .catch(() => {
                        this.$message({
                            showClose: true,
                            message: "好像有哪里不太对，联系开发者看看呀",
                            type: "warning",
                        });
                    })
                    .finally(() => {
                        this.init();
                    });
            }
        },
        // 删除倒计时
        removeItem(item) {
            let index = this.resourceForm.countdown.indexOf(item);
            if (this.resourceForm.countdown.length > 1) {
                if (index !== -1) {
                    this.resourceForm.countdown.splice(index, 1);
                    this.setAll.splice(index, 1);
                }

            }
            else {
                this.resourceForm.countdown = [{
                    text: "",
                    remark: "",
                    time: "",
                    start_time: "",
                    over_time: ""
                }];
                this.setAll = [{
                    set: false,
                }];
            }
        },
        // 添加单次资源
        addItem(index) {
            this.resourceForm.countdown.splice(index + 1, 0, {
                text: "",
                remark: "",
                time: "",
                start_time: "",
                over_time: "",
            });
            this.setAll.splice(index + 1, 0, {
                set: false,
            });
        },
        // 检查表单有没有填完
        checkForm(index) {
            let complete = true;
            for (let detail in this.resourceForm.countdown[index]) {
                if (
                    this.resourceForm.countdown[index][detail] == null ||
          this.resourceForm.countdown[index][detail] === ""
                ) {
                    complete = false;
                    break;
                }
            }
            if (complete) {
                this.setAll[index]["set"] = true;
            } else {
                this.setAll[index]["set"] = false;
            }
        },
        // 将显示结束时间赋值给倒计时终点时间
        syncTime(index) {
            if (this.resourceForm.countdown[index]["over_time"] != "") {
                this.resourceForm.countdown[index]["time"] =
          this.resourceForm.countdown[index]["over_time"];
            }
        },

        // 拖拽表单
        inputChanged(val) {
            this.collapseProps.value = val;
        },
        draggStart(event) {
            this.collapseProps.value = "";
        },
        draggEnd() {
            this.resourceForm.countdown.forEach((_, index) => {
                this.checkForm(index);
            });
        },
    },
};
</script>
<style lang="scss" scoped>
#mainWindow {

  .btn-add {
    color: white;
    background-color: #67c23a;
  }

  .btn-delete {
    color: white;
    background-color: #f56c6c;
  }

  .collapse-header {
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
    width: 100%;
  }

  .single-card {
    margin: 10px;

    ::v-deep label {
      font-weight: 500;
    }

    .sync-btn {
      margin-left: 15px;
    }
  }

  .width50 {
    width: 50%;
  }
}
</style>
