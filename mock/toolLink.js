const Mock = require('mockjs');

module.exports = [
    {
        url: '/admin/toolLink/list',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);

            const { page, size } = req.query;
            let platformTable = [];
            for(let i = 0; i < 28; i++) {
                let minTime = Math.floor(Math.random()*40)*1000;

                platformTable[i] = Mock.mock({
                    id: i,
                    icon_url: "platform"+i,
                    links: [],
                    min_request_interval:minTime,
                    "has_datasource|1": true,
                    localized_name: {
                        zh_CN: "name"+i,
                        en_US: "name"+i
                    },
                    localized_description: {
                        zh_CN: "description"+i,
                        en_US: "description"+i
                    },
                    localized_slogan: {
                        zh_CN: "slogan"+i,
                        en_US: "slogan"+i
                    },
                    localized_tags: {
                        zh_CN: ["tags"+i],
                        en_US: ["tags"+i]   
                    }
                });
            }
            let data = {
                list: platformTable.slice((page-1)*size,page*size),
                page_size: {
                    page: Number(page),
                    size: Number(size),
                    total_count: platformTable.length,
                    total_page:  Math.ceil(platformTable.length/size),
                }
            };

            return {
                code: "00000",
                message: '获取工具链接列表成功',
                data: data
            };
        }
    },
    {
        url: '/admin/toolLink/update',
        type: 'post',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const body = req.body;
            console.log(body);

            return {
                code: "00000",
                message: '新增工具链接成功',
                data: null
            };
        }
    },
    {
        url: '/admin/toolLink/update',
        type: 'post',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const body = req.body;
            console.log(body);

            return {
                code: "00000",
                message: '更新工具链接成功',
                data: null
            };
        }
    },
    {
        url: '/admin/toolLink/delete',
        type: 'delete',
        response: req => {
            const { id } = req.body;
            console.log(id);

            return {
                code: "00000",
                message: '删除工具链接成功',
                data: null
            };
        }
    },
];
