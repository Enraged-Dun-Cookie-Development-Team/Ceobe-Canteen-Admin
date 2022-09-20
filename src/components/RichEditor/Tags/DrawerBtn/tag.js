function withDrawerTag(editor) {
    const { isInline } = editor;
    const newEditor = editor;
    newEditor.isInline = element => {
        return ['drawer'].includes(element.type) || isInline(element);
    };

    return newEditor;
}

export { withDrawerTag };