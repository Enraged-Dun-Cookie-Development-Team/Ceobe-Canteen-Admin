
function parseDrawerHtml(domElem, children) {
    const value = domElem.innerHTML || '';
    const myResume = {
        type:"drawer",
        value,
        children,
    };

    return myResume;
}

const parseDrawerHtmlConf = {
    selector: 'drawer', // CSS 选择器，匹配特定的 HTML 标签
    parseElemHtml: parseDrawerHtml,
};

export { parseDrawerHtmlConf };