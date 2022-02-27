module.exports = [
    {
        url: '/admin/mansion/getId',
        type: 'get',
        response: config => {
            const { token } = config.headers
            console.log(token)

            let data = ["16", "16.3", "16.6", "17"]
            return {
                code: 20000,
                data: data
            }
        }
    },
    {
        url: '/admin/mansion/getInfo',
        type: 'get',
        response: config => {
            const { mansionId } = config.query
            const { token } = config.headers
            console.log(token)
            console.log(mansionId)

            let data
            switch (mansionId) {
                case "16":
                    data = {
                        "mansionInfo": {
                            "idBefore": "16",
                            "id": "16",
                            "description": "ver.如我所见故事集",
                            "cvlink": "cv1789238",
                            "fraction": 3
                        },
                        "daily": [
                            {
                                "datetime": "2022-01-16",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "<签到服饰> “待晴日” - 深靛 "
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": "<签到家具>“ 山中弈 ”&“ 亭上雪"
                                    }
                                ],
                                "content": "<p>第一天平稳落地，不愧是无敌的banana老师\\n不负饼学大厦的名号，我们的未来一片光明！（挥拳）</p>"
                            },
                            {
                                "datetime": "2022-01-17",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "<活动异格>五星速射手 - 寒芒克洛丝"
                                    },
                                    {
                                        "isTrue": false,
                                        "forecast": "“且试箸” - 食铁兽"
                                    }
                                ],
                                "content": "<p>第二天瞬间垮掉，不愧是笨蛋的banana老师\\n有愧饼学大厦的名号，我们的未来一片黑暗！（挥泪）</p>"
                            },
                            {
                                "datetime": "2022-01-18",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "五星战术家 - 夜半"
                                    },
                                    {
                                        "isTrue": false,
                                        "forecast": "【常驻标准寻访预告】"
                                    }
                                ],
                                "content": "<p>第三天\\n请在此处填写今日感想\\n第一句，第二句\\n第三句，第四句！（挥【填写物品名称】）\\n（干员按正常顺序发布，轮换池提前一天芭娜娜没想到）</p>"
                            },
                            {
                                "datetime": "2022-01-19",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "闪断更新公告"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " “冷山月” - 乌有"
                                    }
                                ],
                                "content": "<p>第四天锟斤拷，不愧是锟斤拷的banana老师\\n锟斤拷锟斤拷的名号，我们的未来一片烫烫烫！</p>"
                            },
                            {
                                "datetime": "2022-01-21",
                                "info": [
                                    {
                                        "isTrue": false,
                                        "forecast": "“染尘烟” - 夕"
                                    }
                                ],
                                "content": "<p>芭娜娜今天做出以下锐评：\\n“嘿嘿，夕我的夕”</p>"
                            },
                            {
                                "datetime": "2022-01-22",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "#罗德岛闲逛部#"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": "六星行商 - 老鲤"
                                    }
                                ],
                                "content": "<p>没想到吧其他啥也没有了【抹眼泪】</p>"
                            },
                            {
                                "datetime": "2022-01-23",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": " #罗德岛相簿#"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " 六星召唤师  - 令 [限定]"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " 【山城茶馆】主题家具"
                                    }
                                ],
                                "content": "<p>#明日方舟##饼学大厦# \\n世界未解之谜之一被解开了：\\n昨天不发饼的原因是\\n从暮落开始YJ有意更新干员基建/技能介绍的动图的新样式（每年一次）</p>"
                            },
                            {
                                "datetime": "2022-01-24",
                                "info": [],
                                "content": "<p>Sidestory「将进酒」机制 +&nbsp;停机更新公告\\n有可能出现今天没有猜东西，但是最后有结果,就像这样子</p>"
                            },
                            {
                                "datetime": "2022-01-25",
                                "info": [
                                    {
                                        "forecast": " 令EP"
                                    },
                                    {
                                        "forecast": " Sidestory「将进酒」开启"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-01-26",
                                "info": [
                                    {
                                        "forecast": " 老鲤EP"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-01-30",
                                "info": [
                                    {
                                        "forecast": " #罗德岛相簿#（可能延后至02.01）"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-02-01",
                                "info": [
                                    {
                                        "forecast": "春节贺图"
                                    }
                                ],
                                "content": ""
                            }
                        ]
                    };
                    break;
                case "16.3":
                    data = {
                        "mansionInfo": {
                            "idBefore": "16.3",
                            "id": "16.3",
                            "description": "ver.画中人ss",
                            "cvlink": "",
                            "fraction": 5
                        },
                        "daily": [
                            {
                                "datetime": "2022-01-16",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "<签到服饰> “待晴日” - 深靛 "
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": "<签到家具>“ 山中弈 ”&“ 亭上雪"
                                    }
                                ],
                                "content": "<p>第一天平稳落地，不愧是无敌的banana老师\\n不负饼学大厦的名号，我们的未来一片光明！（挥拳）</p>"
                            },
                            {
                                "datetime": "2022-01-17",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "<活动异格>五星速射手 - 寒芒克洛丝"
                                    },
                                    {
                                        "isTrue": false,
                                        "forecast": "“且试箸” - 食铁兽"
                                    }
                                ],
                                "content": "<p>第二天瞬间垮掉，不愧是笨蛋的banana老师\\n有愧饼学大厦的名号，我们的未来一片黑暗！（挥泪）</p>"
                            },
                            {
                                "datetime": "2022-01-18",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "五星战术家 - 夜半"
                                    },
                                    {
                                        "isTrue": false,
                                        "forecast": "【常驻标准寻访预告】"
                                    }
                                ],
                                "content": "<p>第三天\\n请在此处填写今日感想\\n第一句，第二句\\n第三句，第四句！（挥【填写物品名称】）\\n（干员按正常顺序发布，轮换池提前一天芭娜娜没想到）</p>"
                            },
                            {
                                "datetime": "2022-01-19",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "闪断更新公告"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " “冷山月” - 乌有"
                                    }
                                ],
                                "content": "<p>第四天锟斤拷，不愧是锟斤拷的banana老师\\n锟斤拷锟斤拷的名号，我们的未来一片烫烫烫！</p>"
                            },
                            {
                                "datetime": "2022-01-21",
                                "info": [
                                    {
                                        "isTrue": false,
                                        "forecast": "“染尘烟” - 夕"
                                    }
                                ],
                                "content": "<p>芭娜娜今天做出以下锐评：\\n“嘿嘿，夕我的夕”</p>"
                            },
                            {
                                "datetime": "2022-01-22",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "#罗德岛闲逛部#"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": "六星行商 - 老鲤"
                                    }
                                ],
                                "content": "<p>没想到吧其他啥也没有了【抹眼泪】</p>"
                            },
                            {
                                "datetime": "2022-01-23",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": " #罗德岛相簿#"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " 六星召唤师  - 令 [限定]"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " 【山城茶馆】主题家具"
                                    }
                                ],
                                "content": "<p>#明日方舟##饼学大厦# \\n世界未解之谜之一被解开了：\\n昨天不发饼的原因是\\n从暮落开始YJ有意更新干员基建/技能介绍的动图的新样式（每年一次）</p>"
                            },
                            {
                                "datetime": "2022-01-24",
                                "info": [],
                                "content": "<p>Sidestory「将进酒」机制 +&nbsp;停机更新公告\\n有可能出现今天没有猜东西，但是最后有结果,就像这样子</p>"
                            },
                            {
                                "datetime": "2022-01-25",
                                "info": [
                                    {
                                        "forecast": " 令EP"
                                    },
                                    {
                                        "forecast": " Sidestory「将进酒」开启"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-01-26",
                                "info": [
                                    {
                                        "forecast": " 老鲤EP"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-01-30",
                                "info": [
                                    {
                                        "forecast": " #罗德岛相簿#（可能延后至02.01）"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-02-01",
                                "info": [
                                    {
                                        "forecast": "春节贺图"
                                    }
                                ],
                                "content": ""
                            }
                        ]
                    };
                    break;
                case "16.6":
                    data = {
                        "mansionInfo": {
                            "idBefore": "16.6",
                            "id": "16.6",
                            "description": "",
                            "cvlink": "",
                            "fraction": 4
                        },
                        "daily": [
                            {
                                "datetime": "2022-01-16",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "<签到服饰> “待晴日” - 深靛 "
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": "<签到家具>“ 山中弈 ”&“ 亭上雪"
                                    }
                                ],
                                "content": "<p>第一天平稳落地，不愧是无敌的banana老师\\n不负饼学大厦的名号，我们的未来一片光明！（挥拳）</p>"
                            },
                            {
                                "datetime": "2022-01-17",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "<活动异格>五星速射手 - 寒芒克洛丝"
                                    },
                                    {
                                        "isTrue": false,
                                        "forecast": "“且试箸” - 食铁兽"
                                    }
                                ],
                                "content": "<p>第二天瞬间垮掉，不愧是笨蛋的banana老师\\n有愧饼学大厦的名号，我们的未来一片黑暗！（挥泪）</p>"
                            },
                            {
                                "datetime": "2022-01-18",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "五星战术家 - 夜半"
                                    },
                                    {
                                        "isTrue": false,
                                        "forecast": "【常驻标准寻访预告】"
                                    }
                                ],
                                "content": "<p>第三天\\n请在此处填写今日感想\\n第一句，第二句\\n第三句，第四句！（挥【填写物品名称】）\\n（干员按正常顺序发布，轮换池提前一天芭娜娜没想到）</p>"
                            },
                            {
                                "datetime": "2022-01-19",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "闪断更新公告"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " “冷山月” - 乌有"
                                    }
                                ],
                                "content": "<p>第四天锟斤拷，不愧是锟斤拷的banana老师\\n锟斤拷锟斤拷的名号，我们的未来一片烫烫烫！</p>"
                            },
                            {
                                "datetime": "2022-01-21",
                                "info": [
                                    {
                                        "isTrue": false,
                                        "forecast": "“染尘烟” - 夕"
                                    }
                                ],
                                "content": "<p>芭娜娜今天做出以下锐评：\\n“嘿嘿，夕我的夕”</p>"
                            },
                            {
                                "datetime": "2022-01-22",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "#罗德岛闲逛部#"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": "六星行商 - 老鲤"
                                    }
                                ],
                                "content": "<p>没想到吧其他啥也没有了【抹眼泪】</p>"
                            },
                            {
                                "datetime": "2022-01-23",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": " #罗德岛相簿#"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " 六星召唤师  - 令 [限定]"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " 【山城茶馆】主题家具"
                                    }
                                ],
                                "content": "<p>#明日方舟##饼学大厦# \\n世界未解之谜之一被解开了：\\n昨天不发饼的原因是\\n从暮落开始YJ有意更新干员基建/技能介绍的动图的新样式（每年一次）</p>"
                            },
                            {
                                "datetime": "2022-01-24",
                                "info": [],
                                "content": "<p>Sidestory「将进酒」机制 +&nbsp;停机更新公告\\n有可能出现今天没有猜东西，但是最后有结果,就像这样子</p>"
                            },
                            {
                                "datetime": "2022-01-25",
                                "info": [
                                    {
                                        "forecast": " 令EP"
                                    },
                                    {
                                        "forecast": " Sidestory「将进酒」开启"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-01-26",
                                "info": [
                                    {
                                        "forecast": " 老鲤EP"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-01-30",
                                "info": [
                                    {
                                        "forecast": " #罗德岛相簿#（可能延后至02.01）"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-02-01",
                                "info": [
                                    {
                                        "forecast": "春节贺图"
                                    }
                                ],
                                "content": ""
                            }
                        ]
                    };
                    break;
                case "17":
                    data = {
                        "mansionInfo": {
                            "idBefore": "17",
                            "id": "17",
                            "description": "",
                            "cvlink": "",
                            "fraction": 1
                        },
                        "daily": [
                            {
                                "datetime": "2022-01-16",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "<签到服饰> “待晴日” - 深靛 "
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": "<签到家具>“ 山中弈 ”&“ 亭上雪"
                                    }
                                ],
                                "content": "<p>第一天平稳落地，不愧是无敌的banana老师\\n不负饼学大厦的名号，我们的未来一片光明！（挥拳）</p>"
                            },
                            {
                                "datetime": "2022-01-17",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "<活动异格>五星速射手 - 寒芒克洛丝"
                                    },
                                    {
                                        "isTrue": false,
                                        "forecast": "“且试箸” - 食铁兽"
                                    }
                                ],
                                "content": "<p>第二天瞬间垮掉，不愧是笨蛋的banana老师\\n有愧饼学大厦的名号，我们的未来一片黑暗！（挥泪）</p>"
                            },
                            {
                                "datetime": "2022-01-18",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "五星战术家 - 夜半"
                                    },
                                    {
                                        "isTrue": false,
                                        "forecast": "【常驻标准寻访预告】"
                                    }
                                ],
                                "content": "<p>第三天\\n请在此处填写今日感想\\n第一句，第二句\\n第三句，第四句！（挥【填写物品名称】）\\n（干员按正常顺序发布，轮换池提前一天芭娜娜没想到）</p>"
                            },
                            {
                                "datetime": "2022-01-19",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "闪断更新公告"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " “冷山月” - 乌有"
                                    }
                                ],
                                "content": "<p>第四天锟斤拷，不愧是锟斤拷的banana老师\\n锟斤拷锟斤拷的名号，我们的未来一片烫烫烫！</p>"
                            },
                            {
                                "datetime": "2022-01-21",
                                "info": [
                                    {
                                        "isTrue": false,
                                        "forecast": "“染尘烟” - 夕"
                                    }
                                ],
                                "content": "<p>芭娜娜今天做出以下锐评：\\n“嘿嘿，夕我的夕”</p>"
                            },
                            {
                                "datetime": "2022-01-22",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": "#罗德岛闲逛部#"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": "六星行商 - 老鲤"
                                    }
                                ],
                                "content": "<p>没想到吧其他啥也没有了【抹眼泪】</p>"
                            },
                            {
                                "datetime": "2022-01-23",
                                "info": [
                                    {
                                        "isTrue": true,
                                        "forecast": " #罗德岛相簿#"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " 六星召唤师  - 令 [限定]"
                                    },
                                    {
                                        "isTrue": true,
                                        "forecast": " 【山城茶馆】主题家具"
                                    }
                                ],
                                "content": "<p>#明日方舟##饼学大厦# \\n世界未解之谜之一被解开了：\\n昨天不发饼的原因是\\n从暮落开始YJ有意更新干员基建/技能介绍的动图的新样式（每年一次）</p>"
                            },
                            {
                                "datetime": "2022-01-24",
                                "info": [],
                                "content": "<p>Sidestory「将进酒」机制 +&nbsp;停机更新公告\\n有可能出现今天没有猜东西，但是最后有结果,就像这样子</p>"
                            },
                            {
                                "datetime": "2022-01-25",
                                "info": [
                                    {
                                        "forecast": " 令EP"
                                    },
                                    {
                                        "forecast": " Sidestory「将进酒」开启"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-01-26",
                                "info": [
                                    {
                                        "forecast": " 老鲤EP"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-01-30",
                                "info": [
                                    {
                                        "forecast": " #罗德岛相簿#（可能延后至02.01）"
                                    }
                                ],
                                "content": ""
                            },
                            {
                                "datetime": "2022-02-01",
                                "info": [
                                    {
                                        "forecast": "春节贺图"
                                    }
                                ],
                                "content": ""
                            }
                        ]
                    };
                    break;
            }

            return {
                code: 20000,
                data: data
            }
        }
    },
    {
        url: '/admin/mansion/upload',
        type: 'post',
        response: config => {
            const { token } = config.headers
            console.log(token)
            console.log(config.body)

            return {
                code: 20000,
                message: "成功上传"
            }
        }
    },
    {
        url: '/admin/mansion/delete',
        type: 'post',
        response: config => {
            const { token } = config.headers
            console.log(token)
            console.log(config.body)

            return {
                code: 20000,
                message: "成功删除"
            }
        }
    }
]
