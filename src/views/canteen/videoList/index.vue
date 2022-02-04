<template>
  <div id="mainWindow">
    <el-collapse
      v-for="(video, index) in videoListForm.videos"
      :key="index"
      v-model="activeName"
      accordion
    >
      <el-collapse-item :name="index" class="btn">
        <template slot="title">
          <div class="collapse-header">
            <div>
              {{
                "第" +
                (index + 1) +
                "个，BV号:" +
                video.BV +
                "，从" +
                video.starTime +
                "显示到" +
                video.overTime + 
                (video.set ? "  (已完成) " : "  (未完成) ")
              }}
            </div>
            <div>
              <el-button
                @click.stop="addVideo(index)"
                icon="el-icon-plus"
                class="btn-editor btn-add"
                round
              ></el-button>
              <el-button
                @click.stop="removeVideo(video)"
                icon="el-icon-delete"
                class="btn-editor btn-delete"
                round
              ></el-button>
            </div>
          </div>
        </template>
        <el-form
          ref="videoListForm"
          :model="videoListForm"
          class="video-list"
          label-width="100px"
        >
          <el-form-item label="BV号">
            <el-input v-model="video.BV" placeholder="请输入BV号" class="width30" @blur="getVideoInfo(index)">
              <template slot="prepend">BV</template>
            </el-input>
          </el-form-item>
          <el-form-item label="显示时间">
            <el-date-picker
              v-model="video.starTime"
              type="datetime"
              placeholder="选择开始显示日期时间"
              align="right"
              :picker-options="pickerStarTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              @blur="checkForm(index)"
            />
            -
            <el-date-picker
              v-model="video.overTime"
              type="datetime"
              placeholder="选择结束显示日期时间"
              align="right"
              :picker-options="pickerOverTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              @focus="activeIndex = index"
              @blur="checkForm(index)"
            />
          </el-form-item>
          <el-form-item label="是否加圆角">
            <el-switch v-model="video.radius"></el-switch>
          </el-form-item>
          <el-form-item label="视频标题">
            <el-input v-model="video.title" placeholder="请输入标题" @blur="checkForm(index)"></el-input>
          </el-form-item>
          <el-form-item label="up主">
            <el-input v-model="video.author" :disabled="true" class="width30"></el-input>
          </el-form-item>
          <el-form-item label="视频链接">
            <el-input v-model="video.videoLink" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="封面链接">
            <el-input v-model="video.coverImg" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-button
      type="primary"
      @click="submitForm('videoListForm')"
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
    return {
      activeIndex: 0,
      videoListForm: {
        videos: [
          {
            BV: null,
            starTime: null,
            overTime: null,
            radius: true,
            title: null,
            author: null,
            videoLink: null,
            coverImg: null,
            set: false,
          },
        ],
      },
      pickerStarTime: {
        shortcuts: [
          {
            text: "今天4点",
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.format(
                  TimeUtil.fourTime(TimeUtil.changeToCCT(new Date())),
                  "yyyy-MM-dd hh:mm:ss"
                )
              );
            },
          },
          {
            text: "今天16点",
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.format(
                  TimeUtil.sixteenTime(TimeUtil.changeToCCT(new Date())),
                  "yyyy-MM-dd hh:mm:ss"
                )
              );
            },
          },
          {
            text: "明天4点",
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.format(
                  TimeUtil.fourTime(
                    TimeUtil.tomorrowTime(TimeUtil.changeToCCT(new Date()))
                  ),
                  "yyyy-MM-dd hh:mm:ss"
                )
              );
            },
          },
          {
            text: "昨天16点",
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.format(
                  TimeUtil.sixteenTime(
                    TimeUtil.lastDayTime(TimeUtil.changeToCCT(new Date()))
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
            text: "微型故事集",
            onClick: (picker) => {
              picker.$emit(
                "pick",
                TimeUtil.passHourTime(
                  that.videoListForm.videos[that.activeIndex].starTime,
                  6 * 24 + 12
                )
              );
            },
          },
          {
            text: "复刻活动",
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.passHourTime(
                  that.videoListForm.videos[that.activeIndex].starTime,
                  9 * 24 + 12
                )
              );
            },
          },
          {
            text: "SideStory",
            onClick(picker) {
              picker.$emit(
                "pick",
                TimeUtil.passHourTime(
                  that.videoListForm.videos[that.activeIndex].starTime,
                  13 * 24 + 12
                )
              );
            },
          },
        ],
      },
      activeName: "0",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    removeVideo(item) {
      var index = this.videoListForm.videos.indexOf(item);
      if (this.videoListForm.videos.length > 1) {
        if (index !== -1) {
          this.videoListForm.videos.splice(index, 1);
        }
      }
    },
    addVideo(index) {
      this.videoListForm.videos.splice(index + 1, 0, {
        BV: null,
        starTime: null,
        overTime: null,
        radius: true,
        title: null,
        author: null,
        videoLink: null,
        coverImg: null,
        set: false,
      });
    },
    // 检查表单有没有填完
    checkForm(index) {
      let complete = true;
      for (let detail in this.videoListForm.videos[index]) {
        if (this.videoListForm.videos[index][detail] == null) {
          complete = false;
        }
      }
      if (complete) {
        this.videoListForm.videos[index][set] = true;
      } 
      console.log(this.videoListForm.videos[index]);
    },
    //获取视频详细信息
    getVideoInfo(index) {
      let bvNumber = this.videoListForm.videos[index][BV]
      
    }
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

  .width30 {
    width: 30%;
  }

  .btn-submit {
    position: fixed;
    bottom: 20px;
    right: 80px;
  }
}
</style>
