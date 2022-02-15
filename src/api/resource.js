import request from '@/utils/request'

export async function getResourceList(token) {
    return request({
        url: `/admin/resource/list`,
        method: 'get',
        params: { token }
    })
}

export async function submitResourceList(data) {
    return request({
        url: `/admin/resource/submitList`,
        method: 'post',
        data: data
    })
}