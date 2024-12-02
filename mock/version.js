module.exports = [
    {
        url: '/admin/version/plugin',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            console.log(token);
            console.log(config.body);

            return {
                code: "00000",
                message: "成功上传"
            };
        }
    },
    {
        url: '/admin/version/phone',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            console.log(token);

            console.log(config.body);

            return {
                code: "00000",
                message: "成功上传"
            };
        }
    },
    {
        url: '/admin/version/desktop',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            console.log(token);

            console.log(config.body);

            return {
                code: "00000",
                message: "成功上传"
            };
        }
    },
    {
        url: '/admin/releaseVersion/all',
        type: 'get',
        response: req => {
            const { token } = req.headers;
            console.log(token);
            const { page, size, platform, deleted } = req.query;

            console.log("page:" + page);
            console.log("size:" + size);
            console.log("platform:" + platform);
            console.log("deleted:" + deleted);

            return {
                "code": "00000",
                "message": "Operate Success",
                "data": {
                    "list": [
                        {
                            "version": "1.13.2",
                            "force": {
                                "force_update": false,
                                "previous_force_version": "1.0.0"
                            },
                            "description": "Abc",
                            "platform": "desktop",
                            "download_source": [
                                {
                                    "name": "百度云盘",
                                    "description": "PanBaidu",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/114514",
                                        "manual": true,
                                        "support_platforms": [
                                            "Firefox",
                                            "Safari"
                                        ]
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "百度云备用",
                                            "url": "https://pan.baidu.com/s/1919810",
                                            "manual": false
                                        }
                                    ]
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "5.0.0",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "5.0.0"
                            },
                            "description": "💥升级浏览器扩展协议\n\n1. 因谷歌最新浏览器将不再兼容mv2协议，插件协议切换至mv3\n2. 修复蹲饼器切换逻辑\n（PS: 火狐因与chrome对战中，mv3协议不完全兼容，暂时停止火狐插件端的更新）",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://ceobe.lanzn.com/i6LwS234nlgf",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "CRX备用",
                                            "url": "https://ceobe.lanzn.com/i6LwS234nlgf",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/5.0.0/Ceobe-Canteen-5.0.0.zip",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "ZIP备用",
                                            "url": "https://ceobe.lanzn.com/i6LwS234nlgf",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA?pwd=jzq9",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "4.0.5",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "4.0.5"
                            },
                            "description": "🐛 修复bug\n\n修复断网重连后蹲饼停止",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.5/Ceobe-Canteen-4.0.5.crx",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "CRX备用",
                                            "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.5/Ceobe-Canteen-4.0.5.crx",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.5/Ceobe-Canteen-4.0.5.zip",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "ZIP备用",
                                            "url": "https://ceobe.lanzn.com/irVwq1mxllva",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA?pwd=jzq9",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "4.0.4",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "4.0.4"
                            },
                            "description": "⚡️ 优化及动态工具链接\n\n1. 工具链接转线上维护，增删更智能\n2. 优化本地蹲饼逻辑\n3. 饼来源与工具链接支持自行调整位置与删改\n4. 移除火狐无用提示\n5. 优化版本信息获取逻辑\n6. 避免服务器数据获取失败蹲饼暂停\n7. 优化用户协议ui",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.4/Ceobe-Canteen-4.0.4.crx",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "CRX备用",
                                            "url": "https://ceobe.lanzn.com/iZAwb1kpwgid",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.4/Ceobe-Canteen-4.0.4.zip",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "ZIP备用",
                                            "url": "https://ceobe.lanzn.com/i64We1kpwrpg",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA?pwd=jzq9",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "4.0.2",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "4.0.2"
                            },
                            "description": "测试",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.2/Ceobe-Canteen-4.0.2.crx",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "CRX备用",
                                            "url": "https://kkgithub.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.2/Ceobe-Canteen-4.0.2.crx",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.2/Ceobe-Canteen-4.0.2.zip",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "ZIP备用",
                                            "url": "https://kkgithub.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.2/Ceobe-Canteen-4.0.2.zip",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "4.0.1",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "4.0.1"
                            },
                            "description": "🐛 修复bug\n\n1. 修复旧版本启用了分类显示功能升级后无法正常显示列表，v4.0.0版本已移除分类显示功能",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.1/Ceobe-Canteen-4.0.1.crx",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "CRX备用",
                                            "url": "https://kgithub.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.1/Ceobe-Canteen-4.0.1.crx",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.1/Ceobe-Canteen-4.0.1.zip",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "ZIP备用",
                                            "url": "https://kgithub.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.1/Ceobe-Canteen-4.0.1.zip",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "4.0.0",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "4.0.0"
                            },
                            "description": "🚀 小刻食堂大翻新！！！\n\n1. 蹲饼数据转用线上\n2. 数据源采用后台动态配置，蹲饼一触即发\n3. 修复微博图片无法正常显示\n4. 修复微博饼无法正常推送\n5. 收录来自17年以来的所有饼\n6. 优化搜索逻辑，搜索更加智能\n7. 优化公告、官网等解析，饼信息一目了然\n8. ui界面翻新",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.0/Ceobe-Canteen-4.0.0.crx",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "CRX备用",
                                            "url": "https://kgithub.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.0/Ceobe-Canteen-4.0.0.crx",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.0/Ceobe-Canteen-4.0.0.zip",
                                        "manual": false
                                    },
                                    "spare_urls": [
                                        {
                                            "name": "ZIP备用",
                                            "url": "https://kgithub.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/4.0.0/Ceobe-Canteen-4.0.0.zip",
                                            "manual": true
                                        }
                                    ]
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "3.2.5",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "3.2.5"
                            },
                            "description": "🐛 修复与优化各种东西\n\n1.修复更新界面提示没有换行\n2.修复更新界面没有百度云按钮\n3.修复公告跳转二级菜单时视频无法显示\n4.优化公告链接弹出逻辑\n5.延长接口请求时间，提升用户体验\n6.修复泰拉记事社官网漫画在列表中的排序\n7.修复微博图片偶尔无法显示",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/3.2.5/Ceobe-Canteen-3.2.5.crx",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/3.2.5/Ceobe-Canteen-3.2.5.zip",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "3.2.2",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "3.2.2"
                            },
                            "description": "🐛 修复视频只有靠上和靠下区域可以点击\n\n1. 修复视频只有靠上和靠下区域可以点击",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/3.2.2/Ceobe-Canteen-3.2.2.crx",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/3.2.2/Ceobe-Canteen-3.2.2.zip",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        },
                        {
                            "version": "3.2.1",
                            "force": {
                                "force_update": true,
                                "previous_force_version": "3.2.1"
                            },
                            "description": "🧱 替换运营信息获取来源，如公告、视频资源等，务必升级到这个版本后\n\n1. 替换运营信息获取来源，更加方便更新啦。所以以后更新频率将更加频繁，记得去看快捷连接的视频推荐呀\n2. 更新后第一次打开列表提醒更新内容\n3. 修复企鹅物流查询无法展示（打开列表后按Enter触发）\n4. 断网情况不在列表显示更新提醒\n",
                            "platform": "plugin",
                            "download_source": [
                                {
                                    "name": "CRX",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/3.2.1/Ceobe-Canteen-3.2.1.crx",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "ZIP 包下载",
                                    "primary_url": {
                                        "url": "https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue/releases/download/3.2.1/Ceobe-Canteen-3.2.1.zip",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Chrome",
                                    "primary_url": {
                                        "url": "https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "Edge",
                                    "primary_url": {
                                        "url": "https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "FireFox",
                                    "primary_url": {
                                        "url": "https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/",
                                        "manual": false
                                    }
                                },
                                {
                                    "name": "云盘备用",
                                    "description": "备用下载（提取码 jzq9）",
                                    "primary_url": {
                                        "url": "https://pan.baidu.com/s/1kzY6kpfYqLcGpuaiwQOGoA",
                                        "manual": true
                                    }
                                }
                            ],
                            "deleted": false
                        }
                    ],
                    "page_size": {
                        "page": 1,
                        "size": 10,
                        "total_count": 19,
                        "total_page": 2
                    }
                }
            };
        }
    },
    {
        url: '/admin/releaseVersion/create',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            console.log(token);

            console.log(config.body);

            return {
                code: "00000",
                message: "成功上传"
            };
        }
    },
    {
        url: '/admin/releaseVersion/markDelete',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            console.log(token);
            const { version, platform } = config.query;

            console.log("version:" + version);
            console.log("platform:" + platform);

            return {
                code: "00000",
                message: "成功删除"
            };
        }
    },
    {
        url: '/admin/releaseVersion/modify',
        type: 'post',
        response: config => {
            const { token } = config.headers;
            console.log(token);

            console.log(config.body);

            return {
                code: "00000",
                message: "成功更改"
            };
        }
    }
];