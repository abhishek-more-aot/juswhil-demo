import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router modules */
import adminRouter from './modules/admin'
import usersRouter from './modules/users'
import UserContactRouter from './modules/userContact'
import bannerRouter from './banner'
import trendingRouter from './trending'
import warrantyRouter from './warranty'
import GalleryRouter from './gallery'
import CategoryRouter from './modules/category'
import ProductRouter from './modules/product'
import orderRouter from './modules/order'
import optionRouter from './modules/options'
import OptionValueRouter from './modules/optionValues'
import NotificationRouter from './modules/notifications'
import NewsRouter from './modules/news'
import ArrivalsRouter from './modules/arrivals'
import TestimonialRouter from './modules/testimonial'
import SettingRouter from './modules/settings'
import unitRouter from './modules/unit'
import reasonRouter from './modules/reason'
import EnquiryRouter from './modules/enquiry'
import DocumentsRouter from './modules/documents'
import SubCategoryRouter from './modules/sub-category'
import gstRouter from './modules/gst'
import CallbackRouter from './modules/callback'
import { AdminModule } from '@/store/modules/admin'
import stateRouter from './modules/state' 
import citiesRouter from './modules/cities'
import AwardRouter from './modules/award'
import CareerRouter from './modules/career'

Vue.use(Router)
const myrole=AdminModule;
console.log(myrole);

/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['superadmin','admin','executive']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     true? {
  //       path: 'dashboard',
  //       component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
  //       name: 'Dashboard',
  //       meta: {
  //         roles: ['superadmin',],
  //         title: 'dashboard',
  //         icon: 'dashboard',
  //         affix: true
  //       }
  //     }:
  //     {
  //       path: 'dashboard',
  //       component: () => import(/* webpackChunkName: "dashboard" */ '@/views/order/list.vue'),
  //       name: 'Dashboard',
  //       meta: {
  //         roles: ['superadmin',],
  //         title: 'orderManagement.title',
  //         icon: 'shopping-cart',
  //         affix: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    meta: { hidden: true },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
        name: 'Profile',
        meta: {
          title: 'profile',
          icon: 'user',
          noCache: true
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  /** when your routing map is too long, you can split it into small modules **/

  {
    path: '/masters',
    redirect: 'noredirect',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/empty.vue'),
    name: 'master',
    meta: {
      roles:['superadmin','admin'],
      title: 'masterManagement.title',
      icon: 'sitemap',
      hidden:true,

    },
    children: [
      TestimonialRouter,
      EnquiryRouter,
      CallbackRouter,
      stateRouter,
      citiesRouter

    ]
  },
  adminRouter,
  usersRouter,
  orderRouter,
  reasonRouter,
  CategoryRouter,
  ProductRouter,
  bannerRouter,
  trendingRouter,
  warrantyRouter,
  GalleryRouter,
  NewsRouter,
  AwardRouter,
  CareerRouter,
  UserContactRouter,
  ArrivalsRouter,
  optionRouter,
  OptionValueRouter,
  unitRouter,
  DocumentsRouter,
  gstRouter,
  NotificationRouter,
  SettingRouter,
  {
    path: '/forgotPassword',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/forgotPassword.vue'),
    meta: { hidden: true }
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }

]

const createRouter = () => new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
