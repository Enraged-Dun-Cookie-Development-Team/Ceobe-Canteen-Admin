import request from '@/utils/request'

export async function getVideoInfo(bvNumber) {
    return request({
        url: `/admin/video/detail`,
        method: 'get',
        params: bvNumber
    })
}

export async function getVideoList() {
    return request({
        url: `/admin/video/list`,
        method: 'get',
    })
}

export async function submitVideoList(videoList) {
    return request({
        url: `/admin/video/submitList`,
        method: 'post',
        data: videoList
    })
}