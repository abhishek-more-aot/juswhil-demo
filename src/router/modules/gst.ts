import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const gstRouter: RouteConfig = {
  path: '/gst',
  component: Layout,
  redirect: 'noredirect',
  name: 'gstManagement.title',
  meta: {
    roles:['superadmin','admin'],
    title: 'gstManagement.title',
    icon: 'bill',
    hidden: true
  },
  children: [
    {
      path: 'list/',
      component: () => import('@/views/gst/list.vue'),
      name: 'gstManagement.gst.manage',
      meta: {
        title: 'gstManagement.title',
        noCache: true,
        icon: 'bill'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/gst/manage.vue'),
      name: 'gstManagement.gst.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'gstManagement.gst.manage',
        noCache: true,
        activeMenu: '/gst/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/gst/manage.vue'),
      name: 'gstManagement.gst.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'gstManagement.gst.manage',
        noCache: true,
        activeMenu: '/gst/list',
        hidden: true
      }
    }
  ]
}

export default gstRouter
