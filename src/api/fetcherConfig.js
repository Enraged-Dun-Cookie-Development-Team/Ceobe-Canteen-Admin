import request from '@/utils/request';

export function platformList(token, data) {
    return request({
        url: '/admin/fetcherConfig/platformList',
        method: 'get',
        headers: token,
        params: data
    });
}

export function createPlatform(token, data) {
    return request({
        url: '/admin/fetcherConfig/createPlatform',
        method: 'post',
        headers: token,
        data: data
    });
}

export function updatePlatform(token, data) {
    return request({
        url: '/admin/fetcherConfig/updatePlatform',
        method: 'post',
        headers: token,
        data: data
    });
}

export function deletePlatform(token, id) {
    return request({
        url: '/admin/fetcherConfig/deletePlatform',
        method: 'delete',
        headers: token,
        data: id
    });
}

export function getPlatformAndDatasourceOption(token) {
    return request({
        url: '/admin/fetcherConfig/getPlatformAndDatasourceOption',
        method: 'get',
        headers: token,
    });
}

export function getDatasourceList(token, data) {
    return request({
        url: '/admin/fetcherConfig/getDatasourceList',
        method: 'get',
        headers: token,
        params: data
    });
}

export function deleteDatasource(token, id) {
    return request({
        url: '/admin/fetcherConfig/deleteDatasource',
        method: 'delete',
        headers: token,
        data: id
    });
}

export function createDatasource(token, data) {
    return request({
        url: '/admin/fetcherConfig/createDatasource',
        method: 'post',
        headers: token,
        data: data
    });
}

export function updateDatasource(token, data) {
    return request({
        url: '/admin/fetcherConfig/updateDatasource',
        method: 'post',
        headers: token,
        data: data
    });
}

export function getGlobalConfig(token) {
    return request({
        url: '/admin/fetcherConfig/getGlobalConfig',
        method: 'get',
        headers: token,
    });
}

export function uploadGlobalConfig(token, data) {
    return request({
        url: '/admin/fetcherConfig/uploadGlobalConfig',
        method: 'post',
        headers: token,
        data: data
    });
}

export function allPlatformList(token) {
    return request({
        url: '/admin/fetcherConfig/allPlatformList',
        method: 'get',
        headers: token,
    });
}

export function getAllDatasourceList(token, data) {
    return request({
        url: '/admin/fetcherConfig/getAllDatasourceList',
        method: 'get',
        headers: token,
        params: data
    });
}

export function getFetcherConfigList(token, data) {
    return request({
        url: '/admin/fetcherConfig/getFetcherConfigList',
        method: 'get',
        headers: token,
        params: data
    });
}

export function getFetcherLiveNumber(token) {
    return request({
        url: '/admin/fetcherConfig/getFetcherLiveNumber',
        method: 'get',
        headers: token,
    });
}

export function uploadFetcherConfig(token, data) {
    return request({
        url: '/admin/fetcherConfig/uploadFetcherConfig',
        method: 'post',
        headers: token,
        data: data
    });
}
