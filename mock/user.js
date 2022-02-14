const md5 = require('js-md5')

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
}

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
}

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
}

const users = {
  'chef-token': {
    roles: ['chef'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'chef'
  },
  'cooker-token': {
    roles: ['cooker'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'cooker'
  },
  'architect-token': {
    roles: ['architect'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'architect'
  }
}

module.exports = [
  // user login
  {
    url: '/admin/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      let token
      if (password === md5(userpassword[username].password)) {
        token = tokens[username]
      }

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '账号或者密码不正确'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，请尝试使用用户密码重新登录'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/admin/user/create',
    type: 'get',
    response: config => {
      const { token, permission } = config.query

      if (token == 'chef-token') {
        const userInfo = newUser[permission]
        return {
          code: 20000,
          data: userInfo
        }
      } else {
        return {
          code: 40001,
          message: '你没有权限新建用户'
        }
      }
    }
  },

  // 改用户名
  {
    url: '/admin/user/changeusername',
    type: 'post',
    response: config => {
      const { token, username } = config.body

      const info = users[token]
      if (username == info.name) {
        return {
          code: 20001,
          message: '用户名已被使用'
        }
      } else {
        return {
          code: 20000,
          message: '修改用户名成功',
          data: { username }
        }
      }
    }
  },

  // 修改密码
  {
    url: '/admin/user/changepassword',
    type: 'post',
    response: config => {
      const { token, password } = config.body
      let data={
        token: "test"
      }

      return {
        code: 20000,
        message: '修改密码成功',
        data: data
      }
    }
  },
]
