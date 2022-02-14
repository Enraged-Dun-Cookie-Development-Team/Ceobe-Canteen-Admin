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
                "个，标题：" +
                video.title.substring(0, 40) +
                "， 从" +
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
        <el-card class="single-card">
          <el-form
            :ref="'videoListForm' + index"
            :model="videoListForm.videos[0]"
            :rules="videoRules"
            class="video-list"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="BV号" prop="BV">
              <el-input
                v-model="video.BV"
                placeholder="请输入BV号"
                class="width30"
                @blur="getVideoInfo(index)"
              >
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
            <el-form-item label="视频标题">
              <el-input
                v-model="video.title"
                placeholder="请输入标题"
                @blur="checkForm(index)"
              ></el-input>
            </el-form-item>
            <el-form-item label="up主">
              <el-input
                v-model="video.author"
                :disabled="true"
                class="width30"
              ></el-input>
            </el-form-item>
            <el-form-item label="视频链接">
              <el-input v-model="video.videoLink" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="封面链接">
              <el-input v-model="video.coverImg" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
              <iframe
                :src="'//player.bilibili.com/player.html?bvid=' + video.BV"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
              >
              </iframe>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </el-collapse>
    <el-button
      type="primary"
      @click="submitVideoList('videoListForm')"
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
    let validBV = (rule, value, callback) => {
      let pattern = /^(BV)?1..4(1|y)1.7..$/i;
      if (!pattern.test(value)) {
        callback(new Error("你这BV号好像不太对诶"));
      } else {
        callback();
      }
    };
    return {
      activeIndex: 0,
      videoListForm: {
        videos: [
          {
            BV: "",
            starTime: null,
            overTime: null,
            title: "",
            author: "",
            videoLink: "",
            coverImg: "",
            set: false,
          },
        ],
      },
      videoRules: {
        BV: [
          {
            validator: validBV,
            trigger: "blur",
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch("video/getVideoList").then((response) => {
        this.videoListForm = JSON.parse(JSON.stringify(response.data));
      });
    },
    // 提交表单到服务器
    submitVideoList() {
      let videoList = {};
      videoList.videos = [];
      this.videoListForm.videos.forEach((video) => {
        if (video.set == true) {
          videoList.videos.push(JSON.parse(JSON.stringify(video)));
        }
      });
      videoList.videos.forEach((video) => {
        if (video.BV.substring(0, 2) !== "BV") {
          video.BV = "BV" + video.BV;
        }
      });

      this.$store
        .dispatch("video/submitVideoList", videoList)
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
    },
    // 删除视频
    removeVideo(item) {
      let index = this.videoListForm.videos.indexOf(item);
      if (this.videoListForm.videos.length > 1) {
        if (index !== -1) {
          this.videoListForm.videos.splice(index, 1);
        }
      }
    },
    // 添加视频
    addVideo(index) {
      this.videoListForm.videos.splice(index + 1, 0, {
        BV: "",
        starTime: null,
        overTime: null,
        radius: true,
        title: "",
        author: "",
        videoLink: "",
        coverImg: "",
        set: false,
      });
    },
    // 检查表单有没有填完
    checkForm(index) {
      let complete = true;
      for (let detail in this.videoListForm.videos[index]) {
        if (
          this.videoListForm.videos[index][detail] == null ||
          this.videoListForm.videos[index][detail] === ""
        ) {
          complete = false;
          break;
        }
      }
      if (complete) {
        this.videoListForm.videos[index]["set"] = true;
      } else {
        this.videoListForm.videos[index]["set"] = false;
      }
    },
    //获取视频详细信息
    getVideoInfo(index) {
      this.$refs["videoListForm" + index][0].validate((valid) => {
        if (valid) {
          let bvNumber = this.videoListForm.videos[index]["BV"];
          this.$store
            .dispatch("video/getVideoInfo", bvNumber)
            .then((response) => {
              if (response.data.code != 0) {
                this.$message({
                  showClose: true,
                  message: "BV号不正确，检查一下噢",
                  type: "warning",
                });
                throw new Error("BV号不正确");
              }
              this.videoListForm.videos[index]["title"] =
                response.data.data.title;
              this.videoListForm.videos[index]["coverImg"] =
                response.data.data.pic + "@@200w_125h_1c.webp";
              this.videoListForm.videos[index]["author"] =
                response.data.data.owner.name;
              this.videoListForm.videos[index]["videoLink"] =
                "https://www.bilibili.com/video/" + bvNumber;
              this.checkForm(index);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
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
  }

  .width30 {
    width: 30%;
  }

  .btn-submit {
    position: fixed;
    bottom: 20px;
    right: 80px;
    background-color: #ffba4b;
    border-color: #ffba4b;
  }
  .btn-submit:focus,
  .btn-submit:hover {
    background-color: #ffc76e;
    border-color: #ffc76e;
  }
}
</style>
