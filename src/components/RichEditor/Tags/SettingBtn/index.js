import Tags from "../DrawerBtn/renderDrawer";
import E from "wangeditor";

const { $ } = E;

class SettingBtn extends Tags {
    constructor(editor) {
        super(editor, "setting");
    }

    /**
    * 插入行内代码
    * @param text
    * @return null
    */
    insertLineTag(text) {
        let editor = this.editor;
        // 行内代码处理
        let $code = $(`<setting>${text}</setting>`);
        editor.cmd.do('insertElem', $code);
        editor.selection.createRangeByElem($code, false);
        editor.selection.restoreSelection();
    }

    /**
     * @description 检查选区是否在链接中，即菜单是否应该 active
     */
    isActive(editor) {
        const $selectionELem = editor.selection.getSelectionContainerElem();
        if (!$selectionELem?.length) {
            return false;
        }
        if ($selectionELem.getNodeName() === "SETTING") {
            return true;
        } else {
            return false;
        }
    }
}
export default SettingBtn;