import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const ArrivalsRouter: RouteConfig = {
  path: '/arrivals',
  component: Layout,
  redirect: 'noredirect',
  name: 'ArrivalsManagement.title',
  meta: {
    title: 'ArrivalsManagement.title',
    icon: 'message',
    hidden:true,
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/arrivals/list.vue'),
      name: 'ArrivalsManagement.Arrivals.manage',
      meta: {
        title: 'ArrivalsManagement.title',
        noCache: true,
        icon: 'message',
        info: 'List of all Arrivals'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/arrivals/manage.vue'),
      name: 'ArrivalsManagement.Arrivals.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'ArrivalsManagement.Arrivals.manage',
        noCache: true,
        activeMenu: '/arrivals/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/arrivals/manage.vue'),
      name: 'ArrivalsManagement.Arrivals.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'ArrivalsManagement.Arrivals.manage',
        noCache: true,
        activeMenu: '/arrivals/list',
        hidden: true
      }
    }
  
  ]
}

export default ArrivalsRouter
