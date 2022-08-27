<template>
  <div id="mainWindow">
    <h3>大厦信息</h3>
    <el-form ref="infoForm" :model="mansionForm" :rules="mansionRules" label-width="100px" label-position="left">
      <el-form-item label="大厦号" prop="id">
        <el-input v-model="mansionForm.id" placeholder="请输入大厦号" class="width30" @blur="updateId(mansionForm.id)">
        </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="mansionForm.description" placeholder="请输入描述" class="width30">
        </el-input>
      </el-form-item>
      <el-form-item label="CV号" prop="cv_link">
        <el-input v-model="mansionForm.cv_link" placeholder="请输入CV号" class="width30">
          <template slot="prepend">CV</template>
        </el-input>
      </el-form-item>
      <el-form-item label="自信度" prop="fraction">
        <el-slider class="fraction-slider" v-model="mansionForm.fraction" :min="1" :max="5" :step="1">
        </el-slider>
      </el-form-item>
    </el-form>
    <h3>每日信息</h3>
    <draggable tag="el-collapse" handle=".collapse-header" :list="mansionForm.daily"
      :component-data="collapseComponentData" @start="draggStart" @end="draggEnd">
      <el-collapse-item v-for="(item, index) in mansionForm.daily" :key="index" :name="index" class="btn">
        <template slot="title">
          <div class="collapse-header">
            <div>
              {{
                  item.datetime +
                  (setAll[index].set ? " (已完成) " : " (未完成) ")
              }}
            </div>
            <div>
              <el-button @click.stop="addItem(index)" icon="el-icon-plus" class="btn-editor btn-add" round></el-button>
              <el-button @click.stop="removeItem(item)" icon="el-icon-delete" class="btn-editor btn-delete" round>
              </el-button>
            </div>
          </div>
        </template>
        <el-card class="single-card">
          <el-form :ref="'dailyForm' + index" :model="mansionForm.daily[index]" :rules="mansionRules" class="item-list"
            label-width="100px" label-position="left">
            <el-form-item label="日期" prop="datetime">
              <el-date-picker v-model="item.datetime" type="datetime" placeholder="选择开始显示日期时间" align="center"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd" @blur="checkForm(index)" />
            </el-form-item>
            <el-form-item label="动态" prop="content">
              <rich-editor class="rich-editor" :ref="'richtext' + index" v-model="item.content" :key="index"
                @blur="refreshRichText(index)" @focus="activeIndex = index" />
            </el-form-item>
            <el-form-item label="预测详细" prop="forecast">
              <div class="forecast-info" :key="i" v-for="(detail, i) in item.info">
                <el-input v-model="detail.forecast" placeholder="请输入预测信息" class="width50" @blur="checkForm(index)"
                  @focus="activeIndex = index">
                </el-input>
                <el-radio-group class="radio-group" v-model="detail.forecast_status" fill="#ffba4b"
                  text-color="#ffffff">
                  <el-radio-button label="unknown">还没到</el-radio-button>
                  <el-radio-button label="true">正确</el-radio-button>
                  <el-radio-button label="false">错误</el-radio-button>
                </el-radio-group>
                <el-button @click.stop="addForecast(index, i)" icon="el-icon-plus" class="btn-editor btn-addForecast">
                </el-button>
                <el-button @click.stop="removeForecast(index, i)" icon="el-icon-delete"
                  class="btn-editor btn-deleteForecast"></el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </draggable>
    <div class="id-option">
      <el-select label="大厦号" v-model="selectIdShow" placeholder="请选择大厦号" @change="changeId">
        <el-option v-for="item in idOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button @click.stop="addMansion()" icon="el-icon-plus" class="btn-editor btn-addForecast"></el-button>
      <el-button @click.stop="deleteMansion()" icon="el-icon-delete" class="btn-editor btn-deleteForecast"></el-button>
    </div>

    <form-button @submit="submitMansionList()"></form-button>
  </div>
</template>
<script>
import TimeUtil from "@/utils/time";
import RichEditor from "@/components/RichEditor";
import FormButton from "@/components/FormButton";
import draggable from "vuedraggable";

