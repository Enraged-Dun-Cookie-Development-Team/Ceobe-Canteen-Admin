import { h } from 'snabbdom';

function renderDrawer(_, children) {
    const drawerVnode = h(
        // HTML tag
        'drawer',
        // HTML 属性
        {
            style: { color: '#dd558a' }
        },
        children
    );

    return drawerVnode;
}

const renderDrawerConf = {
    type: 'drawer',
    renderElem: renderDrawer,
};

export { renderDrawerConf };