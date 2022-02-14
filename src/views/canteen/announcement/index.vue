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
                announcement.overTime
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
                @click.stop="removeAnnouncement(video)"
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
            <el-form-item label="图片链接">
              <el-input
                v-model="announcement.imgUrl"
                placeholder="请输入图片链接"
              ></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <tinymce
                v-model="announcement.content"
                :height="100"
                @blur="test"
              />
            </el-form-item>
            <el-form-item label="显示时间">
              <el-date-picker
                v-model="announcement.starTime"
                type="datetime"
                placeholder="选择开始显示日期时间"
                align="right"
                :picker-options="pickerStarTime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
              -
              <el-date-picker
                v-model="announcement.overTime"
                type="datetime"
                placeholder="选择结束显示日期时间"
                align="right"
                :picker-options="pickerOverTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @focus="activeIndex = index"
              />
            </el-form-item>
          </el-form>
          <div style="display: flex; align-items: center">
            <span class="preview-label">快速预览</span>
            <div
              class="list-html margintb"
              v-html="announcementPreview[index].content"
            ></div>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
    <!-- <form-button @submit="aa"></form-button> -->
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import FormButton from "@/components/FormButton/index";

export default {
  components: { Tinymce, FormButton },
  data() {
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
      announcementPreview: [
        {
          content:
            "<div class='online-area'> <img class='online-title-img radius' src='https://ak.hycdn.cn/announce/images/20220125/e11f6c95958d685bbbedfd0fd799755a.JPG'> <div> <div><span class='online-blue'>故事集「阴云火花」</span>将于<span class='online-blue'>2月15号</span>开启</div> <div>开启时间为<span class='online-red'>周二16:00</span></div> <div>记得周一提前<span class='online-red'>刷剿灭，存理智液</span></div> <div>活动开启时，<span class='online-yellow'>快捷链接</span>更新<span class='online-blue'>作业视频</span> </div> <div>或者点击 <span class='online-blue'><drawer>这里</drawer></span> 快速跳转</div> </div> </div>",
        },
      ],
    };
  },
  methods: {
    test() {
      console.log(this.announcementForm.announcements[0].content);
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