function parseHtml(domElem, children, editor, tagType) {
    const myResume = {
        type:tagType,
        children,
    };

    return myResume;
}

export { parseHtml };