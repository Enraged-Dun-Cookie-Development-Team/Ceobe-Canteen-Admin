import { platformList, createPlatform, updatePlatform, deletePlatform, getPlatformAndDatasourceOption, getDatasourceList, deleteDatasource , createDatasource, updateDatasource, getGlobalConfig, uploadGlobalConfig, allPlatformList, getAllDatasourceList, getFetcherConfigList, getFetcherLiveNumber, uploadFetcherConfig } from '@/api/fetcherConfig';
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
    },

    // 获取平台与数据源选项
    getPlatformAndDatasourceOption() {
        return new Promise((resolve, reject) => {
            getPlatformAndDatasourceOption({ token: store.getters.token }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 获取数据源列表
    getDatasourceList(_, { platform, datasource, page, size }) {
        return new Promise((resolve, reject) => {
            getDatasourceList({ token: store.getters.token }, { platform, datasource, page, size }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 删除数据源配置信息
    deleteDatasource(_, id) {
        return new Promise((resolve, reject) => {
            deleteDatasource({ token: store.getters.token }, { id: id }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 新增数据源配置信息
    createDatasource(_, data) {
        return new Promise((resolve, reject) => {
            createDatasource({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 修改数据源配置信息
    updateDatasource(_, data) {
        return new Promise((resolve, reject) => {
            updateDatasource({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 上传蹲饼器全局配置
    uploadGlobalConfig(_, data) {
        return new Promise((resolve, reject) => {
            uploadGlobalConfig({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 获取蹲饼器全局配置
    getGlobalConfig(_) {
        return new Promise((resolve, reject) => {
            getGlobalConfig({ token: store.getters.token }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 获取全部平台的列表
    allPlatformList(_) {
        return new Promise((resolve, reject) => {
            allPlatformList({ token: store.getters.token }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 获取当前平台全部数据源列表
    getAllDatasourceList(_, data) {
        return new Promise((resolve, reject) => {
            getAllDatasourceList({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 获取蹲饼器配置列表
    getFetcherConfigList(_, data) {
        return new Promise((resolve, reject) => {
            getFetcherConfigList({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 获取蹲饼器最高存活数量
    getFetcherLiveNumber(_) {
        return new Promise((resolve, reject) => {
            getFetcherLiveNumber({ token: store.getters.token }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 上传蹲饼器配置
    uploadFetcherConfig(_, fetcherConfig) {
        return new Promise((resolve, reject) => {
            uploadFetcherConfig({ token: store.getters.token }, fetcherConfig).then(response => {
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