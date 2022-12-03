import { platformList, createPlatform, updatePlatform, deletePlatform } from '@/api/fetcherConfig';
import store from '..';

const actions = {
    // 获取平台配置信息
    platformList(_, pageSize) {
        return new Promise((resolve, reject) => {
            platformList({ token: store.getters.token }, { page: pageSize.page, size: pageSize.size }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 新增平台配置信息
    createPlatform(_, data) {
        return new Promise((resolve, reject) => {
            createPlatform({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 修改平台配置信息
    updatePlatform(_, data) {
        return new Promise((resolve, reject) => {
            updatePlatform({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 删除平台配置信息
    deletePlatform(_, id) {
        return new Promise((resolve, reject) => {
            deletePlatform({ token: store.getters.token }, { id: id }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }
};

export default {
    namespaced: true,
    actions
};