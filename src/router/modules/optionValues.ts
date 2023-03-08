import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const OptionValueRouter: RouteConfig = {
  path: '/OptionValue',
  component: Layout,
  redirect: 'noredirect',
  name: 'OptionValueManagement.title',
  meta: {
    title: 'OptionValueManagement.title',
    icon: 'ticket',
    hidden:true,
    
  },
  children: [
    {
      path: 'list/:id(\\d+)',
      component: () => import('@/views/optionValue/list.vue'),
      name: 'OptionValueManagement.OptionValue.manage',
      meta: {
        title: 'OptionValueManagement.title',
        noCache: true,
        icon: 'ticket'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/optionValue/manage.vue'),
      name: 'OptionValueManagement.OptionValue.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'OptionValueManagement.OptionValue.manage',
        noCache: true,
        activeMenu: '/optionValue/list',
        hidden: true
      }
    },
    {
      path: 'add/:id(\\d+)',
      component: () => import('@/views/optionValue/manage.vue'),
      name: 'OptionValueManagement.OptionValue.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'OptionValueManagement.OptionValue.manage',
        noCache: true,
        activeMenu: '/optionValue/list',
        hidden: true
      }
    }
  ]
}

export default OptionValueRouter
