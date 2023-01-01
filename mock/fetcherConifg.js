const Mock = require('mockjs');

function getRandomString(len){
    const _numberStr = '0123456789';
    // 定义一个字符串接收随机生成的字符串
    var chars = '';
    // 遍历
    for (var i = 0; i < len; i++) {
        //    chars 的值为char中下标为随机数的值
        // 这个随机数取值是Math.random()  0-1不到1
        // Math.random()*char.length 0-1之间的数*char的长度，生成一个0-char.length之间的数,取整不包含最后一个，但是length长度为最大下标+1，所以不用加一
        //最后用+来拼接
        chars += _numberStr.charAt(parseInt(Math.random() * _numberStr.length));
    }
    //返回得到的字符串
    return chars;
}

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
                let minTime = Math.floor(Math.random()*40)*1000;

                platformTable[i] = Mock.mock({
                    id: i,
                    type_id: "type"+i,
                    platform_name: "platform"+i,
                    min_request_interval:minTime,
                    "has_datasource|1": true
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
    },
    {
        url: '/admin/fetcherConfig/getPlatformAndDatasourceOption',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);

            let data = {
                platform_list: ["bilibili", "weibo", "netease-cloud-music", "arknights-game", "arknights-website"],
                datasource_list: ["bilibili", "weibo", "netease-cloud-music", "arknights/game-announcement", "arknights/game-version", "arknights/monster-siren", "arknights/official-website", "arknights/terra-historicus"]
            };
            return {
                code: "00000",
                data: data,
                message: "获取成功"
            };
        }
    },
    {
        url: '/admin/fetcherConfig/getDatasourceList',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);

            const { page, size } = req.query;
            console.log(req.query);

            const platformList = ["bilibili", "weibo", "netease-cloud-music", "arknights-game", "arknights-website"];
            const datasource = {
                "bilibili": ["bilibili"],
                "weibo":["weibo"],
                "netease-cloud-music":["netease-cloud-music"],
                "arknights-game":["arknights/game-announcement", "arknights/game-version"],
                "arknights-website":["arknights/monster-siren", "arknights/official-website", "arknights/terra-historicus"]
            };
            const device = ['Android','IOS','Bilibili'];

            let datasourceTable = [];
            for(let i = 0; i < 28; i++) {
                const platform = platformList[Math.floor(Math.random()*platformList.length)];

                let config = {};
                switch (platform) {
                case "bilibili":
                    config.uid = getRandomString(15);
                    break;
                case "weibo":
                    config = Mock.mock({
                        uid:getRandomString(11),
                        "ignoreEmpty|1": true
                    });
                    break;
                case "netease-cloud-music":
                    config.artistId = getRandomString(9);
                    break;
                case "arknights-game":
                    config.platform = device[Math.floor(Math.random()*device.length)];
                    break;
                case "arknights-website":
                    config={};
                    break;
                default:
                    config={};
                    break;
                }
                datasourceTable[i] = Mock.mock({
                    id: i,
                    platform: platform,
                    datasource: datasource[platform][Math.floor(Math.random()*datasource[platform].length)],
                    nickname: "昵称"+i,
                    avatar: "https://www.ceobecanteen.top/assets/img/lwt.81a55840.png",
                    config: config
                });
            }
            let data = {
                list: datasourceTable.slice((page-1)*size,page*size),
                page_size: {
                    page: Number(page),
                    size: Number(size),
                    total_count: datasourceTable.length,
                    total_page:  Math.ceil(datasourceTable.length/size),
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
        url: '/admin/fetcherConfig/deleteDatasource',
        type: 'delete',
        response: req => {
            console.log(req.body);

            return {
                code: "00000",
                message: '删除平台配置成功',
                data: null
            };
        }
    },
    {
        url: '/admin/fetcherConfig/createDatasource',
        type: 'post',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const body = req.body;
            console.log(body);

            return {
                code: "00000",
                message: '新增数据源配置成功',
                data: null
            };
        }
    },
    {
        url: '/admin/fetcherConfig/updateDatasource',
        type: 'post',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const body = req.body;
            console.log(body);

            return {
                code: "00000",
                message: '更新数据源配置成功',
                data: null
            };
        }
    },
    {
        url: '/admin/fetcherConfig/getGlobalConfig',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);

            let data = {
                default_interval: 15000
            };
            return {
                code: "00000",
                message: '更新数据源配置成功',
                data: data
            };
        }
    },
    {
        url: '/admin/fetcherConfig/uploadGlobalConfig',
        type: 'post',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const body = req.body;
            console.log(body);

            return {
                code: "00000",
                message: '更新数据源配置成功',
                data: null
            };
        }
    },
    {
        url: '/admin/fetcherConfig/allPlatformList',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);

            let data = [
                {
                    type_id: "bilibili",
                    platform_name: "Bilibili",
                    min_request_interval: 10000
                },
                {
                    type_id: "weibo",
                    platform_name: "微博",
                    min_request_interval: 4000
                },
                {
                    type_id: "netease-cloud-music",
                    platform_name: "网易云音乐",
                    min_request_interval: 10000
                },
                {
                    type_id: "arknights-game",
                    platform_name: "明日方舟游戏",
                    min_request_interval: 3000
                },
                {
                    type_id: "arknights-website",
                    platform_name: "明日方舟官网",
                    min_request_interval: 3000
                },
            ];
            return {
                code: "00000",
                data: data,
                message: "获取成功"
            };
        }
    },
    {
        url: '/admin/fetcherConfig/getAllDatasourceList',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const { type_id } = req.query;

            const datasource = {
                "bilibili": [
                    {
                        id: 0,
                        nickname: "明日方舟-B站",
                        datasource: "bilibili",
                        config: { uid: '161775300' }
                    },
                    {
                        id: 1,
                        nickname: "明日方舟终末地-B站",
                        datasource: "bilibili",
                        config: { uid: '1265652806' },
                    },
                    {
                        id: 2,
                        nickname: "来自星尘-B站",
                        datasource: "bilibili",
                        config: { uid: '1883857209' },
                    },
                    {
                        id: 3,
                        nickname: "重力井动画-B站",
                        datasource: "bilibili",
                        config: { uid: '1554642444' },
                    },
                    {
                        id: 4,
                        nickname: "CubesCollective-B站",
                        datasource: "bilibili",
                        config: { uid: '2123591088' },
                    }
                ],
                "weibo":[
                    {
                        id: 5,
                        nickname: "明日方舟Arknights-微博",
                        datasource: "weibo",
                        config: {
                            uid: '6279793937',
                            requestOptions: {
                                appendTimestamp: true,
                                headers: {
                                    referer: 'https://m.weibo.cn/u/6279793937',
                                    'user-agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36',
                                }
                            }
                        },
                    },
                    {
                        id: 6,
                        nickname: "一拾山-微博",
                        datasource: "weibo",
                        config: { uid: '7506039414' },
                    },
                    {
                        id: 7,
                        nickname: "明日方舟朝陇山-微博",
                        datasource: "weibo",
                        config: { uid: '6441489862' },
                    },
                    {
                        id: 8,
                        nickname: "泰拉记事社-微博",
                        datasource: "weibo",
                        config: { uid: '7499841383' },
                    },
                    {
                        id: 9,
                        nickname: "鹰角网络-微博",
                        datasource: "weibo",
                        config: { uid: '7461423907' },
                    },
                    {
                        id: 10,
                        nickname: "乌柯塔界限OCTAVEDGE-微博",
                        datasource: "weibo",
                        config: { uid: '7499841383' },
                    },
                    {
                        id: 11,
                        nickname: "明日方舟终末地-微博",
                        datasource: "weibo",
                        config: { uid: '7745672941' },
                    }
                ],
                "netease-cloud-music":[
                    {
                        id: 12,
                        nickname: "塞壬唱片-MSR-网易云",
                        datasource: "netease-cloud-musis",
                        config: { artistId: '32540734' },
                    },
                    {
                        id: 13,
                        nickname: "塞壬唱片-MSR-Cubes Collective",
                        datasource: "netease-cloud-musis",
                        config: { artistId: '50653540' },
                    }
                ],
                "arknights-game":[
                    {
                        id: 14,
                        nickname: "游戏内公告(安卓)-明日方舟",
                        datasource: "arknights/monster-siren",
                        config: { platform: 'Android' },
                    },
                    {
                        id: 15,
                        nickname: "游戏版本(安卓)-明日方舟",
                        datasource: "arknights/game-version",
                        config: { platform: 'Android' },
                    },
                ],
                "arknights-website":[
                    {
                        id: 16,
                        nickname: "塞壬唱片官网-明日方舟",
                        datasource: "arknights/monster-siren",
                        config: { },
                    },
                    {
                        id: 17,
                        nickname: "官网-明日方舟",
                        datasource: "arknights/official-website",
                        config: { },
                    },
                    {
                        id: 18,
                        nickname: "泰拉记事社官网-明日方舟",
                        datasource: "arknights/terra-historicus",
                        config: { },
                    },
                ]
            };

            return {
                code: "00000",
                message: '更新数据源配置成功',
                data: datasource[type_id]
            };
        }
    },
    {
        url: '/admin/fetcherConfig/getFetcherConfigList',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const { type_id } = req.query;

            let data = {
                "bilibili": [{ "number":1,"server":[{ "groups":[{ "name":"test1","platform":"bilibili","datasource":[0,1],"interval":3000 },{ "name":"test2","platform":"bilibili","datasource":[2,3] }] }] },{ "number":2,"server":[{ "groups":[{ "name":"test3","platform":"bilibili","datasource":[0,1,2,3],"interval_by_time_range":[{ "time_range":["04:00","06:00"],"interval":0 }] }] },{ "groups":[{ "name":"test4","platform":"bilibili","datasource":[4],"interval":3000 }] }] },{ "number":3,"server":[{ "groups":[{ "name":"test4","platform":"bilibili","datasource":[0,1,2] },{ "name":"test5","platform":"bilibili","datasource":[3] }] },{ "groups":[{ "name":"test6","platform":"bilibili","datasource":[4] }] },{ "groups":[] }] },{ "number":4,"server":[{ "groups":[{ "name":"test7","platform":"bilibili","datasource":[0,4] }] },{ "groups":[{ "name":"test8","platform":"bilibili","datasource":[1] }] },{ "groups":[{ "name":"test9","platform":"bilibili","datasource":[2] }] },{ "groups":[{ "name":"test10","platform":"bilibili","datasource":[3] }] }] }],
                "weibo": [{ "number":1,"server":[{ "groups":[{ "name":"weibo1","platform":"weibo","datasource":[5,11] },{ "name":"weibo2","platform":"weibo","datasource":[6,7,8,10,9] }] }] },{ "number":2,"server":[{ "groups":[{ "name":"weibo3","platform":"weibo","datasource":[6,7,8,9,10] }] },{ "groups":[{ "name":"微博4","platform":"weibo","datasource":[11] },{ "name":"微博5","platform":"weibo","datasource":[5] }] }] },{ "number":3,"server":[{ "groups":[{ "name":"微博6","platform":"weibo","datasource":[5,6,10] }] },{ "groups":[{ "name":"微博7","platform":"weibo","datasource":[7,8,11] }] },{ "groups":[{ "name":"微博8","platform":"weibo","datasource":[9] }] }] },{ "number":4,"server":[{ "groups":[{ "name":"微博9","platform":"weibo","datasource":[5,6] }] },{ "groups":[{ "name":"微博10","platform":"weibo","datasource":[7,9] }] },{ "groups":[{ "name":"微博11","platform":"weibo","datasource":[10] }] },{ "groups":[{ "name":"微博12","platform":"weibo","datasource":[11,8] }] }] },{ "number":5,"server":[{ "groups":[{ "name":"微博13","platform":"weibo","datasource":[11,5,7] }] },{ "groups":[{ "name":"微博17","platform":"weibo","datasource":[8] }] },{ "groups":[{ "name":"微博16","platform":"weibo","datasource":[10] }] },{ "groups":[{ "name":"微博15","platform":"weibo","datasource":[6] }] },{ "groups":[{ "name":"微博14","platform":"weibo","datasource":[9] }] }] }],
                "netease-cloud-music": [{ "number":1,"server":[{ "groups":[{ "name":"网易云1","platform":"netease-cloud-music","datasource":[12,13] }] }] },{ "number":2,"server":[{ "groups":[{ "name":"网易云2","platform":"netease-cloud-music","datasource":[12] }] },{ "groups":[{ "name":"网易云3","platform":"netease-cloud-music","datasource":[13] }] }] },{ "number":3,"server":[{ "groups":[{ "name":"网易云4","platform":"netease-cloud-music","datasource":[12] }] },{ "groups":[{ "name":"网易云5","platform":"netease-cloud-music","datasource":[13] }] },{ "groups":[] }] },{ "number":4,"server":[{ "groups":[{ "name":"网易云6","platform":"netease-cloud-music","datasource":[12] }] },{ "groups":[{ "name":"网易云7","platform":"netease-cloud-music","datasource":[13] }] },{ "groups":[] },{ "groups":[] }] },{ "number":5,"server":[{ "groups":[{ "name":"网易云8","platform":"netease-cloud-music","datasource":[12] }] },{ "groups":[{ "name":"网易云9","platform":"netease-cloud-music","datasource":[13] }] },{ "groups":[] },{ "groups":[] },{ "groups":[] }] }],
                "arknights-game": [{ "number":1,"server":[{ "groups":[{ "name":"game1","platform":"arknights-game","datasource":[14] },{ "name":"game2","platform":"arknights-game","datasource":[15] }] }] },{ "number":2,"server":[{ "groups":[{ "name":"game3","platform":"arknights-game","datasource":[14] }] },{ "groups":[{ "name":"game4","platform":"arknights-game","datasource":[15] }] }] },{ "number":3,"server":[{ "groups":[{ "name":"game5","platform":"arknights-game","datasource":[14] }] },{ "groups":[{ "name":"game6","platform":"arknights-game","datasource":[15] }] },{ "groups":[] }] },{ "number":4,"server":[{ "groups":[{ "name":"game7","platform":"arknights-game","datasource":[14] }] },{ "groups":[{ "name":"game8","platform":"arknights-game","datasource":[15] }] },{ "groups":[] },{ "groups":[] }] },{ "number":5,"server":[{ "groups":[{ "name":"game9","platform":"arknights-game","datasource":[14] }] },{ "groups":[{ "name":"game10","platform":"arknights-game","datasource":[15] }] },{ "groups":[] },{ "groups":[] },{ "groups":[] }] }],
                "arknights-website": [{ "number":1,"server":[{ "groups":[{ "name":"web4","platform":"arknights-website","datasource":[16,17,18] }] }] },{ "number":2,"server":[{ "groups":[{ "name":"web5","platform":"arknights-website","datasource":[16,17] }] },{ "groups":[{ "name":"web6","platform":"arknights-website","datasource":[18] }] }] },{ "number":3,"server":[{ "groups":[{ "name":"web7","platform":"arknights-website","datasource":[16] }] },{ "groups":[{ "name":"web8","platform":"arknights-website","datasource":[17] }] },{ "groups":[{ "name":"web9","platform":"arknights-website","datasource":[18] }] }] },{ "number":4,"server":[{ "groups":[{ "name":"web10","platform":"arknights-website","datasource":[16] }] },{ "groups":[{ "name":"web11","platform":"arknights-website","datasource":[17] }] },{ "groups":[{ "name":"web12","platform":"arknights-website","datasource":[18] }] },{ "groups":[] }] },{ "number":5,"server":[{ "groups":[{ "name":"web1","platform":"arknights-website","datasource":[16] }] },{ "groups":[{ "name":"web2","platform":"arknights-website","datasource":[17] }] },{ "groups":[{ "name":"web3","platform":"arknights-website","datasource":[18] }] },{ "groups":[] },{ "groups":[] }] }],
            };


            return {
                code: "00000",
                message: 'Operate Success',
                data: data[type_id]
            };
        }
    },
    {
        url: '/admin/fetcherConfig/getFetcherLiveNumber',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);

            let data = {
                fetcher_live_number: 5
            };

            return {
                code: "00000",
                message: '更新数据源配置成功',
                data: data
            };
        }
    },
    {
        url: '/admin/fetcherConfig/uploadFetcherConfig',
        type: 'post',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            console.log(JSON.stringify(req.body));

            return {
                code: "00000",
                message: 'Operate Success',
                data: null
            };
        }
    },
];
