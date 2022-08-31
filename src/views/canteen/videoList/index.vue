<template>
  <div id="mainWindow">
    <h3>视频链接</h3>
    <draggable
      tag="el-collapse" handle=".collapse-header" :list="videoListForm.videos"
      :component-data="collapseComponentData" @start="draggStart" @end="draggEnd"
    >
      <el-collapse-item
        v-for="(video, index) in videoListForm.videos" :key="index" :name="index"
        class="btn"
      >
        <template slot="title">
          <div class="collapse-header">
            <div>
              {{
                "第" +
                  (index + 1) +
                  "个，标题：" +
                  video.title.substring(0, 40) +
                  "， 从" +
                  video.start_time +
                  "显示到" +
                  video.over_time +
                  (setAll[index].set ? " (已完成) " : " (未完成) ")
              }}
            </div>
            <div>
              <el-button
                icon="el-icon-plus" class="btn-editor btn-add" round
                @click.stop="addVideo(index)"
              />
              <el-button
                icon="el-icon-delete" class="btn-editor btn-delete" round
                @click.stop="removeVideo(video)"
              />
            </div>
          </div>
        </template>
        <el-card class="single-card">
          <el-form
            :ref="'videoListForm' + index" :model="videoListForm.videos[index]" :rules="videoRules"
            class="video-list" label-width="100px" label-position="left"
          >
            <el-form-item label="BV号" prop="bv">
              <el-input
                v-model="video.bv" placeholder="请输入BV号" class="width30"
                @blur="getVideoInfo(index)"
              >
                <template slot="prepend">
                  BV
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="显示时间" prop="start_time">
              <el-date-picker
                v-model="video.start_time" type="datetime" placeholder="选择开始显示日期时间"
                align="center"
                :picker-options="pickerStarTime" value-format="yyyy-MM-dd HH:mm:ss" @blur="checkForm(index)"
              />
              -
              <el-date-picker
                v-model="video.over_time" type="datetime" placeholder="选择结束显示日期时间"
                align="center"
                :picker-options="pickerOverTime" value-format="yyyy-MM-dd HH:mm:ss" @focus="activeIndex = index"
                @blur="checkForm(index)"
              />
            </el-form-item>
            <el-form-item label="视频标题" prop="title">
              <el-input
                v-model="video.title" placeholder="请输入标题"
                @blur="checkForm(index)"
              />
            </el-form-item>
            <el-form-item label="up主" prop="author">
              <el-input
                v-model="video.author" :disabled="true"
                class="width30"
              />
            </el-form-item>
            <el-form-item label="视频链接" prop="video_link">
              <el-input v-model="video.video_link" :disabled="true" />
            </el-form-item>
            <el-form-item label="封面链接" prop="cover_img">
              <el-input v-model="video.cover_img" :disabled="true" />
            </el-form-item>
            <el-form-item>
              <iframe
                :src="'//player.bilibili.com/player.html?bvid=' + video.bv" scrolling="no" border="0"
                frameborder="no" framespacing="0" allowfullscreen="true"
              >
              </iframe>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </draggable>
    <form-button @submit="submitVideoList('videoListForm')" />
  </div>
</template>
<script>
import TimeUtil from "@/utils/time";
import FormButton from "@/components/FormButton";
import draggable from "vuedraggable";

