import request from '@/utils/request'

export async function getVideoInfo(token, bvNumber) {
    return request({
        url: `/admin/video/detail`,
        method: 'get',
        headers: token,
        params: bvNumber
    })
}

export async function getVideoList(token) {
    return request({
        url: `/admin/video/list`,
        method: 'get',
        headers: token
    })
}

export async function submitVideoList(token, data) {
    return request({
        url: `/admin/video/submitList`,
        method: 'post',
        headers: token,
        data: data
    })
}