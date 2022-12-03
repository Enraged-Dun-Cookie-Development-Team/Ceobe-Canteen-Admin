module.exports = [
    {
        url: '/admin/fetcherConfig/uploadAvatar',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            console.log(token);

            let data = { url: "https://ak.hycdn.cn/announce/images/20221118/ee1747bd261655a663688b2b56cb5c51.png" };
            return {
                code: "00000",
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
                    platform_name: "platform"+i,
                    min_request_interval:minTime,
                };
            }
            let data = {
                list: platformTable.slice((page-1)*size,page*size),
                page_size: {
                    page: Number(page),
                    size: Number(size),
                    total_count: platformTable.length,
                    total_page:  Math.ceil(platformTable.length/size)
                }
            };

            return {
                code: "00000",
                message: '获取平台配置列表成功',
                data: data
            };
        }
    },
    {
        url: '/admin/fetcherConfig/createPlatform',
        type: 'post',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const body = req.body;
            console.log(body);

            return {
                code: "00000",
                message: '新增平台配置成功',
                data: null
            };
        }
    },
    {
        url: '/admin/fetcherConfig/updatePlatform',
        type: 'post',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const body = req.body;
            console.log(body);

            return {
                code: "00000",
                message: '更新平台配置成功',
                data: null
            };
        }
    },
    {
        url: '/admin/fetcherConfig/deletePlatform',
        type: 'delete',
        response: req => {
            const { id } = req.body;
            console.log(id);

            return {
                code: "00000",
                message: '删除平台配置成功',
                data: null
            };
        }
    }
];
