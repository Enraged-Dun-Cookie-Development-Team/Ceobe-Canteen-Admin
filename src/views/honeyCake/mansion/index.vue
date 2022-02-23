<template>
  <div id="mainWindow">
    <h3>大厦信息</h3>
    <el-form
      ref="infoForm"
      :model="mansionForm.imansionInfo"
      :rules="mansionRules"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="大厦号" prop="id">
        <el-input
          v-model="mansionForm.imansionInfo.id"
          placeholder="请输入大厦号"
          class="width30"
          @blur="updateId(mansionForm.imansionInfo.id)"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="mansionForm.imansionInfo.description"
          placeholder="请输入描述"
          class="width30"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="CV号" prop="cvlink">
        <el-input
          v-model="mansionForm.imansionInfo.cvlink"
          placeholder="请输入CV号"
          class="width30"
        >
          <template slot="prepend">CV</template>
        </el-input>
      </el-form-item>
      <el-form-item label="自信度" prop="fraction">
        <el-slider
          class="fraction-slider"
          v-model="mansionForm.imansionInfo.fraction"
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
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @blur="checkForm(index)"
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
            <el-form-item label="预测详细" prop="forecast">
              <div
                class="forecast-info"
                :key="i"
                v-for="(detail, i) in item.info"
              >
                <el-input
                  v-model="detail.forecast"
                  placeholder="请输入预测信息"
                  class="width50"
                  @blur="checkForm(index)"
                  @focus="activeIndex = index"
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
        v-model="selectIdShow"
        placeholder="请选择大厦号"
      >
        <el-option
          v-for="item in idOptions"
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
    let validCV = (rule, value, callback) => {
      let pattern = /^(cv)?\d*$/i;
      if (!pattern.test(value)) {
        callback(new Error("你这cv号好像不太对诶,说不定是cv的大小写原因？"));
      } else {
        callback();
      }
    };
    let forecastAllSet = (rule, value, callback) => {
      let allSet = true;
      this.mansionForm.daily[this.activeIndex].info.forEach((item, index) => {
        if (item.forecast === "") {
          allSet = false;
        }
      });
      if (!allSet) {
        callback(new Error("预测内容呢内容呢"));
      }
    };
    return {
      upload: false, // 当次表单删除完成
      activeIndex: 0,
      activeName: 0,
      idOptions: [
        {
          value: "",
          label: "",
        },
      ],
      selectIdShow: "",
      OldMansionForm: {
        mansionInfo: {
          idBefore: "",
          id: "",
          description: "",
          cvlink: "",
          fraction: 1,
        },
        daily: [
          {
            datetime: "",
            info: [
              {
                forecast: "",
                isTrue: "yet",
              },
            ],
            content: "",
          },
        ],
      },
      mansionForm: {
        imansionInfo: {
          idBefore: "",
          id: "",
          description: "",
          cvlink: "",
          fraction: 1,
        },
        daily: [
          {
            datetime: "",
            info: [
              {
                forecast: "",
                isTrue: "yet",
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
      mansionRules: {
        id: [
          {
            required: true,
            message: "给个单独编号哦",
            trigger: "blur",
          },
        ],
        cvlink: [
          {
            validator: validCV,
            message: "你这cv号好像不太对诶,说不定是cv的大小写原因？",
            trigger: "blur",
          },
        ],
        datetime: [
          {
            required: true,
            message: "这是预测的哪天呀，偶不知道呀",
            trigger: "blur",
          },
        ],
        forecast: [
          {
            validator: forecastAllSet,
            message: "预测内容呢内容呢",
            trigger: "blur",
          },
          {
            required: true,
            message: "预测内容呢内容呢",
            trigger: "blur",
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
      // TODO: 从服务器获取ID数组
      //       ID数组写入IdOpeion
      //       获取IDoption最后一位写入showid
      //       通过showID请求服务器数据，并复制给两个form
      //       upload状态改为已上传
    },
    // 提交表单到服务器
    submitMansionList() {
      let allPass = true;
      this.$refs["infoForm"].validate((valid) => {
        if (valid) {
          this.mansionForm.daily.forEach((item, index) => {
            this.$refs["dailyForm" + index][0].validate((valid) => {
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
      // 上传表单到服务器
      if (allPass) {
        
        let mansionList = {};
        mansionList = JSON.parse(JSON.stringify(this.mansionForm));
        if (
          mansionList.imansionInfo.cvlink.substring(0, 2) !== "cv" &&
          mansionList.imansionInfo.cvlink.substring(0, 2) !== "CV"
        ) {
          mansionList.imansionInfo.cvlink =
            "cv" + mansionList.imansionInfo.cvlink;
        }

        this.upload = true;
        this.OldMansionForm = JSON.parse(JSON.stringify(this.mansionForm));
      }
    },

    // 增删单日信息
    addItem(index) {
      // 新加一日信息默认增一天
      let newDatetime = "";
      if (this.mansionForm.daily[index].datetime != "") {
        newDatetime = TimeUtil.format(
          TimeUtil.passSecondTime(
            new Date(this.mansionForm.daily[index].datetime),
            60 * 60 * 24
          ),
          "yyyy-MM-dd"
        );
      }
      this.mansionForm.daily.splice(index + 1, 0, {
        datetime: newDatetime,
        info: [
          {
            forecast: "",
            isTrue: "yet",
          },
        ],
        content: "",
      });
      this.setAll.splice(index + 1, 0, {
        set: false,
      });
    },
    removeItem(item) {
      let index = this.mansionForm.daily.indexOf(item);
      if (this.mansionForm.daily.length > 1) {
        if (index !== -1) {
          this.mansionForm.daily.splice(index, 1);
          this.setAll.splice(index, 1);
        }
      }
    },

    // 预测信息增加和删除
    addForecast(index, i) {
      this.mansionForm.daily[index].info.splice(i + 1, 0, {
        forecast: "",
        isTrue: "yet",
      });
      this.setAll[index]["set"] = false;
    },
    removeForecast(index, i) {
      this.mansionForm.daily[index].info.splice(i, 1);
      this.checkForm(index);
    },

    // 增删大厦
    addMansion() {
      debugger;
      if (
        JSON.stringify(this.OldMansionForm) !=
          JSON.stringify(this.mansionForm) ||
        !this.upload
      ) {
        this.$message({
          showClose: true,
          message: "要先上传这个大厦才能再盖噢",
          type: "warning",
        });
        return;
      }
      let empty = false;
      this.idOptions.forEach((item, index) => {
        if (item.label == "") {
          empty = true;
        }
      });
      if (!empty) {
        let mansion = {
          imansionInfo: {
            idBefore: "",
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
              ],
              content: "",
            },
          ],
        };
        this.OldMansionForm = JSON.parse(JSON.stringify(mansion));
        this.mansionForm = JSON.parse(JSON.stringify(mansion));
        this.idOptions.push({
          value: "",
          label: "",
        });
        this.selectIdShow = "";
        this.upload = false;
      } else {
        this.$message({
          showClose: true,
          message: "有大厦缺少大厦号，请先填写补全",
          type: "warning",
        });
      }
    },
    removeMansion() {
      // TODO: 根据id号上传服务器删除大厦
      //       根据showid删除对应的IdOption数组元素
      //       根据IdOption最后一个的value去请求对应大厦信息
      //       更新大厦信息
    },

    // 更新id值
    updateId(id) {
      let repetition = false;
      let idIndex = 0;
      this.idOptions.forEach((item, index) => {
        if (id == item.value && this.selectIdShow != item.value) {
          repetition = true;
        }
        if (this.mansionForm.imansionInfo.idBefore == item.value) {
          idIndex = index;
        }
      });
      if (!repetition) {
        this.idOptions[idIndex].value = id;
        this.idOptions[idIndex].label = id;
        this.selectIdShow = id;
      } else {
        this.$message({
          showClose: true,
          message: "重复id，请重新填写",
          type: "error",
        });
      }
    },

    // 检查表单有没有填完
    checkForm(index) {
      let complete = true;

      if (this.mansionForm.daily[index]["datetime"] === "") {
        complete = false;
      } else {
        for (let i in this.mansionForm.daily[index]["info"]) {
          if (
            this.mansionForm.daily[index].info[i].forecast == "" ||
            this.mansionForm.daily[index].info[i].forecast == null
          ) {
            complete = false;
            break;
          }
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
  /deep/ label {
    font-weight: 500;
  }
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
