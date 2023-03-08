import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const EnquiryRouter: RouteConfig = {
  path: '/enquiry',
  component: Layout,
  redirect: 'noredirect',
  name: 'EnquiryManagement.title',
  meta: {
    title: 'EnquiryManagement.title',
    icon: 'message'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/enquiry/list.vue'),
      name: 'EnquiryManagement',
      meta: {
        title: 'EnquiryManagement.title',
        noCache: true,
        icon: 'message',
        info: 'List of all Enquiry'
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

export default EnquiryRouter
