import { submitPluginVersion, submitPhoneVersion, submitDesktopVersion, getVersionList, createVersion, modifyVersion, markDeleteVersion } from '@/api/version';
import store from '..';

const actions = {
    // 上传插件版本信息
    submitPluginVersion(_, pluginForm) {
        return new Promise((resolve, reject) => {
            submitPluginVersion({ token: store.getters.token }, pluginForm).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    // 上传手机版本信息
    submitPhoneVersion(_, phoneForm) {
        return new Promise((resolve, reject) => {
            submitPhoneVersion({ token: store.getters.token }, phoneForm).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    // 上传手机版本信息
    submitDesktopVersion(_, windowForm) {
        return new Promise((resolve, reject) => {
            submitDesktopVersion({ token: store.getters.token }, windowForm).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 获取版本列表
    getVersionList(_, versionForm) {
        return new Promise((resolve, reject) => {
            getVersionList({ token: store.getters.token }, versionForm).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    // 新建版本信息
    createVersion(_, versionForm) {
        return new Promise((resolve, reject) => {
            createVersion({ token: store.getters.token }, versionForm).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    // 更改版本信息
    modifyVersion(_, versionForm) {
        return new Promise((resolve, reject) => {
            modifyVersion({ token: store.getters.token }, versionForm).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    // 删除版本信息
    markDeleteVersion(_, versionForm) {
        return new Promise((resolve, reject) => {
            markDeleteVersion({ token: store.getters.token }, versionForm).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
};

export default {
    namespaced: true,
    actions
};