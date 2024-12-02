import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: '小刻食堂后厨',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '小刻食堂后厨', icon: 'dashboard' }
        }]
    }
];

export const asyncRoutes = [
    {
        path: '/user',
        name: '用户信息',
        component: Layout,
        redirect: '/user/changePassword',
        meta: { title: '用户信息', icon: 'user' },
        children: [
            {
                path: 'createUser',
                name: '新建用户',
                component: () => import('@/views/user/createUser/index'),
                meta: { title: '新建用户', icon: 'peoples', roles: ['chef'] }
            },
            {
                path: 'changeUsername',
                name: '修改用户名',
                component: () => import('@/views/user/changeUsername/index'),
                meta: { title: '修改用户名', icon: 'el-icon-s-custom', roles: ['chef', 'cooker', 'architect', 'porter'] }
            },
            {
                path: 'changePassword',
                name: '修改密码',
                component: () => import('@/views/user/changePassword/index'),
                meta: { title: '修改密码', icon: 'lock', roles: ['chef', 'cooker', 'architect', 'porter'] }
            },
            {
                path: 'userList',
                name: '用户列表',
                component: () => import('@/views/user/userList/index'),
                meta: { title: '用户列表', icon: 'peoples', roles: ['chef'] }
            },
        ]
    },
    {
        path: '/canteen',
        name: 'canteen',
        component: Layout,
        redirect: '/canteen/announcement',
        meta: { title: '小刻食堂运营信息', icon: 'form' },
        children: [
            {
                path: 'announcement',
                name: '公告内容',
                component: () => import('@/views/canteen/announcement/index'),
                meta: { title: '公告内容', icon: 'el-icon-message-solid', roles: ['chef', 'cooker'] }
            },
            {
                path: 'videolist',
                name: '视频链接',
                component: () => import('@/views/canteen/videoList/index'),
                meta: { title: '视频链接', icon: 'el-icon-video-camera-solid', roles: ['chef', 'cooker'] }
            },
            {
                path: 'resource',
                name: '资源时间管理',
                component: () => import('@/views/canteen/resource/index'),
                meta: { title: '资源时间管理', icon: 'el-icon-files', roles: ['chef', 'cooker'] }
            },
            {
                path: 'pluginVersion',
                name: '插件更新',
                component: () => import('@/views/canteen/pluginVersion/index'),
                meta: { title: '插件更新', icon: 'el-icon-top', roles: ['chef', 'cooker'] }
            },
            {
                path: 'phoneVersion',
                name: '手机更新',
                component: () => import('@/views/canteen/phoneVersion/index'),
                meta: { title: '手机更新', icon: 'el-icon-mobile-phone', roles: ['chef', 'cooker'] }
            },
            {
                path: 'desktopVersion',
                name: '桌面更新',
                component: () => import('@/views/canteen/desktopVersion/index'),
                meta: { title: '桌面更新', icon: 'el-icon-s-platform', roles: ['chef', 'cooker'] }
            },
            {
                path: 'releaseVersion',
                name: '应用更新',
                component: () => import('@/views/canteen/releaseVersion/index'),
                meta: { title: '应用更新', icon: 'el-icon-refresh-right', roles: ['chef', 'cooker'] }
            },
            {
                path: 'toolLink',
                name: '工具链接',
                component: () => import('@/views/canteen/toolLink/index'),
                meta: { title: '工具链接', icon: 'el-icon-s-platform', roles: ['chef', 'cooker', 'porter'] }
            }
        ]
    },
    {
        path: '/honeyCake',
        name: 'HoneyCake',
        component: Layout,
        redirect: '/honeyCake/mansion',
        meta: { title: '罗德岛蜜饼工坊', icon: 'el-icon-house', roles: ['chef', 'architect'] },
        children: [
            {
                path: 'mansion',
                name: '饼学大厦',
                component: () => import('@/views/honeyCake/mansion/index'),
                meta: { title: '饼学大厦', icon: 'el-icon-office-building' }
            },
            {
                path: 'alternate',
                name: '轮换饼学',
                component: () => import('@/views/honeyCake/alternate/index'),
                meta: { title: '轮换饼学', icon: 'el-icon-refresh' }
            }
        ]
    },
    {
        path: '/fetcherConfig',
        component: Layout,
        meta: { title: '程序信息',  icon: 'el-icon-document-checked',roles: ['chef', 'cooker', 'architect'] },
        children: [
            {
                path: 'platformConfig',
                name: '配置平台',
                component: () => import('@/views/fetcherConfig/platformConfig/index'),
                meta: { title: '配置平台', icon: 'el-icon-s-platform' }
            },
            {
                path: 'datasourceConfig',
                name: '配置数据源',
                component: () => import('@/views/fetcherConfig/datasourceConfig/index'),
                meta: { title: '配置数据源', icon: 'el-icon-s-management' }
            },
            {
                path: 'globalConfig',
                name: '配置蹲饼器全局',
                component: () => import('@/views/fetcherConfig/globalConfig/index'),
                meta: { title: '配置蹲饼器全局', icon: 'el-icon-coin' }
            },
            {
                path: 'fetcherDetailConfig',
                name: '配置蹲饼器',
                component: () => import('@/views/fetcherConfig/fetcherDetailConfig/index'),
                meta: { title: '配置蹲饼器', icon: 'el-icon-s-operation' }
            }
        ]
    },
    {
        path: '/statistics',
        component: Layout,
        meta: { roles: ['chef', 'cooker', 'architect'] },
        children: [
            {
                path: 'index',
                name: '统计信息',
                component: () => import('@/views/statistics/index'),
                meta: { title: '统计信息', icon: 'el-icon-s-data' }
            }
        ]
    },


    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
    mode: 'hash', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
