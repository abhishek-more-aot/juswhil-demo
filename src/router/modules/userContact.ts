import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const UserContactRouter: RouteConfig = {
  path: '/userContact',
  component: Layout,
  redirect: 'noredirect',
  name: 'UserContactManagement.title',
  meta: {
    title: 'UserContactManagement.title',
    icon: 'ticket',
  },
  children: [
    {
      path: 'list/',
      component: () => import('@/views/userContact/list.vue'),
      name: 'UserContactManagement.UserContact.manage',
      meta: {
        title: 'UserContactManagement.title',
        noCache: true,
        icon: 'user-plus'
      }
    },
    {
      path: 'edit/',
      component: () => import('@/views/userContact/manage.vue'),
      name: 'UserContactManagement.UserContact.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'UserContactManagement.UserContact.manage',
        noCache: true,
        activeMenu: '/userContact/list',
        hidden: true
      }
    },
    {
      path: 'add/',
      component: () => import('@/views/userContact/manage.vue'),
      name: 'UserContactManagement.UserContact.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'UserContactManagement.UserContact.manage',
        noCache: true,
        activeMenu: '/userContact/list',
        hidden: true
      }
    }
  ]
}

export default UserContactRouter
