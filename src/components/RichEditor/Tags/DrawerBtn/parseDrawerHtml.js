
function parseDrawerHtml(domElem) {
    // 从 DOM element 中获取“附件”的信息
    const value = domElem.innerHTML || '';

    // 生成“附件”元素（按照此前约定的数据结构）
    const myResume = {
        type:"drawer",
        value
    };

    return myResume;
}

const parseDrawerHtmlConf = {
    selector: 'drawer', // CSS 选择器，匹配特定的 HTML 标签
    parseElemHtml: parseDrawerHtml,
};

export { parseDrawerHtmlConf };