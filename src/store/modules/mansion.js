import { getIdArray, getMansion, uploadMansion, deleteMansion } from '@/api/mansion'
import store from '..'

const actions = {
    // 上传插件版本信息
    getIdArray() {
        return new Promise((resolve, reject) => {
            getIdArray(store.getters.token).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 上传手机版本信息
    getMansion({ }, id) {
        return new Promise((resolve, reject) => {
            getMansion({ token: store.getters.token, info: id }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    uploadMansion({ }, mansionList) {
        return new Promise((resolve, reject) => {
            uploadMansion({ token: store.getters.token, info: mansionList }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    deleteMansion({ }, id) {
        return new Promise((resolve, reject) => {
            deleteMansion({ token: store.getters.token, info: id }).then(response => {
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