<template>
  <div>
    <div id="richtext" ref="richtext"></div>
  </div>
</template>
<script>
import wangEditor from "wangeditor";
import Tags from "./Tags/index";
export default {
  name: "RichEditor",
  props: ["value"], // 通过props绑定父组件的value
  data() {
    return {
      editor: "",
    };
  },
  methods: {
    initEditor() {
      const editor = new wangEditor(this.$refs.richtext);

      const tagsKey = "tagsKey";
      this.editor = editor;

      editor.config.height = 150;
      editor.config.zIndex = 1 ;
      editor.config.onchange = (newHtml) => {
        if (newHtml) {
          this.$emit("input", newHtml);
        }
      };

      // 配置工具栏
      editor.config.menus = [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "foreColor",
        "backColor",
        "link",
        "emoticon",
        "undo",
        "redo",
      ];
      // 配置文字和背景颜色
      editor.config.colors = [
        "#ffba4b",
        "#e03b3b",
        "#fdbf22",
        "#e4d64a",
        "#ffffff",
        "#000000",
        "#353535",
        "#795548",
      ];
      // 添加自定义按钮
      wangEditor.registerMenu(tagsKey, Tags);
      editor.config.menus = editor.config.menus.concat(tagsKey);

      editor.create();
    },
  },
  mounted() {
    this.initEditor();
    this.editor.txt.html(this.value);
  },
};
</script>
<style lang="less" scoped>
#richtext {
  /deep/ .w-e-text {
    margin-top: 8px;
    p {
      margin: 0;
    }
  }
}
</style>
