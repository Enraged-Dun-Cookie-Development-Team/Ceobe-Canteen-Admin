import { h } from 'snabbdom';

function renderEditor(_, children, editor, tagType, color) {
    const drawerVnode = h(
        // HTML tag
        tagType,
        // HTML 属性
        {
            style: { color: color }
        },
        children
    );

    return drawerVnode;
}

export { renderEditor };