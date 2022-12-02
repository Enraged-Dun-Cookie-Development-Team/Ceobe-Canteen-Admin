import request from '@/utils/request';

export function platformList(token, data) {
    return request({
        url: '/admin/fetcherConfig/platformList',
        method: 'get',
        headers: token,
        params: data
    });
}