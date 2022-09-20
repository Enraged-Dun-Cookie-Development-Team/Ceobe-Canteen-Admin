

function elementDrawerToHtml(elem) {

    // 获取附件元素的数据
    const { value = '' } = elem;

    // 生成 HTML 代码
    const html = `<drawer>${value}</drawer>`;

    return html;
}

const elemDrawerToHtmlConf = {
    type: 'drawer',
    elemToHtml: elementDrawerToHtml,
};

export { elemDrawerToHtmlConf };