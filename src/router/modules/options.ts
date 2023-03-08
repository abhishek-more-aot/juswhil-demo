import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const optionRouter: RouteConfig = {
  path: '/option',
  component: Layout,
  redirect: 'noredirect',
  name: 'optionManagement.title',
  meta: {
    roles:['superadmin','admin'],
    title: 'optionManagement.title',
    icon: 'box', 
    hidden:true,   
    
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/option/list.vue'),
      name: 'optionManagement.option.manage',
      meta: {
        title: 'optionManagement.title',
        noCache: true,
        icon: 'box'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/option/manage.vue'),
      name: 'optionManagement.option.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'optionManagement.option.manage',
        noCache: true,
        activeMenu: '/option/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/option/manage.vue'),
      name: 'optionManagement.option.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'optionManagement.option.manage',
        noCache: true,
        activeMenu: '/option/list',
        hidden: true
      }
    }
  ]
}

export default optionRouter
