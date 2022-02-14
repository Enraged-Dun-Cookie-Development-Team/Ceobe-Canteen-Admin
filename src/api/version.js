import request from '@/utils/request'

export async function submitPluginVersion(data) {
    return request({
        url: `/admin/version/plugin`,
        method: 'post',
        data: data
    })
}

export async function submitPhoneVersion(data) {
    return request({
        url: `/admin/version/phone`,
        method: 'post',
        data: data
    })
}