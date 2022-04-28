import request from '@/utils/request'

export async function getIdArray(token) {
    return request({
        url: `/admin/mansion/getId`,
        method: 'get',
        headers: token
    })
}

export async function getMansion(token, mansion_id) {
    return request({
        url: `/admin/mansion/getInfo`,
        method: 'get',
        headers: token,
        params: mansion_id
    })
}

export async function uploadMansion(token, data, mansion_id) {
    return request({
        url: `/admin/mansion/upload`,
        method: 'post',
        headers: token,
        data: data,
        params: mansion_id
    })
}

export async function deleteMansion(token, mansion_id) {
    return request({
        url: `/admin/mansion/delete`,
        method: 'post',
        headers: token,
        params: mansion_id
    })
}