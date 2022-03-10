import request from '@/utils/request'

export async function getIdArray(token) {
    return request({
        url: `/admin/mansion/getId`,
        method: 'get',
        headers: token
    })
}

export async function getMansion(token, mansionId) {
    return request({
        url: `/admin/mansion/getInfo`,
        method: 'get',
        headers: token,
        params: mansionId
    })
}

export async function uploadMansion(token, data, idBefore) {
    return request({
        url: `/admin/mansion/upload`,
        method: 'post',
        headers: token,
        data: data,
        params: idBefore
    })
}

export async function deleteMansion(token, data) {
    return request({
        url: `/admin/mansion/delete`,
        method: 'post',
        headers: token,
        data: {data}
    })
}