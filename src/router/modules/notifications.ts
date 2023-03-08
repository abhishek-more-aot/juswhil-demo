import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const NotificationRouter: RouteConfig = {
  path: '/notifications',
  component: Layout,
  redirect: 'noredirect',
  name: 'NotificationManagement.title',
  meta: {
    roles:['superadmin','admin'],
    title: 'NotificationManagement.title',
    icon: 'message',
    hidden:true,
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/notifications/list.vue'),
      name: 'NotificationManagement.Notification.manage',
      meta: {
        title: 'NotificationManagement.title',
        noCache: true,
        icon: 'message',
        info: 'List of all Notification'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/notifications/manage.vue'),
      name: 'NotificationManagement.Notification.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'NotificationManagement.Notification.manage',
        noCache: true,
        activeMenu: '/notifications/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/notifications/manage.vue'),
      name: 'NotificationManagement.Notification.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'NotificationManagement.Notification.manage',
        noCache: true,
        activeMenu: '/notifications/list',
        hidden: true
      }
    }
  
  ]
}

export default NotificationRouter
