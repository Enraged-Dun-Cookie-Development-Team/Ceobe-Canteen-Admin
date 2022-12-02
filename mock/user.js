const md5 = require('js-md5');

const userpassword = {
    chef: {
        password: 'chef-password'
    },
    cooker: {
        password: 'cooker-password'
    },
    architect: {
        password: 'architect-password'
    }
};

const tokens = {
    chef: {
        token: 'chef-token'
    },
    cooker: {
        token: 'cooker-token'
    },
    architect: {
        token: 'architect-token'
    }
};

const newUser = {
    chef: {
        username: 'chef1',
        password: 'chef1-password'
    },
    cooker: {
        username: 'cooker1',
        password: 'cooker1-password'
    },
    architect: {
        username: 'architect1',
        password: 'architect1-password'
    }
};

const users = {
    'chef-token': {
        roles: ['chef'],
        name: 'chef'
    },
    'cooker-token': {
        roles: ['cooker'],
        name: 'cooker'
    },
    'architect-token': {
        roles: ['architect'],
        name: 'architect'
    }
};

module.exports = [
    // user login
    {
        url: '/admin/user/login',
        type: 'post',
        response: config => {
            const { username, password } = config.body;
            let token;
            if (userpassword[username] && password === md5(userpassword[username].password)) {
                token = tokens[username];
            }

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: '账号或者密码不正确'
                };
            }

            return {
                code: null,
                data: token
            };
        }
    },

    // get user info
    {
        url: '/admin/user/info',
        type: 'get',
        response: config => {
            const { token } = config.headers;
            const info = users[token];

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: '登录失败，请尝试使用用户密码重新登录'
                };
            }

            return {
                code: null,
                data: info
            };
        }
    },

    // user logout
    {
        url: '/admin/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: null,
                data: 'success'
            };
        }
    },

    {
        url: '/admin/user/create',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            const { permission } = config.query;

            if (token == 'chef-token') {
                const userInfo = newUser[permission];
                return {
                    code: null,
                    data: userInfo
                };
            } else {
                return {
                    code: 40001,
                    message: '你没有权限新建用户'
                };
            }
        }
    },

    // 改用户名
    {
        url: '/admin/user/changeUsername',
        type: 'post',
        response: config => {

            const { token } = config.headers;
            const { username } = config.body;
            console.log(username);

            const info = users[token];
            if (username == info.name) {
                return {
                    code: 20001,
                    message: '用户名已被使用'
                };
            } else {
                return {
                    code: null,
                    message: '修改用户名成功',
                    data: { username }
                };
            }
        }
    },

    // 修改密码
    {
        url: '/admin/user/changePassword',
        type: 'post',
        response: _ => {
            let data = {
                token: "test"
            };

            return {
                code: null,
                message: '修改密码成功',
                data: data
            };
        }
    },

    // 用户列表
    {
        url: '/admin/user/changePassword',
        type: 'delete',
        response: _ => {
            let data = {
                token: "test"
            };

            return {
                code: null,
                message: '修改密码成功',
                data: data
            };
        }
    },

    // 用户列表
    {
        url: '/admin/user/userList',
        type: 'get',
        response: req => {
            console.log(req);
            const { page, size } = req.query;
            let auth = ['chef','cooker','architect'];
            let userTable = [];
            for(let i = 0; i < 28; i++) {
                let index = Math.floor(Math.random()*auth.length);

                userTable[i] = {
                    id: i,
                    username: "test"+i,
                    auth: auth[index],
                };
            }
            let data = {
                list: userTable.slice((page-1)*size,page*size),
                page_size: {
                    page: page,
                    size: size,
                    total_count: userTable.length,
                    total_page:  Math.ceil(userTable.length/size)
                }
            };

            return {
                code: null,
                message: '获取用户列表成功',
                data: data
            };
        }
    },

    // 修改用户权限
    {
        url: '/admin/user/changeAuth',
        type: 'post',
        response: (req) => {
            console.log(req.body);

            return {
                code: null,
                message: '修改权限成功',
                data: null
            };
        }
    },

    // 删除用户
    {
        url: '/admin/user/deleteUser',
        type: 'delete',
        response: (req) => {
            console.log(req.body);
            let a = [];
            for(let i = 0; i < 28; i++) {
                a[0] = {
                    id: a,
                    username: "test"+a,
                    auth: "cooker",
                };
            }

            return {
                code: null,
                message: '删除用户成功',
                data: null
            };
        }
    },
];
