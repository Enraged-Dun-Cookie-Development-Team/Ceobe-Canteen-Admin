import E from "wangeditor";

const { $, BtnMenu } = E

class selfBtn extends BtnMenu {
    constructor(editor, mode) {
        let icon = "el-icon-files";
        let title = "自定义标签";
        if (mode === 'drawer') {
            icon = 'el-icon-files';
            title = "二级菜单"
        } else if (mode === 'setting') {
            icon = 'el-icon-setting';
            title = "进入设置"
        }
        const $elem = $(
            `<div class="w-e-menu" data-title="${title}">
                               <i class="${icon}"></i>
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

        if (this.isActive(editor)) {
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
        if (!this.isActive(editor)) return

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
        console.log("insertLineTag:该功能还为实现")
    }

    /**
     * 尝试修改菜单激活状态
     */
    tryChangeActive() {
        const editor = this.editor
        if (this.isActive(editor)) {
            this.active()
        } else {
            this.unActive()
        }
    }

    /**
     * @description 检查选区是否在链接中，即菜单是否应该 active
     */

     isActive(editor) {
        console.log("isActive:该功能还为实现")
    }
}

export default selfBtn