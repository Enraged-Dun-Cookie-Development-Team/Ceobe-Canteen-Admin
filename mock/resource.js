module.exports = [
    {
        url: '/admin/resource/list',
        type: 'get',
        response: config => {
            const { token } = config.headers
            console.log(token)
            let data = {
                "resources": [
                    "2021-11-22 16:00:00",
                    "2021-12-06 03:59:59"
                ],
                "countdown": [
                    {
                        "text": "当前轮换池结束",
                        "remark": "刻俄柏[兑换],水月,赤冬,莱恩哈特[兑换],安哲拉",
                        "time": "2022-02-17 03:59:59",
                        "starTime": "2022-02-03 04:00:00",
                        "overTime": "2022-02-17 03:59:59"
                    },
                    {
                        "text": "当前轮换池结束",
                        "remark": "棘刺[兑换]、艾雅法拉、乌有 、诗怀雅[兑换]、雷蛇",
                        "time": "2022-02-03 03:59:59",
                        "starTime": "2022-01-20 04:00:00",
                        "overTime": "2022-02-03 03:59:59"
                    },
                    
                    {
                        "text": "下个活动池开启",
                        "remark": "令[限定]，老鲤，夜半",
                        "time": "2022-01-14 15:59:59",
                        "starTime": "2022-01-14 04:00:00",
                        "overTime": "2022-01-14 15:59:59"
                    },
                    {
                        "text": "下个活动池开启",
                        "remark": "令[限定]，老鲤，夜半",
                        "time": "2022-01-25 15:59:59",
                        "starTime": "2022-01-15 04:00:00",
                        "overTime": "2022-01-25 15:59:59"
                    },
                    {
                        "text": "当前活动池结束",
                        "remark": "令[限定]，老鲤，夜半",
                        "time": "2022-02-08 03:59:59",
                        "starTime": "2022-01-25 16:00:00",
                        "overTime": "2022-02-08 03:59:59"
                    },
        
                    {
                        "text": "SideStory「将进酒」，活动开启",
                        "remark": "解锁条件：通关主线1-10",
                        "time": "2022-01-25 15:59:59",
                        "starTime": "2022-01-20 04:00:00",
                        "overTime": "2022-01-25 15:59:59"
                    },
                    {
                        "text": "SideStory「画中人」，复刻结束",
                        "remark": "解锁条件：通关主线1-10",
                        "time": "2022-01-20 03:59:59",
                        "starTime": "2022-01-10 16:00:00",
                        "overTime": "2022-01-20 03:59:59"
                    },
                    {
                        "text": "SideStory「将进酒」，活动结束",
                        "remark": "通关主线1-10",
                        "time": "2022-02-08 03:59:59",
                        "starTime": "2022-01-25 16:00:00",
                        "overTime": "2022-02-08 03:59:59"
                    }
                ]
            }

            if (!data) {
                return {
                    code: 30001,
                    message: '服务器没有数据'
                }
            }

            return {
                code: null,
                data: data
            }
        }
    }
    ,
    {
        url: '/admin/resource/submitList',
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