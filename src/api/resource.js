import request from '@/utils/request'

export async function getResourceList() {
    return request({
        url: `/admin/resource/list`,
        method: 'get',
    })
}

export async function submitResourceList(resouceList) {
    return request({
        url: `/admin/resource/submitList`,
        method: 'post',
        data: resouceList
    })
}