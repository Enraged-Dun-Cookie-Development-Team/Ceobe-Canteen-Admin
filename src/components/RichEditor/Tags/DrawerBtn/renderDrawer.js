import { h } from 'snabbdom';

function renderDrawer(elem) {
    const { value = '' } = elem;
    const drawerVnode = h(
        // HTML tag
        'drawer',
        // HTML 属性
        {
            style: { color: '#dd558a' }
        },
        [value]
    );

    return drawerVnode;
}

const renderDrawerConf = {
    type: 'drawer',
    renderElem: renderDrawer,
};

export { renderDrawerConf };