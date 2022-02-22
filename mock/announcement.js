module.exports = [
    {
        url: '/admin/announcement/get',
        type: 'get',
        response: config => {
            const { token } = config.query
            console.log(token)

            let data = {"announcements":[{"starTime":"2022-02-15 16:00:00","overTime":"2022-02-22 03:59:59","imgUrl":"https://ak.hycdn.cn/announce/images/20220125/e11f6c95958d685bbbedfd0fd799755a.JPG","content":"<p><font color=\"#e03b3b\">故事集「阴云火花」</font>将 于<font color=\"#ffba4b\">2月22号</font>结束</p><p>结束时间为<font color=\"#ffba4b\">周二4:00</font></p><p>活动期间掉落<font color=\"#e4d64a\">聚酸酯组</font>、<font color=\"#e4d64a\">晶体元件</font></p><p>活动开启时，快捷链接更新作业视频</p><p>或者点击 <drawer>这里</drawer> 快速跳转</p>","notice":false},{"starTime":"2022-02-22 04:00:00","overTime":"2022-02-22 15:59:59","imgUrl":"https://ak.hycdn.cn/announce/images/20220125/e11f6c95958d685bbbedfd0fd799755a.JPG","content":"<p><u>故事集「阴云火花」</u>将于<strike>22号</strike>结束</p><p><span style=\"background-color: rgb(228, 214, 74);\">21号的周一</span>别急着刷剿灭，等活动结束再刷</p><p>虽然是故事集，但是掉率也比主线高</p><p>理智尽量留给<i>活动</i></p><p>下个活动是<b>危机合约</b></p>","notice":true},{"starTime":"2022-02-15 04:00:00","overTime":"2033-05-28 00:00:00","imgUrl":"icon","content":"<p>博士，谢谢你使用蹲饼。</p><p>如果觉得好用的话，希望 能去GitHub上点个Star或者</p><p>去Chrome商店，Edge商店或Firefox商店里面给个好评</p><p>也可以去泰拉通讯枢纽里面回复我们，或者去b站视频给个三连</p><p>欢迎加群 【蹲饼测试群】 一起聊天， 蹲饼！</p>","notice":false}]}
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

            console.log(JSON.stringify(config.body))

            return {
                code: 20000,
                message: "成功上传"
            }
        }
    }
]
