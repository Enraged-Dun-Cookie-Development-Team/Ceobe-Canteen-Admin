import { getResourceList, submitResourceList } from '@/api/resource'

const actions = {
    // 获取现有列表
    getResourceList() {
        return new Promise((resolve, reject) => {
            getResourceList().then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 上传视频信息
    submitResourceList({}, resouceList) {
        return new Promise((resolve, reject) => {
            submitResourceList(resouceList).then(response => {
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