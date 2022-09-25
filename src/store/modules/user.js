import { login, getInfo, createUser, changeUsername, changePassword, userList, changeAuth, deleteUser } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router';
import md5 from 'js-md5';

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        roles: []
    };
};

const state = getDefaultState();

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    }
};

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: md5(password) }).then(response => {
                const { data } = response;
                commit('SET_TOKEN', data.token);
                setToken(data.token);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo({ token: state.token }).then(response => {
                const { data } = response;
                if (!data) {
                    return reject('Verification failed, please Login again.');
                }

                const { name, roles } = data;
                commit('SET_ROLES', roles);
                commit('SET_NAME', name);
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // user logout
    logout({ commit }) {
        removeToken(); // must remove  token  first
        resetRouter();
        commit('RESET_STATE');
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken(); // must remove  token  first
            commit('RESET_STATE');
            resolve();
        });
    },

    // 创建一个用户
    createUser({ state }, permission) {
        return new Promise((resolve, reject) => {
            createUser({ token: state.token }, { permission: permission }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 修改用户名
    changeUsername({ state, commit }, username) {
        return new Promise((resolve, reject) => {
            changeUsername({ token: state.token }, { username: username }).then(response => {
                const { data } = response;

                commit('SET_NAME', data.username);

                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 修改密码
    changePassword({ state, commit }, { old_password, new_password }) {
        return new Promise((resolve, reject) => {
            changePassword({ token: state.token }, { old_password: md5(old_password), new_password: md5(new_password) }).then(response => {
                const { data } = response;

                commit('SET_TOKEN', data.token);
                setToken(data.token);

                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },


    // 获取用户列表
    userList({ state }, pageSize) {
        return new Promise((resolve, reject) => {
            userList({ token: state.token }, { page: pageSize.page, size: pageSize.size }).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 修改用户权限
    changeAuth({ state }, changeContent) {
        return new Promise((resolve, reject) => {
            changeAuth({ token: state.token }, changeContent).then(_ => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 修改用户权限
    deleteUser({ state }, id) {
        return new Promise((resolve, reject) => {
            deleteUser({ token: state.token }, { id: id }).then(_ => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

