import { toolLinkList, createToolLink, updateToolLink, deleteToolLink } from '@/api/toolLink';
import store from '..';

const actions = {
    // 获取平台配置信息
    toolLinkList(_, pageSize) {
        return new Promise((resolve, reject) => {
            toolLinkList({ token: store.getters.token }, { page: pageSize.page, size: pageSize.size }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 新增平台配置信息
    createToolLink(_, data) {
        return new Promise((resolve, reject) => {
            createToolLink({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 修改平台配置信息
    updateToolLink(_, data) {
        return new Promise((resolve, reject) => {
            updateToolLink({ token: store.getters.token }, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 删除平台配置信息
    deleteToolLink(_, id) {
        return new Promise((resolve, reject) => {
            deleteToolLink({ token: store.getters.token }, { id: id }).then(response => {
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