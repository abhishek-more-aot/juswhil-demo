import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const reasonRouter: RouteConfig = {
  path: '/reason',
  component: Layout,
  redirect: 'noredirect',
  name: 'reasonManagement.title',
  meta: {
    roles:['superadmin','admin'],
    title: 'reasonManagement.title',
    icon: 'clipboard',
    hidden:true,
  },
  children: [
    {
      path: 'list/',
      component: () => import('@/views/reason/list.vue'),
      name: 'reasonManagement.reason.manage',
      meta: {
        roles:['superadmin','admin'],
        title: 'reasonManagement.title',
        noCache: true,
        icon: 'clipboard'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/reason/manage.vue'),
      name: 'reasonManagement.reason.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'reasonManagement.reason.manage',
        noCache: true,
        activeMenu: '/reason/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/reason/manage.vue'),
      name: 'reasonManagement.reason.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'reasonManagement.reason.manage',
        noCache: true,
        activeMenu: '/reason/list',
        hidden: true
      }
    }
  ]
}

export default reasonRouter