export default {
  components: { RichEditor, FormButton, draggable },
  data() {
    let regex = /(<([^>]+)>)/ig
    let validCV = (rule, value, callback) => {
      let pattern = /^(cv)?\d*$/;
      if (!pattern.test(value)) {
        callback(new Error("你这cv号好像不太对诶,说不定是cv的大小写原因？"));
      } else {
        callback();
      }
    };
    const shouldHasForecastOrContent = (peerFieldName, rule, value, callback) => {
      let hasForecastOrContent = false;
      const daily = this.mansionForm.daily[this.activeIndex];
      for (const item of daily.info) {
        if (item.forecast !== "") {
          hasForecastOrContent = true;
          break;
        }
      }
      if (!hasForecastOrContent) {
        let result = daily.content.replace(regex, "");
        if (result.trim() !== "") hasForecastOrContent = true;
      }
      const form = this.$refs['dailyForm' + this.activeIndex][0];
      const peerField = form.fields.find(it => it.prop === peerFieldName);
      const errMsg = '预测内容和动态选一个吧';
      if (!hasForecastOrContent) {
        callback(new Error(errMsg));
        if (peerField.validateMessage !== errMsg) {
          form.validateField(peerFieldName);
        }
      } else {
        callback();
        if (peerField.validateMessage === errMsg) {
          form.validateField(peerFieldName);
        }
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
      regex,
      upload: false, // 当次表单删除完成
      activeIndex: 0,
      idOptions: [
        {
          value: "",
          label: "",
        },
      ],
      selectIdShow: "",
      idBefore: "",
      OldMansionForm: {},
      mansionForm: {},
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
        cv_link: [
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
        content: [
          {
            validator: shouldHasForecastOrContent.bind(this, 'forecast'),
            trigger: "blur",
          },
        ],
        forecast: [
          {
            validator: shouldHasForecastOrContent.bind(this, 'content'),
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
    // 几组默认值
    emptyForecastItem() { return { forecast: "", forecast_status: "unknown" }; },
    emptyMansion() {
      return {
        id: "",
        description: "",
        cv_link: "",
        fraction: 1,
        daily: [
          {
            datetime: "",
            info: [
              {
                forecast: "",
                forecast_status: "unknown",
              },
            ],
            content: "",
          },
        ],
      }
    },


    init() {
      // 从服务器获取ID数组
      this.$store
        .dispatch("mansion/getIdArray")
        .then((response) => {
          // 初始化idOptions
          this.idOptions = [
            {
              value: "",
              label: "",
            },
          ];
          // ID数组写入idOption
          response.data.forEach((item, index) => {
            if (index == 0) {
              this.idOptions[index]["value"] = item;
              this.idOptions[index]["label"] = item;
            } else {
              this.idOptions.splice(index, 0, {
                value: item,
                label: item,
              });
            }
          });
          // 获取IDoption最后一位写入showid
          let mansion_id;
          if (this.selectIdShow != "") {
            mansion_id = this.selectIdShow
          } else {
            mansion_id = this.idOptions[this.idOptions.length - 1].value;
          }
          this.$store
            .dispatch("mansion/getMansion", mansion_id)
            .then((response) => {
              // 更新大厦信息
              this.updateMansionInfo(response);
              this.$message({
                showClose: true,
                message: "获取大厦成功",
                type: "success",
              });
            })
            .catch(() => {
              this.$message({
                showClose: true,
                message: "获取大厦失败",
                type: "error",
              });
              this.initMansion();
            });
        })
        .catch(() => {
          this.initMansion();
          this.updateRichtextHtml();
        });
    },
    initMansion() {
      let mansion = this.emptyMansion();
      this.idBefore = "";
      this.OldMansionForm = JSON.parse(JSON.stringify(mansion));
      this.mansionForm = JSON.parse(JSON.stringify(mansion));
      this.setAll = [{ set: false }];
      this.selectIdShow = "";
      this.upload = false;
      this.updateRichtextHtml();
    },
    refreshRichText(index) {
      if (this.$refs['dailyForm' + index] && this.$refs['dailyForm' + index].length > 0) {
        this.$refs['dailyForm' + index][0].validateField('content');
      }
      this.checkForm(index)
    },
    // 提交表单到服务器
    submitMansionList() {
      this.updateRichtextHtml();
      if (!this.checkTime()) {
        this.$message({
          showClose: true,
          message: "注意一下时间要顺序噢",
          type: "warning",
        });
        return;
      }
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
        if (
          JSON.stringify(this.OldMansionForm) ==
          JSON.stringify(this.mansionForm)
        ) {
          this.$message({
            showClose: true,
            message: "已经上传过了，不要重复上传噢",
            type: "warning",
          });
          return;
        }
        let mansionList = this.checkBeforeSubmit();
        this.$store
          .dispatch("mansion/uploadMansion", {
            mansionList: mansionList,
            idBefore: this.idBefore,
          })
          .then(() => {
            this.upload = true;
            this.OldMansionForm = JSON.parse(JSON.stringify(this.mansionForm));
            this.idBefore = this.mansionForm.id;
            this.$message({
              showClose: true,
              message: "上传大厦成功",
              type: "success",
            });
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: "上传大厦失败",
              type: "error",
            });
          })
          .finally(() => {
            this.init();
          });
      }
    },

    // 上传前的最后检查与改变
    checkBeforeSubmit() {
      let mansionList = {};
      mansionList = JSON.parse(JSON.stringify(this.mansionForm));
      if (
        mansionList.cv_link.substring(0, 2) !== "cv" &&
        mansionList.cv_link !== ""
      ) {
        mansionList.cv_link = "cv" + mansionList.cv_link;
      }
      mansionList.daily.forEach((item, index) => {
        let result = item.content.replace(this.regex, "");
        if (result.trim() === "") item.content = "";

        item.info = item.info.filter(it => !!it.forecast)
      });
      return mansionList
    },

    // 增删单日信息
    addItem(index) {
      let newDatetime = "";
      // 新加一日信息默认增一天
      if (index != -1) {
        if (this.mansionForm.daily[index].datetime != "") {
          newDatetime = TimeUtil.format(
            TimeUtil.passSecondTime(
              new Date(this.mansionForm.daily[index].datetime),
              60 * 60 * 24
            ),
            "yyyy-MM-dd"
          );
        }
      }

      this.mansionForm.daily.splice(index + 1, 0, {
        datetime: newDatetime,
        info: [
          this.emptyForecastItem()
        ],
        content: "",
      });
      this.setAll.splice(index + 1, 0, {
        set: false,
      });
      this.updateRichtextHtml();
    },
    removeItem(item) {
      let index = this.mansionForm.daily.indexOf(item);
      if (this.mansionForm.daily.length > 1) {
        if (index !== -1) {
          this.mansionForm.daily.splice(index, 1);
          this.setAll.splice(index, 1);
        }
      } else {
        this.mansionForm.daily = [
          {
            datetime: "",
            info: [
              this.emptyForecastItem()
            ],
            content: "",
          },
        ];
        this.setAll = [{ set: false }];
      }
      this.updateRichtextHtml();
    },

    // 预测信息增加和删除
    addForecast(index, i) {
      this.mansionForm.daily[index].info.splice(i + 1, 0, {
        forecast: "",
        forecast_status: "unknown",
      });
      this.setAll[index]["set"] = false;
    },
    removeForecast(index, i) {
      if (this.mansionForm.daily[index].info.length > 1) {
        this.mansionForm.daily[index].info.splice(i, 1);
        this.checkForm(index);
      } else {
        this.mansionForm.daily[index].info = [
          this.emptyForecastItem(),
        ];
        this.checkForm(index);
      }
    },

    // 增删大厦
    addMansion() {
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
        let mansion = this.emptyMansion();
        this.idBefore = "";
        this.OldMansionForm = JSON.parse(JSON.stringify(mansion));
        this.mansionForm = JSON.parse(JSON.stringify(mansion));
        this.setAll = [{ set: false }];
        this.idOptions.push({
          value: "",
          label: "",
        });
        this.selectIdShow = "";
        this.upload = false;
        this.updateRichtextHtml();
      } else {
        this.$message({
          showClose: true,
          message: "有大厦缺少大厦号，请先填写补全",
          type: "warning",
        });
      }
    },
    deleteMansion() {
      // 根据id号上传服务器删除大厦
      if (this.idBefore !== "") {
        this.$store
          .dispatch("mansion/deleteMansion", this.idBefore)
          .then(() => {
            this.removeMansion();
          })
          .catch(() => {
            this.$message({
              showClose: true,
              message: "删除大厦失败",
              type: "error",
            });
          });
      } else {
        this.removeMansion();
      }
    },

    removeMansion() {
      //  根据idBefore删除对应的IdOption数组元素
      let idIndex = -1;

      this.idOptions.forEach((item, index) => {
        if (this.idBefore == item.value) {
          idIndex = index;
        }
      });
      this.idOptions.splice(idIndex, 1);
      if (this.idOptions.length == 0) {
        this.initMansion();
        this.idOptions.push({
          value: "",
          label: "",
        });
        return;
      }

      //  根据IdOption最后一个的value去请求对应大厦信息
      let newId = this.idOptions[this.idOptions.length - 1].value;
      this.$store
        .dispatch("mansion/getMansion", newId)
        .then((response) => {
          // 更新大厦信息
          this.updateMansionInfo(response);
          this.$message({
            showClose: true,
            message: "获取大厦成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: "获取大厦失败",
            type: "error",
          });
        });
    },

    // 获取服务器消息后更新大厦信息
    updateMansionInfo(response) {
      this.setAll = [{ set: false }];
      response.data.daily.map((item, index) => {
        if (index == 0) {
          this.setAll[index]["set"] = true;
        } else {
          this.setAll.splice(index, 0, {
            set: true,
          });
        }
      });
      this.idBefore = response.data.id;
      this.OldMansionForm = JSON.parse(JSON.stringify(response.data));
      this.OldMansionForm.daily.forEach((item, _) => {
        if (item.info.length == 0) {
          item.info.push(this.emptyForecastItem());
        }
      });
      this.mansionForm = JSON.parse(JSON.stringify(this.OldMansionForm));
      this.selectIdShow = this.mansionForm.id;
      this.upload = true;
      this.updateRichtextHtml();
    },

    updateRichtextHtml() {
      setTimeout(() => {
        this.mansionForm.daily.forEach((item, index) => {
          this.$refs["richtext" + index][0].updateHtml();
        });
      }, 500);
    },

    // 更新id值
    updateId(id) {
      let repetition = false;
      let idIndex = -1;
      this.idOptions.forEach((item, index) => {
        if (id == item.value && this.selectIdShow != item.value) {
          repetition = true;
        }
        if (this.idBefore == item.value) {
          idIndex = index;
        }
      });
      if (!repetition) {
        if (id.indexOf(".") == -1) {
          id += ".0";
          this.mansionForm.id = id;
        }
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
      if (!complete) {
        let result = this.mansionForm.daily[index].content.replace(this.regex, "");
        if (result.trim() !== "") complete = true;
      }
      if (complete) {
        this.setAll[index]["set"] = true;
      } else {
        this.setAll[index]["set"] = false;
      }
    },

    // 切换id
    changeId() {
      let newId = this.selectIdShow;
      this.$store
        .dispatch("mansion/getMansion", newId)
        .then((response) => {
          // 更新大厦信息
          this.updateMansionInfo(response);
          this.$message({
            showClose: true,
            message: "获取大厦成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: "获取大厦失败",
            type: "error",
          });
        });
    },

    checkTime() {
      let beforeTime;
      for (let i = 0; i < this.mansionForm.daily.length; i++) {
        if (beforeTime && new Date(Date.parse(beforeTime))  >= new Date(Date.parse(this.mansionForm.daily[i].datetime))) {
          return false;
        }
        beforeTime = this.mansionForm.daily[i].datetime;
      }
      return true;
    },

    // 拖拽表单
    inputChanged(val) {
      this.collapseProps.value = val;
    },
    draggStart(event) {
      this.collapseProps.value = ""; 
    },
    draggEnd() {
      this.updateRichtextHtml();
      this.mansionForm.daily.forEach((_, index) => {
        this.checkForm(index);
      })
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
  }

  .btn-add {
    color: white;
    background-color: #67c23a;
  }

  .btn-delete {
    color: white;
    background-color: #f56c6c;
  }

  .single-card {
    margin: 10px;

    .forecast-info {
      margin-bottom: 10px;

      /deep/.radio-group {
        margin-left: 15px;

        .el-radio-button__orig-radio:checked+.el-radio-button__inner {
          background-color: #ffba4b;
          border-color: #ffba4b;
          box-shadow: -1px 0 0 0 #ffba4b;
        }

        .el-radio-button__inner:hover {
          color: #ffba4b !important;
        }

        .is-active {
          .el-radio-button__inner:hover {
            color: #ffffff !important;
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
