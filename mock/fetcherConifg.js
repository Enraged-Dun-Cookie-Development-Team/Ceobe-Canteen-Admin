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
    },
    {
        url: '/admin/fetcherConfig/platformList',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);

            const { page, size } = req.query;
            let platformTable = [];
            for(let i = 0; i < 28; i++) {
                let minTime = Math.floor(Math.random()*100);

                platformTable[i] = {
                    id: i,
                    type_id: "type"+i,
                    platform: "platform"+i,
                    min_request_interval:minTime,
                };
            }
            let data = {
                list: platformTable.slice((page-1)*size,page*size),
                page_size: {
                    page: page,
                    size: size,
                    total_count: platformTable.length,
                    total_page:  Math.ceil(platformTable.length/size)
                }
            };

            return {
                code: null,
                message: '获取平台配置列表成功',
                data: data
            };
        }
    }
];
