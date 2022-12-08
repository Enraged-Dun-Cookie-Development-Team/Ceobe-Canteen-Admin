<template>
  <el-form
    ref="configForm"
    :model="config"
    label-position="right" label-width="120px"
    :rules="configRules"
  >
    <el-form-item label="uid:" prop="uid">
      <el-input
        v-model="config.uid" placeholder="请输入uid"
        :disabled="!create"
      />
    </el-form-item>
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
export default {
    name: "BilibiliDynamic",
    data() {
        return {
            config: {
                uid: "",
            },
            configRules: {
                uid: {
                    required: true, message: "uid要填噢～", trigger: "blur"
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