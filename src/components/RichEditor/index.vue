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
      style=" height: 140px;"
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
import { Boot } from '@wangeditor/editor';
import { DrawerBtn } from './Tags/DrawerBtn';
import { SettingBtn } from './Tags/SettingBtn';
import { withTag } from './Tags/tagInline';
import { ToDrawerHtmlConf, parseDrawerHtmlConf, renderDrawerConf } from './Tags/DrawerBtn/drawerConf';
import { ToSettingHtmlConf, parseSettingHtmlConf, renderSettingConf } from './Tags/SettingBtn/settingConf';

export default {
    name: "RichEditor",
    components: { Editor, Toolbar },
    props: {
        value: {
            type: String,
            required: true,
        },
        bgColor: {
            type: Boolean,
            default: true,
        },
        announcement:{
            type: Boolean,
            default: true,
        },
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
                "clearStyle",
                "insertLink",
                "emotion",
                "undo",
                "redo"
            ] },
            html: "",
            editorConfig: {
                placeholder: '请输入内容...',
                MENU_CONF: {
                    color: {
                        colors: [
                            "#e4d64a",
                            "#ffba4b",
                            "#fdbf22",
                            "#e03b3b",
                            "#ffffff",
                            "#000000",
                            "#353535",
                            "#795548",
                            "#8C3313",
                            "#D99559",
                            "#EAB58D",
                            "#DEBB95"
                        ]
                    },
                    bgColor: {
                        colors: [
                            "#e4d64a",
                            "#ffba4b",
                            "#fdbf22",
                            "#e03b3b",
                            "#ffffff",
                            "#000000",
                            "#353535",
                            "#795548",
                            "#8C3313",
                            "#D99559",
                            "#EAB58D",
                            "#DEBB95"
                        ]
                    }
                }
            },
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
    created() {
        if (!this.bgColor) {
            this.toolbarConfig.toolbarKeys = [
                "bold",
                "italic",
                "underline",
                "through",
                "color",
                "clearStyle",
                "insertLink",
                "emotion",
                "undo",
                "redo"
            ];
        }
        if (this.announcement) {
            let drawer = Math.random().toString(36).slice(-8);
            let setting = Math.random().toString(36).slice(-8);
            const drawerConf = {
                key: drawer, // 定义 menu key ：要保证唯一、不重复（重要）
                factory() {
                    return new DrawerBtn();
                },
            };
            const settingConf = {
                key: setting, // 定义 menu key ：要保证唯一、不重复（重要）
                factory() {
                    return new SettingBtn();
                },
            };

            const module = {
                menus: [drawerConf, settingConf], // 菜单
                editorPlugin: withTag, // 插件
                renderElems: [renderDrawerConf, renderSettingConf], // renderElem
                elemsToHtml: [ToDrawerHtmlConf, ToSettingHtmlConf], // elemToHtml
                parseElemsHtml: [parseDrawerHtmlConf, parseSettingHtmlConf] // parseElemHtml
            };

            Boot.registerModule(module);
            this.toolbarConfig.insertKeys = {
                index: 9, // 插入的位置，基于当前的 toolbarKeys
                keys: [drawer, setting]
            };
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
        },
        onFocus() { this.$emit('focus',''); },
        onBlur() {
            // 删除富文本最后的换行
            this.html=this.html.replace(/(<p><br><\/p>)*$/g,'');

            this.$emit('blur','');
        },
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

    .w-e-modal {
      top: 0 !important;
      bottom: auto !important;

      .babel-container {

        span {
          line-height: 24px;
        }
      }
    }
  }
}
</style>
