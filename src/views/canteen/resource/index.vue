<template>
  <div id="mainWindow">
    <h3>资源全开放时间</h3>
    <el-form ref="openForm" :model="resourceForm" :rules="resourceRules">
      <el-form-item prop="resources">
        <el-date-picker
          v-model="resourceForm.resources"
          class="resourceSelect"
          type="datetimerange"
          align="left"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['16:00:00', '03:59:59']"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <h3>倒计时管理</h3>
    <el-collapse
      v-for="(item, index) in resourceForm.countdown"
      :key="index"
      v-model="activeName"
      accordion
    >
      <el-collapse-item :name="index" class="btn">
        <template slot="title">
          <div class="collapse-header">
            <div>
              {{
                (item.text ? item.text : "未填写") +
                "从" +
                (item.starTime ? item.starTime : " ") +
                "显示到" +
                item.overTime
              }}
            </div>
            <div>
              <el-button
                @click.stop="addItem(index)"
                icon="el-icon-plus"
                class="btn-editor btn-add"
                round
              ></el-button>
              <el-button
                @click.stop="removeItem(item)"
                icon="el-icon-delete"
                class="btn-editor btn-delete"
                round
              ></el-button>
            </div>
          </div>
        </template>
        <el-card class="single-card">
          <el-form
            :ref="'countdownForm' + index"
            :model="resourceForm.countdown[index]"
            :rules="resourceRules"
            class="item-list"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="标题" prop="text">
              <el-input
                class="width50"
                v-model="item.text"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
              <el-input
                class="width50"
                v-model="item.remark"
                placeholder="请输入描述"
              ></el-input>
            </el-form-item>
            <el-form-item label="显示时间" prop="starTime" required>
              <el-date-picker
                v-model="item.starTime"
                type="datetime"
                placeholder="选择开始显示日期时间"
                align="center"
                :picker-options="pickerStarTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus="activeIndex = index"
              />
              -
              <el-date-picker
                v-model="item.overTime"
                type="datetime"
                placeholder="选择结束显示日期时间"
                align="center"
                :picker-options="pickerOverTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus="activeIndex = index"
              />
            </el-form-item>
            <el-form-item label="倒计时终点" prop="time">
              <el-date-picker
                v-model="item.time"
                type="datetime"
                placeholder="选择倒计时终点时间"
                align="center"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
              <el-button round @click="syncTime(index)" class="sync-btn"
                >同步显示结束时间</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </el-collapse>
    <el-button
      type="primary"
      @click="submitResourceList('videoListForm')"
      class="btn-submit"
      >提交</el-button
    >
  </div>
</template>
<script>
import TimeUtil from "@/utils/time";

export default {
  data() {
    let that = this;
    let timeValidate = (rule, value, callback) => {
      if (
        this.resourceForm.countdown[this.activeIndex].starTime == "" ||
        this.resourceForm.countdown[this.activeIndex].overTime == ""
      ) {
        callback(new Error("我要什么时候显示呀"));
      } else {
        callback();
      }
    };
    return {
      activeIndex: 0,
      activeName: 0,
      resourceForm: {
        resources: [],
        countdown: [
          {
            text: "",
            remark: "",
            time: "",
            starTime: "",
            overTime: "",
          },
        ],
      },
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
        starTime: [
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
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.format(
                  TimeUtil.passSecondTime(
                    new Date(
                      that.activeIndex != 0
                        ? that.resourceForm.countdown[that.activeIndex - 1]
                            .overTime
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
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.format(
                  TimeUtil.fourTime(
                    new Date(
                      that.resourceForm.countdown[that.activeIndex].starTime
                    )
                  ),
                  "yyyy-MM-dd hh:mm:ss"
                )
              );
            },
          },
          {
            text: "当前日期16点",
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.format(
                  TimeUtil.sixteenTime(
                    new Date(
                      that.resourceForm.countdown[that.activeIndex].starTime
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
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.passHourTime(
                  that.resourceForm.countdown[that.activeIndex].starTime,
                  12
                )
              );
            },
          },
          {
            text: "14天",
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.passHourTime(
                  that.resourceForm.countdown[that.activeIndex].starTime,
                  13 * 24 + 12
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
        this.resourceForm = JSON.parse(JSON.stringify(response.data));
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
      if(allPass) {
        this.$store
        .dispatch("resource/submitResourceList", this.resourceForm)
        .then((_) => {
          this.$message({
            showClose: true,
            message: "上传上去啦",
            type: "success",
          });
        })
        .catch((_) => {
          this.$message({
            showClose: true,
            message: "好像有哪里不太对，联系开发者看看呀",
            type: "warning",
          });
        });
      }
    },
    // 删除视频
    removeItem(item) {
      let index = this.resourceForm.countdown.indexOf(item);
      if (this.resourceForm.countdown.length > 1) {
        if (index !== -1) {
          this.resourceForm.countdown.splice(index, 1);
        }
      }
    },
    // 添加视频
    addItem(index) {
      this.resourceForm.countdown.splice(index + 1, 0, {
        text: "",
        remark: "",
        time: "",
        starTime: "",
        overTime: "",
      });
    },
    // 将显示结束时间赋值给倒计时终点时间
    syncTime(index) {
      if (this.resourceForm.countdown[index]["overTime"] != "") {
        this.resourceForm.countdown[index]["time"] =
          this.resourceForm.countdown[index]["overTime"];
      }
    },
  },
};
</script>
<style lang="less" scoped>
#mainWindow {
  .collapse-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-right: 10px;

    .btn-add {
      color: white;
      background-color: #67c23a;
    }
    .btn-delete {
      color: white;
      background-color: #f56c6c;
    }
  }

  .single-card {
    margin: 10px;

    /deep/ label {
      font-weight: 500;
    }

    .sync-btn {
      margin-left: 15px;
    }
  }

  .width50 {
    width: 50%;
  }

  .btn-submit {
    position: fixed;
    bottom: 20px;
    right: 80px;
  }
}
</style>