import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const CallbackRouter: RouteConfig = {
  path: '/callback',
  component: Layout,
  redirect: 'noredirect',
  name: 'CallbackManagement.title',
  meta: {
    title: 'CallbackManagement.title',
    icon: 'message'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/callback/list.vue'),
      name: 'CallbackManagement',
      meta: {
        title: 'CallbackManagement.title',
        noCache: true,
        icon: 'message',
        info: 'List of all Callback'
      }
    }
    // {
    //   path: 'edit/:id(\\d+)',
    //   component: () => import('@/views/news/manage.vue'),
    //   name: 'NewsManagement.News.manage',
    //   props: {
    //     isEdit: true
    //   },
    //   meta: {
    //     title: 'NewsManagement.News.manage',
    //     noCache: true,
    //     activeMenu: '/news/list',
    //     hidden: true
    //   }
    // },
    // {
    //   path: 'add',
    //   component: () => import('@/views/news/manage.vue'),
    //   name: 'NewsManagement.News.manage',
    //   props: {
    //     isEdit: false
    //   },
    //   meta: {
    //     title: 'NewsManagement.News.manage',
    //     noCache: true,
    //     activeMenu: '/news/list',
    //     hidden: true
    //   }
    // }
  
  ]
}

export default CallbackRouter
