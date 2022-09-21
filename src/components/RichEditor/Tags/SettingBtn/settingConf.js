import { parseHtml } from "../parseHtml";
import { toHtml } from "../toHtml";
import { renderEditor } from "../renderEditor";

const tagType = "setting";
const color = "#C055DD";

const ToSettingHtmlConf = {
    type: tagType,
    elemToHtml: (elem, childrenHtml) => {return toHtml(elem, childrenHtml, tagType);},
};

const parseSettingHtmlConf = {
    selector: tagType, // CSS 选择器，匹配特定的 HTML 标签
    parseElemHtml: (domElem, children, editor)=>{return  parseHtml(domElem, children, editor, tagType);},
};

const renderSettingConf = {
    type: tagType,
    renderElem: (elem, children, editor) => {return renderEditor(elem, children, editor, tagType, color);},
};

export { ToSettingHtmlConf, parseSettingHtmlConf, renderSettingConf };