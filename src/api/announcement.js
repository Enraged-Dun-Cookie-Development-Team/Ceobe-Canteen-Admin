import request from '@/utils/request'

export async function getAnnouncementList(token) {
    return request({
        url: `/admin/announcement/get`,
        method: 'get',
        headers: token
    })
}

export async function submitAnnouncementList(token, data) {
    return request({
        url: `/admin/announcement/submitList`,
        method: 'post',
        headers: token,
        data: data
    })
}