export default {
    components: { FormButton, draggable },
    data() {
        let validBV = (rule, value, callback) => {
            let pattern = /^(BV)?1..4(1|y)1.7..$/i;
            if (!pattern.test(value)) {
                callback(new Error("你这BV号好像不太对诶"));
            } else {
                callback();
            }
        };
        let timeValidate = (rule, value, callback) => {
            if (
                this.videoListForm.videos[this.activeIndex].start_time == "" ||
        this.videoListForm.videos[this.activeIndex].over_time == "" ||
        this.videoListForm.videos[this.activeIndex].start_time == null ||
        this.videoListForm.videos[this.activeIndex].over_time == null
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
            videoListForm: {
                videos: [
                    {
                        bv: "",
                        start_time: null,
                        over_time: null,
                        title: "",
                        author: "",
                        video_link: "",
                        cover_img: "",
                    },
                ],
            },
            setAll: [
                {
                    set: false,
                },
            ],
            videoRules: {
                bv: [
                    {
                        validator: validBV,
                        message: "你这BV号好像不太对诶",
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
                title: [
                    {
                        required: true,
                        message: "标题可别漏了",
                        trigger: "blur",
                    },
                ],
            },
            pickerStarTime: {
                shortcuts: [
                    {
                        text: "今天4点",
                        onClick: (picker) => {
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
                        onClick: (picker) => {
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
                        onClick: (picker) => {
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
                        text: "明天16点",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.format(
                                    TimeUtil.sixteenTime(
                                        TimeUtil.tomorrowTime(TimeUtil.changeToCCT(new Date()))
                                    ),
                                    "yyyy-MM-dd hh:mm:ss"
                                )
                            );
                        },
                    },
                    {
                        text: "昨天16点",
                        onClick: (picker) => {
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
                        text: "当前日期4点",
                        onClick: (picker) => {
                            picker.$emit(
                                "pick",
                                TimeUtil.format(
                                    TimeUtil.beforeFourTime(
                                        new Date(
                                            this.videoListForm.videos[this.activeIndex].over_time
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
                                    TimeUtil.beforeSixteenTime(
                                        new Date(
                                            this.videoListForm.videos[this.activeIndex].over_time
                                        )
                                    ),
                                    "yyyy-MM-dd hh:mm:ss"
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
                                    this.videoListForm.videos[this.activeIndex].start_time,
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
                                    this.videoListForm.videos[this.activeIndex].start_time,
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
                                    this.videoListForm.videos[this.activeIndex].start_time,
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
                                    this.videoListForm.videos[this.activeIndex].start_time,
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
            this.$store.dispatch("video/getVideoList").then((response) => {
                response.data.map((video, index) => {
                    if (index == 0) {
                        this.setAll[index]["set"] = true;
                    } else {
                        this.setAll.splice(index, 0, {
                            set: true,
                        });
                    }
                });
                this.videoListForm.videos = JSON.parse(JSON.stringify(response.data));
            })
                .then(_ => {
                    if (this.videoListForm.videos.length == 0) {
                        this.videoListForm.videos.splice(0, 0, {
                            bv: "",
                            start_time: null,
                            over_time: null,
                            title: "",
                            author: "",
                            video_link: "",
                            cover_img: "",
                        });
                    }
                });

        },
        // 提交表单到服务器
        submitVideoList() {
            let allPass = true;
            let empty = false;
            if (this.videoListForm.videos.length == 1 && JSON.stringify(this.videoListForm.videos) == JSON.stringify([{
                bv: "",
                start_time: null,
                over_time: null,
                title: "",
                author: "",
                video_link: "",
                cover_img: "",
            }])) {
                empty = true;
            }
            if (!empty) {
                this.videoListForm.videos.forEach((item, index) => {
                    this.$refs["videoListForm" + index][0].validate((valid) => {
                        if (!valid) {
                            allPass = false;
                            return;
                        }
                    });
                });
            }
            if (allPass) {
                let videoList = {};
                videoList = JSON.parse(JSON.stringify(this.videoListForm));
                videoList.videos.forEach((video) => {
                    if (video.bv.substring(0, 2) !== "BV") {
                        video.bv = "BV" + video.bv;
                    }
                });
                if (empty) {
                    videoList.videos = [];
                }

                this.$store
                    .dispatch("video/submitVideoList", videoList.videos)
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
        // 删除视频
        removeVideo(item) {
            let index = this.videoListForm.videos.indexOf(item);
            if (this.videoListForm.videos.length > 1) {
                if (index !== -1) {
                    this.videoListForm.videos.splice(index, 1);
                    this.setAll.splice(index, 1);
                }
            } else {
                this.videoListForm.videos = [{
                    bv: "",
                    start_time: null,
                    over_time: null,
                    title: "",
                    author: "",
                    video_link: "",
                    cover_img: "",
                }];
                this.setAll = [{
                    set: false,
                }];
            }

        },
        // 添加视频
        addVideo(index) {
            this.videoListForm.videos.splice(index + 1, 0, {
                bv: "",
                start_time: null,
                over_time: null,
                radius: true,
                title: "",
                author: "",
                video_link: "",
                cover_img: "",
                set: false,
            });
            this.setAll.splice(index + 1, 0, {
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
                this.setAll[index]["set"] = true;
            } else {
                this.setAll[index]["set"] = false;
            }
        },
        //获取视频详细信息
        getVideoInfo(index) {
            this.$refs["videoListForm" + index][0].validateField("bv", (valid) => {
                if (valid === "") {
                    let bv_number = this.videoListForm.videos[index]["bv"];
                    this.$store
                        .dispatch("video/getVideoInfo", bv_number)
                        .then((response) => {
                            response.data = JSON.parse(response.data);
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
                            this.videoListForm.videos[index]["cover_img"] =
                response.data.data.pic + "@200w_125h_1c.webp";
                            this.videoListForm.videos[index]["author"] =
                response.data.data.owner.name;
                            this.videoListForm.videos[index]["video_link"] =
                "https://www.bilibili.com/video/" + bv_number;
                            this.checkForm(index);
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                }
            });
        },

        // 拖拽表单
        inputChanged(val) {
            this.collapseProps.value = val;
        },
        draggStart(event) {
            this.collapseProps.value = "";
        },
        draggEnd() {
            this.videoListForm.videos.forEach((_, index) => {
                this.checkForm(index);
            });
        },
    },
};
</script>
<style lang="scss" scoped>
#mainWindow {

  .video_title {
    display: flex;
    justify-content: space-between;

    .btn-add {
      margin-top: 10px;
      height: 40px;
    }
  }

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
  }

  .width30 {
    width: 30%;
  }
}
</style>
