import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const trendingRouter: RouteConfig = {
  path: '/trending',
  component: Layout,
  redirect: 'noredirect',
  name: 'Trending Management',
  meta: {
    roles:['superadmin','admin'],
    title: 'trendingManagement.title',
    icon: 'arrow-growth',
    hidden: true
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/trending/list.vue'),
      name: 'Trending',
      meta: {
        title: 'trendingManagement.title',
        noCache: true,
        icon: 'arrow-growth'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/trending/manage.vue'),
      name: 'Edit Admin',
      props: {
        isEdit: true
      },
      meta: {
        title: 'trendingManagement.trending.edit',
        noCache: true,
        activeMenu: '/trending/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/trending/manage.vue'),
      name: 'Add Trending',
      props: {
        isEdit: false
      },
      meta: {
        title: 'trendingManagement.trending.add',
        noCache: true,
        activeMenu: '/trending/list',
        hidden: true
      }
    }
  ]
}

export default trendingRouter
