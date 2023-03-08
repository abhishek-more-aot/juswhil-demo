import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const DocumentsRouter: RouteConfig = {
  path: '/documents',
  component: Layout,
  redirect: 'noredirect',
  name: 'DocumentManagement.title',
  meta: {
    title: 'DocumentManagement.title',
    icon: 'message',
    hidden:true,
   
  },
  children: [
    {
      path: 'list/:id(\\d+)',
      component: () => import('@/views/documents/list.vue'),
      name: 'DocumentManagement.title',
      meta: {
        title: 'DocumentManagement.title',
        noCache: true,
        activeMenu: '/documents/list',
        hidden: true
      }
    },
    // {
    //   path: 'list/:id(\\d+)',
    //   component: () => import('@/views/documents/list.vue'),
    //   name: 'DocumentManagement.Document.manage',
    //   meta: {
    //     title: 'DocumentManagement.title',
    //     noCache: true,
    //     icon: 'message',
    //     info: 'List of all Documents'
    //   }
    // },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/documents/manage.vue'),
      name: 'DocumentManagement.Document.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'DocumentManagement.Document.manage',
        noCache: true,
        activeMenu: '/documents/list',
        hidden: true
      }
    },
   

    {
      path: 'add/:id(\\d+)',
      component: () => import('@/views/documents/manage.vue'),
      name: 'DocumentManagement.Document.manage',
      meta: {
        title: 'DocumentManagement.Document.manage',
        noCache: true,
        activeMenu: '/documents/list',
        hidden: true
      }
    },
    // {
    //   path: 'add',
    //   component: () => import('@/views/documents/manage.vue'),
    //   name: 'DocumentManagement.Document.manage',
    //   props: {
    //     isEdit: false
    //   },
    //   meta: {
    //     title: 'DocumentManagement.Document.manage',
    //     noCache: true,
    //     activeMenu: '/documents/list',
    //     hidden: true
    //   }
    // }
  
  ]
}

export default DocumentsRouter
