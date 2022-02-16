<template>
  <div id="mainWindow">
    <h3>公告内容</h3>
    <el-collapse
      v-for="(announcement, index) in announcementForm.announcements"
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
                "个， 从" +
                announcement.starTime +
                "显示到" +
                announcement.overTime +
                (setAll[index].set ? "  (已完成) " : "  (未完成) ")
              }}
            </div>
            <div>
              <el-button
                @click.stop="addAnnouncement(index)"
                icon="el-icon-plus"
                class="btn-editor btn-add"
                round
              ></el-button>
              <el-button
                @click.stop="removeAnnouncement(announcements)"
                icon="el-icon-delete"
                class="btn-editor btn-delete"
                round
              ></el-button>
            </div>
          </div>
        </template>
        <el-card class="single-card">
          <el-form
            :ref="'announcementForm' + index"
            :model="announcementForm.announcements[index]"
            :rules="announcementRules"
            class="announcement-list"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="图片链接" prop="imgUrl">
              <el-input
                v-model="announcement.imgUrl"
                placeholder="请输入图片链接"
                @blur="getImg(index), checkForm(index)"
              ></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <rich-editor
                v-model="announcement.content"
              />
            </el-form-item>
            <el-form-item label="显示时间" prop="starTime">
              <el-date-picker
                v-model="announcement.starTime"
                type="datetime"
                placeholder="选择开始显示日期时间"
                align="center"
                :picker-options="pickerStarTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus="activeIndex = index"
                @blur="checkForm(index)"
              />
              -
              <el-date-picker
                v-model="announcement.overTime"
                type="datetime"
                placeholder="选择结束显示日期时间"
                align="center"
                :picker-options="pickerOverTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus="activeIndex = index"
                @blur="checkForm(index)"
              />
            </el-form-item>
            <el-form-item label="是否推送" prop="notice">
              <el-switch
                v-model="announcement.notice"
                active-color="#ffba4b"
                inactive-color="#97a8be"
                @blur="checkForm(index)"
              >
              </el-switch>
            </el-form-item>
          </el-form>

          <div style="display: flex; align-items: center">
            <span class="preview-label">快速预览</span>
            <div class="list-html margintb">
              <div class="online-area">
                <img
                  class="online-title-img radius"
                  :src="imgList[index].img"
                />
                <div v-html="announcement.content"></div>
              </div>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
    <form-button @submit="submitAnnouncementList"></form-button>
  </div>
</template>

<script>
import TimeUtil from "@/utils/time";
import RichEditor from "@/components/RichEditor";
import FormButton from "@/components/FormButton/index";

