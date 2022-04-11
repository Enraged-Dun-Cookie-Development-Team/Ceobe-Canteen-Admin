import { getIdArray, getMansion, uploadMansion, deleteMansion } from '@/api/mansion'
import store from '..'

const actions = {
    // 获取最近id
    getIdArray() {
        return new Promise((resolve, reject) => {
            getIdArray({ token: store.getters.token },).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 根据id获取大厦信息
    getMansion({ }, id) {
        return new Promise((resolve, reject) => {
            getMansion({ token: store.getters.token }, { mansionId: id }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    uploadMansion({ }, { mansionList, idBefore }) {
        if (idBefore == "") {
            idBefore = undefined;
        }
        return new Promise((resolve, reject) => {
            uploadMansion({ token: store.getters.token }, mansionList, { idBefore: idBefore }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    deleteMansion({ }, id) {
        return new Promise((resolve, reject) => {
            deleteMansion({ token: store.getters.token }, { mansionId: id }).then(response => {
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