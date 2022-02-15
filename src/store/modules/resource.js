import { getResourceList, submitResourceList } from '@/api/resource'
import store from '..'

const actions = {
    // 获取现有列表
    getResourceList() {
        return new Promise((resolve, reject) => {
            getResourceList(store.getters.token).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 上传资源信息
    submitResourceList({ }, resouceList) {
        return new Promise((resolve, reject) => {
            submitResourceList({ token: store.getters.token, info: resouceList }).then(response => {
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