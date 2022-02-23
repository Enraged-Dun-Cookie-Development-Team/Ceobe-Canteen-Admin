import request from '@/utils/request'

export async function getIdArray(token) {
    return request({
        url: `/admin/mansion/getId`,
        method: 'get',
        params: { token }
    })
}

export async function getMansion(data) {
    return request({
        url: `/admin/mansion/getInfo`,
        method: 'get',
        params: data
    })
}

export async function uploadMansion(data) {
    return request({
        url: `/admin/mansion/upload`,
        method: 'post',
        data: data
    })
}

export async function deleteMansion(data) {
    return request({
        url: `/admin/mansion/delete`,
        method: 'post',
        data: data
    })
}