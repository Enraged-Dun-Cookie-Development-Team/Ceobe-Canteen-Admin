import { getVideoInfo, getVideoList, submitVideoList } from '@/api/video'
import store from '..'

const actions = {
    // 获取视频消息信息
    getVideoInfo({ }, bv_number) {
        return new Promise((resolve, reject) => {
            getVideoInfo({ token: store.getters.token }, { bv_number: bv_number }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取现有列表
    getVideoList() {
        return new Promise((resolve, reject) => {
            getVideoList({ token: store.getters.token }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 上传视频信息
    submitVideoList({ }, videoList) {
        return new Promise((resolve, reject) => {
            submitVideoList({ token: store.getters.token }, videoList).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    actions
}