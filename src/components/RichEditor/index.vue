<template>
  <div id="richtext" style="border: 1px solid #CCC;">
    <Toolbar
      style="border-bottom: 1px solid #CCC"
      :editor="editor"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="html"
      style=" overflow-y: hidden;height: 140px;"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onFocus="onFocus"
      @onBlur="onBlur"
    />
  </div>
</template>
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

export default {
    name: "RichEditor",
    components: { Editor, Toolbar },
    props: {
        value: {
            type: String,
            required: true,
        }
    }, // 通过props绑定父组件的value
    data() {
        return {
            editor: null,
            toolbarConfig: { toolbarKeys: [
                "bold",
                "italic",
                "underline",
                "through",
                "color",
                "bgColor",
                "insertLink",
                "clearStyle",
                "emotion",
                "undo",
                "redo"
            ] },
            html: "",
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'simple', // or 'default'
        };
    },
    watch: {
        value(val) {
            this.html = val;
        },
        html(val) {
            this.$emit('input',val);
        }
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        setTimeout(() => {
            this.html = this.value;
        }, 500);
    },
    beforeDestroy() {
        const editor = this.editor;
        if (editor == null) return;
        editor.destroy(); // 组件销毁时，及时销毁编辑器
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
            console.log(editor.getAllMenuKeys());
        },
        onFocus() { this.$emit('focus',''); },
        onBlur() { this.$emit('blur',''); },
        isEmpty() {
            return this.editor.isEmpty();
        }
    }
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
#richtext {

  :deep(.w-e-text-container) {
    margin-top: 8px;

    p {
      margin: 0;
    }

    .w-e-text-placeholder {
      top: -9px
    }
  }
}
</style>
