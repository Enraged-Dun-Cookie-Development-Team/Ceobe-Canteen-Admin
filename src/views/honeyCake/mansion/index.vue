<template>
  <div id="mainWindow">
    <h3>大厦信息</h3>
    <el-form
      ref="infoForm"
      :model="mansionForm.info"
      :rules="mansionRules"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="mansionForm.info.title"
          placeholder="请输入标题"
          class="width30"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="大厦号" prop="id">
        <el-input
          v-model="mansionForm.info.id"
          placeholder="请输入大厦号"
          class="width30"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="mansionForm.info.description"
          placeholder="请输入描述"
          class="width30"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="CV号" prop="cvlink">
        <el-input
          v-model="mansionForm.info.cvlink"
          placeholder="请输入CV号"
          class="width30"
        >
          <template slot="prepend">CV</template>
        </el-input>
      </el-form-item>
      <el-form-item label="自信度" prop="fraction">
        <el-slider
          class="fraction-slider"
          v-model="mansionForm.info.fraction"
          :min="1"
          :max="5"
          :step="1"
        >
        </el-slider>
      </el-form-item>
    </el-form>
    <h3>每日信息</h3>
    <el-collapse
      v-for="(item, index) in mansionForm.daily"
      :key="index"
      v-model="activeName"
      accordion
    >
      <el-collapse-item :name="index" class="btn">
        <template slot="title">
          <div class="collapse-header">
            <div>
              {{
                item.datetime +
                (setAll[index].set ? "  (已完成) " : "  (未完成) ")
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
            :ref="'dailyForm' + index"
            :model="mansionForm.daily[index]"
            :rules="mansionRules"
            class="item-list"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="日期" prop="datetime">
              <el-date-picker
                v-model="item.datetime"
                type="datetime"
                placeholder="选择开始显示日期时间"
                align="center"
                :picker-options="pickerStarTime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="动态" prop="content">
              <rich-editor
                class="rich-editor"
                :ref="'richtext' + index"
                v-model="item.content"
                :key="index"
              />
            </el-form-item>
            <el-form-item label="预测详细" prop="content">
              <div
                class="forecast-info"
                :key="i"
                v-for="(detail, i) in item.info"
              >
                <el-input
                  v-model="detail.forecast"
                  placeholder="请输入预测信息"
                  class="width50"
                >
                </el-input>
                <el-radio-group
                  class="radio-group"
                  v-model="detail.isTrue"
                  fill="#ffba4b"
                >
                  <el-radio-button label="yet">还没到</el-radio-button>
                  <el-radio-button label="true">正确</el-radio-button>
                  <el-radio-button label="false">错误</el-radio-button>
                </el-radio-group>
                <el-button
                  @click.stop="addForecast(index, i)"
                  icon="el-icon-plus"
                  class="btn-editor btn-addForecast"
                ></el-button>
                <el-button
                  @click.stop="removeForecast(index, i)"
                  icon="el-icon-delete"
                  class="btn-editor btn-deleteForecast"
                ></el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </el-collapse>
    <div class="id-option">
      <el-select
        label="大厦号"
        v-model="mansionForm.info.id"
        placeholder="请选择大厦号"
      >
        <el-option
          v-for="item in IdOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        @click.stop="addMansion()"
        icon="el-icon-plus"
        class="btn-editor btn-addForecast"
      ></el-button>
      <el-button
        @click.stop="removeMansion()"
        icon="el-icon-delete"
        class="btn-editor btn-deleteForecast"
      ></el-button>
    </div>

    <form-button @submit="submitMansionList()"></form-button>
  </div>
</template>
<script>
import TimeUtil from "@/utils/time";
import RichEditor from "@/components/RichEditor";
import FormButton from "@/components/FormButton";

export default {
  components: { RichEditor, FormButton },
  data() {
    return {
      activeIndex: 0,
      activeName: 0,
      IdOptions: [
        {
          value: "",
          label: "",
        },
      ],
      mansionForm: {
        info: {
          title: "",
          id: "",
          description: "",
          cvlink: "",
          fraction: "",
        },
        daily: [
          {
            datetime: "",
            info: [
              {
                forecast: "",
                isTrue: "yet",
              },
              {
                forecast: "",
                isTrue: "true",
              },
            ],
            content: "",
          },
        ],
      },
      setAll: [
        {
          set: false,
        },
      ],
      mansionRules: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    // 提交表单到服务器
    submitMansionList() {},
    // 删除视频
    removeItem(item) {
      let index = this.mansionForm.daily.indexOf(item);
      if (this.mansionForm.daily.length > 1) {
        if (index !== -1) {
          this.mansionForm.daily.splice(index, 1);
          this.setAll.splice(index, 1);
        }
      }
    },
    // 添加单次资源
    addItem(index) {
      this.mansionForm.daily.splice(index + 1, 0, {
        datetime: "",
        info: [
          {
            forecast: "",
            isTrue: "",
          },
        ],
        content: "",
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
  },
};
</script>
<style lang="less" scoped>
#mainWindow {
  .fraction-slider {
    width: 20%;
  }
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
    .forecast-info {
      margin-bottom: 10px;
      /deep/.radio-group {
        margin-left: 15px;

        .el-radio-button__inner:hover {
          color: #ffba4b;
        }
        .is-active {
          .el-radio-button__inner:hover {
            color: #ffffff;
          }
        }
      }
    }
  }

  .btn-addForecast {
    margin-left: 20px;
    color: white;
    background-color: #67c23a;
  }
  .btn-deleteForecast {
    color: white;
    background-color: #f56c6c;
  }

  .width30 {
    width: 30%;
  }
  .width50 {
    width: 50%;
  }

  .id-option {
    position: fixed;
    bottom: 20px;
    left: 250px;
  }
}
</style>
