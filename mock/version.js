module.exports = [
    {
        url: '/admin/version/plugin',
        type: 'post',
        response: config => {

            console.log(config.body)

            return {
                code: 20000,
                message: "成功上传"
            }
        }
    },
    {
        url: '/admin/version/phone',
        type: 'post',
        response: config => {

            console.log(config.body)

            return {
                code: 20000,
                message: "成功上传"
            }
        }
    }
]