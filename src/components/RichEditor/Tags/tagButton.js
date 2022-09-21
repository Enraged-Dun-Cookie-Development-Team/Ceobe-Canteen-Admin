import { SlateEditor, SlateElement, SlateRange } from '@wangeditor/editor';
import { SlateTransforms } from '@wangeditor/editor';
export class tagButton {
    constructor(title, icon, tagType) {
        this.title = title; // 自定义菜单标题
        this.iconSvg = icon;
        this.tag = 'button';
        this.tagType = tagType;
    }

    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(editor) {
        return editor.getSelectionText();
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(editor) {
        const [nodeEntries] = SlateEditor.nodes(editor, {
            match: n =>
                !SlateEditor.isEditor(n) && SlateElement.isElement(n) && n.type === this.tagType,
        });
        return !!nodeEntries;
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled() {
        return false;
    }

    unwrapElement(editor) {
        SlateTransforms.unwrapNodes(editor, {
            match: n =>
                !SlateEditor.isEditor(n) && SlateElement.isElement(n) && n.type === this.tagType,
        });
    }

    wrapElement(editor) {
        if (this.isActive(editor)) {
            this.unwrapElement(editor);
        }

        const { selection } = editor;
        const isCollapsed = selection && SlateRange.isCollapsed(selection);
        if (isCollapsed) return;

        const drawer = {
            type: this.tagType,
            children: [],
        };

        SlateTransforms.wrapNodes(editor, drawer, { split: true });
        SlateTransforms.collapse(editor, { edge: 'end' });
    }

    // 点击菜单时触发的函数
    exec(editor, value) {
        // editor.dangerouslyInsertHtml("<drawer>"+value+"</drawer>");
        // editor.addMark('drawer', true);
        if (this.isActive(editor)) {
            this.unwrapElement(editor);
        } else {
            this.wrapElement(editor, value);
        }
    }
}