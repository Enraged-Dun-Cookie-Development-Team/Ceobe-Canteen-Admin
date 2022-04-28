module.exports = [
    {
        url: '/admin/version/plugin',
        type: 'post',
        response: config => {
            const { token } = config.headers
            console.log(token)
            console.log(config.body)

            return {
                code: null,
                message: "成功上传"
            }
        }
    },
    {
        url: '/admin/version/phone',
        type: 'post',
        response: config => {
            const { token } = config.headers
            console.log(token)

            console.log(config.body)

            return {
                code: null,
                message: "成功上传"
            }
        }
    }
]