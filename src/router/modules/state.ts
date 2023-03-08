import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const stateRouter: RouteConfig = {
  path: '/state',
  component: Layout,
  redirect: 'noredirect',
  name: 'stateManagement.title',
  meta: {
    title: 'stateManagement.title',
    icon: 'map-marker-q'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/state/list.vue'),
      name: ' stateManagement.state.manage',
      meta: {
        title: 'stateManagement.state.manage',
        noCache: true,
        icon: 'navigator',
        header: 'List of all categories',
        info: 'All States details are available here. You can search categories by applying filters on fields like States name. After clicking on States name you will be redirected to style, where all the style details are available'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/state/manage.vue'),
      name: 'stateManagement.state.edit',
      props: {
        isEdit: true
      },
      meta: {
        title: 'stateManagement.state.edit',
        noCache: true,
        activeMenu: '/state/list',
        hidden: true,
        header: 'Edit States',
        info: 'You can edit States here'
      }
    },
    {
      path: 'add',
      component: () => import('@/views/state/manage.vue'),
      name: 'stateManagement.state.add',
      props: {
        isEdit: false
      },
      meta: {
        title: 'stateManagement.state.add',
        noCache: true,
        activeMenu: '/state/list',
        hidden: true,
        header: 'Add State',
        info: 'You can create States here'
      }
    }
  ]
}

export default stateRouter
