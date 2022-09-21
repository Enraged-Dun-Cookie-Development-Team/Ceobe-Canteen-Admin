const tagList = ["drawer", "setting"];

function withTag(editor) {
    const { isInline } = editor;
    const newEditor = editor;
    newEditor.isInline = element => {
        return tagList.includes(element.type) || isInline(element);
    };

    return newEditor;
}

export { withTag };