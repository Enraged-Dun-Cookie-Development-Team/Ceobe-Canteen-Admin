import { getVideoInfo, getVideoList, submitVideoList } from '@/api/video'
import store from '..'

const actions = {
    // 获取视频消息信息
    getVideoInfo({ }, bvNumber) {
        return new Promise((resolve, reject) => {
            getVideoInfo({ token: store.getters.token, bvNumber: bvNumber }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取现有列表
    getVideoList() {
        return new Promise((resolve, reject) => {
            getVideoList(store.getters.token).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 上传视频信息
    submitVideoList({ }, videoList) {
        return new Promise((resolve, reject) => {
            submitVideoList({ token: store.getters.token, info: videoList }).then(response => {
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