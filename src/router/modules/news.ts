import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const NewsRouter: RouteConfig = {
  path: '/news',
  component: Layout,
  redirect: 'noredirect',
  name: 'NewsManagement.title',
  meta: {
    title: 'NewsManagement.title',
    icon: 'message'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/news/list.vue'),
      name: 'NewsManagement.News.manage',
      meta: {
        title: 'NewsManagement.title',
        noCache: true,
        icon: 'book-open',
        info: 'List of all News'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/news/manage.vue'),
      name: 'NewsManagement.News.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'NewsManagement.News.edit',
        noCache: true,
        activeMenu: '/news/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/news/manage.vue'),
      name: 'NewsManagement.News.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'NewsManagement.News.add',
        noCache: true,
        activeMenu: '/news/list',
        hidden: true
      }
    }
  
  ]
}

export default NewsRouter
