module.exports = [
    {
        url: '/admin/announcement/get',
        type: 'get',
        response: config => {
            const { token } = config.query
            console.log(token)

            let data = { "announcements": [{ "starTime": "2022-02-15 16:00:00", "overTime": "2022-02-22 03:59:59", "imgUrl": "https://ak.hycdn.cn/announce/images/20220125/e11f6c95958d685bbbedfd0fd799755a.JPG", "content": "<p><span style=\"color: #ff0000;\">故事集「阴云火花」</span>将于2月22号结束<br />结束时间为周二4:00<br />活动期间掉落聚酸酯组、晶体元件<br />活动开启时，快捷链接更新作业视频<br />或者点击 <drawer>这里</drawer> 快速跳转</p>", "notice": false }, { "starTime": "2022-02-22 04:00:00", "overTime": "2022-02-22 15:59:59", "imgUrl": "https://ak.hycdn.cn/announce/images/20220125/e11f6c95958d685bbbedfd0fd799755a.JPG", "content": "<p><span style=\"color: #ff0000;\">故事集「阴云火花」</span>将于22号结束<br />21号的周一别急着刷剿灭，等活动结束再刷<br />虽然是故事集，但是掉率也比主线高<br />理智尽量留给活动<br />下个活动是危机合约</p>", "notice": true }, { "starTime": "2022-02-15 04:00:00", "overTime": "2033-05-28 00:00:00", "imgUrl": "icon", "content": "<p>博士，谢谢你使用蹲饼。<br />如果觉得好用的话，希望能去<a href=\"https://github.com/Enraged-Dun-Cookie-Development-Team/Dun-Cookie-Vue\" target=\"_blank\" rel=\"noopener\">GitHub</a>上点个Star或者<br />去<a href=\"https://chrome.google.com/webstore/detail/%E8%B9%B2%E9%A5%BC-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cook/gblmdllhbodefkmimbcjpflhjneagkkd?hl=zh-CN\">Chrome商店</a>，<a href=\"https://microsoftedge.microsoft.com/addons/detail/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknight/jimmfliacfpeabcifcghmdankmdnmfmn?hl=zh-CN\">Edge商店</a>或<a href=\"https://addons.mozilla.org/zh-CN/firefox/addon/%E5%B0%8F%E5%88%BB%E9%A3%9F%E5%A0%82-%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E8%B9%B2%E9%A5%BC%E5%99%A8-arknights-cookies/\">Firefox商店</a>里面给个好评<br />也可以去<a href=\"https://arknightscommunity.drblack-system.com/15386.html\">泰拉通讯枢纽</a>里面回复我们，或者去<a href=\"https://www.bilibili.com/video/BV1jv411P7bR/\">b站视频</a>给个三连<br />欢迎加群 <a href=\"https://jq.qq.com/?_wv=1027&amp;k=Vod1uO13\">【蹲饼测试群】</a> 一起聊天，<a href=\"https://jq.qq.com/?_wv=1027&amp;k=Vod1uO13\">蹲饼</a>！</p>", "notice": false }] }
            return {
                code: 20000,
                data: data
            }
        }
    },
    {
        url: '/admin/announcement/submitList',
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