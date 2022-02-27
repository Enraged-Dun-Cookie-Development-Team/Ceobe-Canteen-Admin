import request from '@/utils/request'

export async function getResourceList(token) {
    return request({
        url: `/admin/resource/list`,
        method: 'get',
        headers: token,
    })
}

export async function submitResourceList(token, data) {
    return request({
        url: `/admin/resource/submitList`,
        method: 'post',
        headers: token,
        data: data
    })
}