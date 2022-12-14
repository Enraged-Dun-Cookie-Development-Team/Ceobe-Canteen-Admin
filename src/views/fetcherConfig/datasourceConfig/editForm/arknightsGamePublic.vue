<template>
  <el-form
    ref="configForm"
    :model="config"
    label-position="right" label-width="120px"
    :rules="configRules"
  >
    <el-form-item label="客户端平台:" prop="platform">
      <el-select
        v-model="config.platform"
        placeholder="请选择"
        size="small"
        :disabled="!create"
      >
        <el-option
          v-for="item in platformOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @blur="fillPlatform"
        />
      </el-select>
    </el-form-item>
    <request-options />
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click="complete"
      >
        {{ create ? "创建":"更新" }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import RequestOptions from "../requestOptions.vue";
export default {
    name: "ArknightsGamePublic",
    components: { RequestOptions },
    data() {
        return {
            platformOptions: [
                {
                    label: "",
                    value: "Android"
                },
                {
                    label: "",
                    value: "IOS"
                },
                {
                    label: "",
                    value: "Bilibili"
                },
            ],
            config: {
                platform: "Android"
            },
            configRules: {
                platform: {
                    required: true, message: "请选择平台噢～", trigger: "blur"
                },
            },
            create: true,
        };
    },
    methods: {
        open(create, config) {
            this.create = create;
            this.config = JSON.parse(JSON.stringify(config));
        },
        complete() {
            let allPass = true;
            this.$refs["configForm"].validate((valid) => {
                if (!valid) {
                    allPass = false;
                    return;
                }
            });
            if (allPass) {
                this.$emit("complete", this.config);
            }
        }
    }
};
</script>