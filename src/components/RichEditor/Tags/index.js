import E from "wangeditor";
import isActive from "./is-active";

const { $, BtnMenu } = E


class Bold extends BtnMenu {
    constructor(editor) {
        const $elem = $(
            `<div class="w-e-menu" data-title="自定义标签">
                               <i class="el-icon-files"></i>
                           </div>`
        )
        super($elem, editor)
    }

    /**
     * 点击事件
     */
    clickHandler() {
        const editor = this.editor
        const selectionText = editor.selection.getSelectionText()

        if (this.isActive) {
            // 选中整个链接
            let $selectedTag = this.selectLinkElem()
            // 用文本替换链接
            const selectionText = $selectedTag.text()
            editor.cmd.do('insertHTML', '<span>' + selectionText + '</span>')
        } else {
            // 菜单未被激活，说明选区不在链接里
            if (editor.selection.isSelectionEmpty()) {
                return
            } else {
                // 行内代码处理 选中了非代码内容
                this.insertLineTag(selectionText)
            }
        }
    }

    selectLinkElem() {
        let editor = this.editor
        if (!isActive(editor)) return

        const $tagElem = editor.selection.getSelectionContainerElem()
        if (!$tagElem) return
        editor.selection.createRangeByElem($tagElem)
        editor.selection.restoreSelection()

        return $tagElem // 赋值给函数内全局变量
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
     * 尝试修改菜单激活状态
     */
    tryChangeActive() {
        const editor = this.editor
        if (isActive(editor)) {
            this.active()
        } else {
            this.unActive()
        }
    }
}

export default Bold