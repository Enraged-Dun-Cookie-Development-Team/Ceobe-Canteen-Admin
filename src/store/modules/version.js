import { submitPluginVersion, submitPhoneVersion } from '@/api/version'
import store from '..'

const actions = {
    // 上传插件版本信息
    submitPluginVersion({ state }, pluginForm) {
        return new Promise((resolve, reject) => {
            submitPluginVersion({ token: store.getters.token, info: pluginForm }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 上传手机版本信息
    submitPhoneVersion({ state }, phoneForm) {
        return new Promise((resolve, reject) => {
            submitPhoneVersion({ token: store.getters.token, info: phoneForm }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    actions
}