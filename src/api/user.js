import request from '@/utils/request';

export function login(data) {
    return request({
        url: '/admin/user/login',
        method: 'post',
        data: data
    });
}

export function getInfo(token) {
    return request({
        url: '/admin/user/info',
        method: 'get',
        headers: token
    });
}

export function logout() {
    return request({
        url: '/admin/user/logout',
        method: 'post'
    });
}

export function createUser(token, permission) {
    return request({
        url: '/admin/user/create',
        method: 'post',
        headers: token,
        params: permission
    });
}

export function changeUsername(token, data) {
    return request({
        url: '/admin/user/changeUsername',
        method: 'post',
        headers: token,
        data: data
    });
}

export function changePassword(token, data) {
    return request({
        url: '/admin/user/changePassword',
        method: 'post',
        headers: token,
        data: data
    });
}

