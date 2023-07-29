import { submitPluginVersion, submitPhoneVersion, submitWindowVersion } from '@/api/version';
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
    submitWindowVersion(_, windowForm) {
        return new Promise((resolve, reject) => {
            submitWindowVersion({ token: store.getters.token }, windowForm).then(response => {
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