import { getAnnouncementList, submitAnnouncementList } from '@/api/announcement';
import store from '..';

const actions = {
    // 获取公告信息
    getAnnouncementList() {
        return new Promise((resolve, reject) => {
            getAnnouncementList({ token: store.getters.token }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    // 上传公告信息
    submitAnnouncementList(_, AnnouncementList) {
        return new Promise((resolve, reject) => {
            submitAnnouncementList({ token: store.getters.token }, AnnouncementList).then(response => {
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