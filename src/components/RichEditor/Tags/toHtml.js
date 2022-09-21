function toHtml(elem, childrenHtml, tagType) {

    // 获取附件元素的数据
    const text  = elem.children[0].text;

    // 生成 HTML 代码
    const html = `<${tagType}>${text}</${tagType}>`;

    return html;
}

export { toHtml };