import request from '@/utils/request'

export async function getVideoInfo(bvNumber) {
    return request({
        url: `/admin/video/detail`,
        method: 'get',
        params: bvNumber
    })
}

export async function getVideoList(token) {
    return request({
        url: `/admin/video/list`,
        method: 'get',
        params: { token }
    })
}

export async function submitVideoList(data) {
    return request({
        url: `/admin/video/submitList`,
        method: 'post',
        data: data
    })
}