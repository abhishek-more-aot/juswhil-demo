import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const CareerRouter: RouteConfig = {
  path: '/career',
  component: Layout,
  redirect: 'noredirect',
  name: 'CareerManagement.title',
  // meta: {
  //   title: 'CareerManagement.title',
  //   icon: 'message'
  // },
  children: [
    {
      path: 'list',
      component: () => import('@/views/career/list.vue'),
      name: 'CareerManagement.Career.manage',
      meta: {
        title: 'CareerManagement.title',
        noCache: true,
        icon: 'bag',
        info: 'List of all Career'
      }
    },
    // {
    //   path: 'edit/:id(\\d+)',
    //   component: () => import('@/views/career/manage.vue'),
    //   name: 'CareerManagement.Career.manage',
    //   props: {
    //     isEdit: true
    //   },
    //   meta: {
    //     title: 'CareerManagement.Career.manage',
    //     noCache: true,
    //     activeMenu: '/career/list',
    //     hidden: true
    //   }
    // },
    // {
    //   path: 'add',
    //   component: () => import('@/views/career/manage.vue'),
    //   name: 'CareerManagement.Career.manage',
    //   props: {
    //     isEdit: false
    //   },
    //   meta: {
    //     title: 'CareerManagement.Career.manage',
    //     noCache: true,
    //     activeMenu: '/career/list',
    //     hidden: true
    //   }
    // }
  
  ]
}

export default CareerRouter
