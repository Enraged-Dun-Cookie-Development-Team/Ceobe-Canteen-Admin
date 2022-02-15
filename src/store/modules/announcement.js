import { getAnnouncementList, submitAnnouncementList } from '@/api/announcement'
import store from '..'

const actions = {
    // 上传插件版本信息
    getAnnouncementList() {
        return new Promise((resolve, reject) => {
            getAnnouncementList(store.getters.token).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 上传手机版本信息
    submitAnnouncementList({ }, AnnouncementList) {
        return new Promise((resolve, reject) => {
            submitAnnouncementList({ token: store.getters.token, info: AnnouncementList }).then(response => {
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