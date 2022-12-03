import request from '@/utils/request';

export function platformList(token, data) {
    return request({
        url: '/admin/fetcherConfig/platformList',
        method: 'get',
        headers: token,
        params: data
    });
}

export function createPlatform(token, data) {
    return request({
        url: '/admin/fetcherConfig/createPlatform',
        method: 'post',
        headers: token,
        data: data
    });
}

export function updatePlatform(token, data) {
    return request({
        url: '/admin/fetcherConfig/updatePlatform',
        method: 'post',
        headers: token,
        data: data
    });
}

export function deletePlatform(token, id) {
    return request({
        url: '/admin/fetcherConfig/deletePlatform',
        method: 'delete',
        headers: token,
        data: id
    });
}