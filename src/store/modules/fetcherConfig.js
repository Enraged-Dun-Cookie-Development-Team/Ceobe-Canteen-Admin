import { platformList } from '@/api/fetcherConfig';
import store from '..';

const actions = {
    // 获取平台配置信息信息
    platformList(_, pageSize) {
        return new Promise((resolve, reject) => {
            platformList({ token: store.getters.token }, { page: pageSize.page, size: pageSize.size }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }
};

export default {
    namespaced: true,
    actions
};