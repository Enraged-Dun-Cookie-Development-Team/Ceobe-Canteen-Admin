import request from '@/utils/request';

export async function submitPluginVersion(token, data) {
    return request({
        url: `/admin/version/plugin`,
        method: 'post',
        headers: token,
        data: data
    });
}

export async function submitPhoneVersion(token, data) {
    return request({
        url: `/admin/version/phone`,
        method: 'post',
        headers: token,
        data: data
    });
}

export async function submitWindowVersion(token, data) {
    return request({
        url: `/admin/version/window`,
        method: 'post',
        headers: token,
        data: data
    });
}