export default {
  components: { RichEditor, FormButton },
  data() {
    let that = this;
    let timeValidate = (rule, value, callback) => {
      if (
        that.announcementForm.announcements[that.activeIndex].starTime == "" ||
        that.announcementForm.announcements[that.activeIndex].overTime == "" ||
        that.announcementForm.announcements[that.activeIndex].starTime ==
          null ||
        that.announcementForm.announcements[that.activeIndex].overTime == null
      ) {
        callback(new Error("我要什么时候显示呀"));
      } else {
        callback();
      }
    };
    return {
      announcementForm: {
        announcements: [
          {
            starTime: "",
            overTime: "",
            imgUrl: "",
            content: "",
            notice: false,
          },
        ],
      },
      setAll: [
        {
          set: false,
        },
      ],
      imgList: [
        {
          img: "",
        },
      ],
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
                        ? that.announcementForm.announcements[
                            that.activeIndex - 1
                          ].overTime
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
                  that.announcementForm.announcements[that.activeIndex]
                    .starTime,
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
                  that.announcementForm.announcements[that.activeIndex]
                    .starTime,
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
                  that.announcementForm.announcements[that.activeIndex]
                    .starTime,
                  13 * 24 + 12
                )
              );
            },
          },
        ],
      },
      announcementRules: {
        imgUrl: [
          {
            required: true,
            message: "没图多不好看呀",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "配点文字吧",
            trigger: "blur",
          },
        ],
        starTime: [
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
      },
      activeIndex: 0,
      activeName: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("announcement/getAnnouncementList")
        .then((response) => {
          response.data.announcements.map((announcement, index) => {
            if (index == 0) {
              this.setAll[index]["set"] = true;
            } else {
              this.setAll.splice(index, 0, {
                set: true,
              });
              this.imgList.splice(index, 0, {
                img: "",
              });
            }
            this.getImg(index, announcement.imgUrl);
          });
          this.announcementForm = JSON.parse(JSON.stringify(response.data));
        });
    },
    // 提交表单到服务器
    submitAnnouncementList() {
      let allPass = true;
      this.announcementForm.announcements.forEach((item, index) => {
        this.$refs["announcementForm" + index][0].validate((valid) => {
          if (!valid) {
            allPass = false;
            return;
          }
        });
      });
      if (allPass) {
        this.$store
          .dispatch(
            "announcement/submitAnnouncementList",
            this.announcementForm
          )
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
        // console.log(JSON.stringify(this.announcementForm))
      }
    },
    // 获取图片展示
    getImg(index, imgUrl = "") {
      if (imgUrl === "") {
        if (
          this.announcementForm.announcements[index].imgUrl.indexOf("icon") !=
            -1 &&
          this.announcementForm.announcements[index].imgUrl.indexOf("http") ==
            -1
        ) {
          this.imgList[index].img = require("../../../assets/image/logo/" +
            this.announcementForm.announcements[index].imgUrl +
            ".png");
        } else {
          this.imgList[index].img =
            this.announcementForm.announcements[index].imgUrl;
        }
      } else {
        if (imgUrl.indexOf("icon") != -1 && imgUrl.indexOf("http") == -1) {
          this.imgList[index].img = require("../../../assets/image/logo/" +
            imgUrl +
            ".png");
        } else {
          this.imgList[index].img = imgUrl;
        }
      }
    },
    // 删除公告
    removeAnnouncement(item) {
      let index = this.announcementForm.announcements.indexOf(item);
      if (this.announcementForm.announcements.length > 1) {
        if (index !== -1) {
          this.announcementForm.announcements.splice(index, 1);
          this.imgList.splice(index, 1);
        }
      }
    },
    // 添加新增公告
    addAnnouncement(index) {
      this.announcementForm.announcements.splice(index + 1, 0, {
        starTime: "",
        overTime: "",
        imgUrl: "",
        content: "",
        notice: false,
      });
      this.imgList.splice(index + 1, 0, {
        img: "",
      });
    },
    // 检查表单有没有填完
    checkForm(index) {
      let complete = true;
      for (let detail in this.announcementForm.announcements[index]) {
        if (
          this.announcementForm.announcements[index][detail] == null ||
          this.announcementForm.announcements[index][detail] === ""
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

    .preview-label {
      width: 87px;
      text-align: left;
      margin-right: 10px;
      color: #606266;
      font-size: 14px;
    }

    .list-html {
      padding: 3px;
      width: 634px;
      height: 108px;
      background-color: #fff;
      border: 1px solid #e4e7ed;
      color: #848488;
      font-size: 14px;
      border-radius: 4px;
      font-family: "Segoe UI", Arial, "Microsoft Yahei", sans-serif;

      /deep/ .online-area {
        display: flex;
        align-items: center;
        margin-right: 30px;
        line-height: 19.2px;

        p {
          margin: 0px;
        }
      }

      /deep/ .online-area .online-title-img {
        height: 100px;
        margin-right: 10px;
        min-width: 100px;
      }

      /deep/ .online-area .online-title-img.radius {
        border-radius: 4px;
      }

      /deep/ .online-pointer {
        cursor: pointer;
      }
    }
  }
}
</style>