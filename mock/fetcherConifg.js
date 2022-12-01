module.exports = [
    {
        url: '/admin/fetcherConfig/uploadAvatar',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            console.log(token);

            let data = { url: "https://ak.hycdn.cn/announce/images/20221118/ee1747bd261655a663688b2b56cb5c51.png" };
            return {
                code: "000000",
                data: data
            };
        }
    }
];
