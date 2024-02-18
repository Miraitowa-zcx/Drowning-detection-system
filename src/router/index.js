import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Cookies from "js-cookie";

Vue.use(VueRouter)

const routes = [

    //  ===   登录   ===
    {path: '/login', name: 'Login', component: () => import('@/views/login/Login.vue')},

    //  ===   注册   ===
    {path: '/register', name: 'Register', component: () => import('@/views/register/register.vue')},

    //  ===   一级路由   ===
    {
        path: '/', name: 'Layout', component: Layout, redirect: '/home',

        // 二级路由
        children: [

            //  ===   主页   ===
            {path: 'home', name: 'Home', component: () => import('@/views/home/HomeView.vue')},

            // ====   摄像头管理   ====
            {path: 'deviceList', name: 'DeviceList', component: () => import('@/views/camera/deviceList.vue')},

            //  ===   设备数据   ====
            {path: 'deviceInfo', name: 'DeviceInfo', component: () => import('@/views/data/deviceInfo.vue')},
            {path: 'eventInfo', name: 'EventInfo', component: () => import('@/views/data/eventInfo.vue')},

            //  ===   系统管理  ===
            {path: 'systemMenu', name: 'SystemMenu', component: () => import('@/views/system/SystemMenu.vue')},
            {path: 'systemDictionary', name: 'SystemDictionary', component: () => import('@/views/system/SystemDictionary.vue')},

            //  ===   用户管理  ===
            {path: 'userManage', name: 'UserManage', component: () => import('@/views/user/UserManage.vue')},
            {path: 'roleManage', name: 'RoleManage', component: () => import('@/views/user/RoleManage.vue')}
        ]
    },
    {path: "*", component: () => import('@/views/404.vue')}
]

const router = new VueRouter({mode: 'history', base: process.env.BASE_URL, routes})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   }
//   const admin = Cookies.get("admin")
//   if (!admin && to.path !== '/login' && to.path !== '/register') {
//     return next('/login')
//   }
//   next()
// })

// 针对ElementUI导航栏中重复导航报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default router