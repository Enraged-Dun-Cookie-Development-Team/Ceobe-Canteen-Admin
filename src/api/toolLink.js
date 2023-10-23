import request from '@/utils/request';

export function toolLinkList(token, data) {
    return request({
        url: '/admin/toolLink/list',
        method: 'get',
        headers: token,
        params: data
    });
}

export function createToolLink(token, data) {
    return request({
        url: '/admin/toolLink/create',
        method: 'post',
        headers: token,
        data: data
    });
}

export function updateToolLink(token, data) {
    return request({
        url: '/admin/toolLink/update',
        method: 'post',
        headers: token,
        data: data
    });
}

export function deleteToolLink(token, id) {
    return request({
        url: '/admin/toolLink/delete',
        method: 'delete',
        headers: token,
        data: id
    });
}