import Tags from "../index"
import E from "wangeditor";

const { $ } = E

class DrawerBtN extends Tags {
    constructor(editor) {
        super(editor, "drawer")
    }

    /**
    * 插入行内代码
    * @param text
    * @return null
    */
     insertLineTag(text) {
        let editor = this.editor
        // 行内代码处理
        let $code = $(`<drawer>${text}</drawer>`)
        editor.cmd.do('insertElem', $code)
        editor.selection.createRangeByElem($code, false)
        editor.selection.restoreSelection()
    }

    /**
     * @description 检查选区是否在链接中，即菜单是否应该 active
     */
    isActive(editor) {
        const $selectionELem = editor.selection.getSelectionContainerElem()
        if (!$selectionELem?.length) {
            return false
        }
        if ($selectionELem.getNodeName() === "DRAWER") {
            return true
        } else {
            return false
        }
    }
}
export default DrawerBtN;