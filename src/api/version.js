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

export async function submitDesktopVersion(token, data) {
    return request({
        url: `/admin/version/desktop`,
        method: 'post',
        headers: token,
        data: data
    });
}