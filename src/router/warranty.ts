import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const warrantyRouter: RouteConfig = {
  path: '/Warranty',
  component: Layout,
  redirect: 'noredirect',
  name: 'Warranty Management',
  meta: {
    roles:['superadmin','admin'],
    title: 'warrantyManagement.title',
    icon: 'bill'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/warranty/list.vue'),
      name: 'Warranty',
      meta: {
        title: 'warrantyManagement.warranty.title',
        noCache: true,
        icon: 'bill'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/warranty/manage.vue'),
      name: 'Edit Admin',
      props: {
        isEdit: true
      },
      meta: {
        title: 'warrantyManagement.warranty.edit',
        noCache: true,
        activeMenu: '/warranty/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/warranty/manage.vue'),
      name: 'Add Warranty',
      props: {
        isEdit: false
      },
      meta: {
        title: 'warrantyManagement.warranty.add',
        noCache: true,
        activeMenu: '/warranty/list',
        hidden: true
      }
    }
  ]
}

export default warrantyRouter
