import request from '@/utils/request'

export async function getAnnouncementList(token) {
    return request({
        url: `/admin/announcement/get`,
        method: 'get',
        params: { token }
    })
}

export async function submitAnnouncementList(data) {
    return request({
        url: `/admin/announcement/submitList`,
        method: 'post',
        data: data
    })
}