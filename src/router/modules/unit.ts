import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const unitRouter: RouteConfig = {
  path: '/unit',
  component: Layout,
  redirect: 'noredirect',
  name: 'unitManagement.unit.title',
  meta: {
    roles:['superadmin','admin'],
    title: 'unitManagement.title',
    icon: 'weight',
    hidden: true,
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/unit/list.vue'),
      name: 'unitManagement.unit.manage',
      meta: {
        title: 'unitManagement.unit.title',
        noCache: true,
        icon: 'weight',
        info: 'List of all '
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/unit/manage.vue'),
      name: 'unitManagement.unit.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'unitManagement.unit.manage',
        noCache: true,
        activeMenu: '/unit/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/unit/manage.vue'),
      name: 'unitManagement.unit.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'unitManagement.unit.manage',
        noCache: true,
        activeMenu: '/unit/list',
        hidden: true
      }
    }

  ]
}

export default unitRouter
