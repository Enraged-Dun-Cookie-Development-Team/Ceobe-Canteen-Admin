import request from '@/utils/request';

export function toolLinkList(token, data) {
    return request({
        url: '/admin/toolLink/pageShow',
        method: 'get',
        headers: token,
        params: data
    });
}

export function createToolLink(token, data) {
    return request({
        url: '/admin/toolLink/createOne',
        method: 'post',
        headers: token,
        data: data
    });
}

export function updateToolLink(token, data) {
    return request({
        url: '/admin/toolLink/updateOne',
        method: 'post',
        headers: token,
        data: data
    });
}

export function deleteToolLink(token, id) {
    return request({
        url: '/admin/toolLink/deleteOne',
        method: 'delete',
        headers: token,
        data: id
    });
}