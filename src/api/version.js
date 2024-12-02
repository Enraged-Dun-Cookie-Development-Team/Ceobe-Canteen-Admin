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

export async function getVersionList(token, data) {
    return request({
        url: `/admin/releaseVersion/all`,
        method: 'get',
        headers: token,
        params: data
    });
}

export async function createVersion(token, data) {
    return request({
        url: `/admin/releaseVersion/create`,
        method: 'post',
        headers: token,
        data: data
    });
}

export async function modifyVersion(token, data) {
    return request({
        url: `/admin/releaseVersion/modify`,
        method: 'post',
        headers: token,
        data: data
    });
}

export async function markDeleteVersion(token, data) {
    return request({
        url: `/admin/releaseVersion/markDelete`,
        method: 'post',
        headers: token,
        params: data
    });
}