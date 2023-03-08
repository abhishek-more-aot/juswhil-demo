import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const bannerRouter: RouteConfig = {
  path: '/banner',
  component: Layout,
  redirect: 'noredirect',
  name: 'Banner Management',
  meta: {
    roles:['superadmin','admin'],
    title: 'bannerManagement.title',
    icon: 'image',
    hidden: true
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/banner/list.vue'),
      name: 'Banners',
      meta: {
        title: 'bannerManagement.title',
        noCache: true,
        icon: 'image'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/banner/manage.vue'),
      name: 'Edit Admin',
      props: {
        isEdit: true
      },
      meta: {
        title: 'bannerManagement.banners.manage',
        noCache: true,
        activeMenu: '/banner/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/banner/manage.vue'),
      name: 'Add Banner',
      props: {
        isEdit: false
      },
      meta: {
        title: 'bannerManagement.banners.manage',
        noCache: true,
        activeMenu: '/banner/list',
        hidden: true
      }
    }
  ]
}

export default bannerRouter
