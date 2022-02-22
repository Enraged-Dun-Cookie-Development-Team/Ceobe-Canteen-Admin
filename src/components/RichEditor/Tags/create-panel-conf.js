
/**
 * @description link 菜单 panel tab 配置
 * @author wangfupeng
 */
import E from "wangeditor";

const { $ } = E

export function createPanelConf(editor, text) {
    function getRandom(prefix = '') {
        return prefix + Math.random().toString().slice(2)
    }

    // panel 中需要用到的id
    const inputTextId = getRandom('input-text')
    const btnOkId = getRandom('btn-ok')

    /**
     * 插入标签
     * @param text 文字
     */
    function insertTag(text) {
        // 选区未处于链接中，直接插入即可
        editor.cmd.do('insertHTML', `<drawer style="color: #dd558a;">${text}</drawer>`)
    }

    const conf = {
        width: 300,
        height: 0,

        // panel 中可包含多个 tab
        tabs: [
            {
                // tab 的标题
                title: editor.i18next.t('menus.panelMenus.link.标签'),
                // 模板
                tpl: `<div>
                        <input
                            id="${inputTextId}"
                            type="text"
                            class="block"
                            value="${text}"
                            placeholder="${editor.i18next.t('menus.panelMenus.link.标签文字')}"/>
                        </td>
                        <div class="w-e-button-container">
                            <button type="button" id="${btnOkId}" class="right">
                                ${editor.i18next.t('插入')}
                            </button>
                        </div>
                    </div>`,
                // 事件绑定
                events: [
                    // 插入标记
                    {
                        selector: '#' + btnOkId,
                        type: 'click',
                        fn: () => {
                            // 获得填写的文字
                            const $text = $('#' + inputTextId)
                            let text = $text.val().trim()

                            // 文本为空，则不插入
                            if (!text) return
                            insertTag(text)

                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        },
                    },
                ],
            }, // tab end
        ], // tabs end
    }

    return conf
}