import E from "wangeditor";
import isActive from "./is-active";
import { createPanelConf } from "./create-panel-conf";

const { $, PanelMenu, Panel, BtnMenu } = E

// class Tags extends PanelMenu {
//     constructor(editor) {
//         const $elem = E.$(
//             `<div class="w-e-menu" data-title="自定义标签">
//                   <i class="el-icon-files"></i>
//               </div>`
//         )
//         super($elem, editor)
//     }

//     // 菜单点击事件
//     clickHandler() {
//         // 做任何你想做的事情
//         // 可参考【常用 API】文档，来操作编辑器
//     }

//     // 菜单是否被激活
//     tryChangeActive() {
//         const editor = this.editor
//         if (isActive(editor)) {
//             this.active()
//         } else {
//             this.unActive()
//         }
//     }
// }

// export default Tags

/**
 * @description 加粗
 * @author wangfupeng
 */

//  import BtnMenu from '../menu-constructors/BtnMenu'
//  import $ from '../../utils/dom-core'
//  import Editor from '../../editor/index'
//  import { MenuActive } from '../menu-constructors/Menu'

class Bold extends PanelMenu {
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
                // 选区是空的，未选中内容
                this.createPanel('', '')
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
     * 创建 panel
     * @param text 代码文本
     */
    createPanel(text) {
        const conf = createPanelConf(this.editor, text)
        const panel = new Panel(this, conf)
        panel.create()
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