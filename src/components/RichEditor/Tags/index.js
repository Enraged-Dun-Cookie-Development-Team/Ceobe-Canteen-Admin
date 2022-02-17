import E from "wangeditor";
import isActive from "./is-active";

const { $, PanelMenu, Panel } = E

class Tags extends PanelMenu {
    constructor(editor) {
        const $elem = E.$(
            `<div class="w-e-menu" data-title="自定义标签">
                  <i class="el-icon-files"></i>
              </div>`
        )
        super($elem, editor)
    }

    // 菜单点击事件
    clickHandler() {
        // 做任何你想做的事情
        // 可参考【常用 API】文档，来操作编辑器
    }

    // 菜单是否被激活
    tryChangeActive() {
        const editor = this.editor
        if (isActive(editor)) {
            this.active()
        } else {
            this.unActive()
        }
    }
}

export default Tags