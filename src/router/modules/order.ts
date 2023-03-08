import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const orderRouter: RouteConfig = {
  path: '/order',
  component: Layout,
  redirect: 'noredirect',
  name: 'orderManagement.title',
  meta: {
    title: 'orderManagement.title',
    icon: 'shopping-cart',
    hidden: true
  },
  children: [
    {
      path: 'list/',
      component: () => import('@/views/order/list.vue'),
      name: 'orderManagement.order.manage',
      meta: {
        title: 'orderManagement.title',
        noCache: true,
        icon: 'shopping-cart'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/order/manage.vue'),
      name: 'orderManagement.order.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'orderManagement.order.manage',
        noCache: true,
        activeMenu: '/order/list',
        hidden: true
      }
    },
    {
      path: 'add/:id(\\d+)',
      component: () => import('@/views/order/manage.vue'),
      name: 'orderManagement.order.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'orderManagement.order.manage',
        noCache: true,
        activeMenu: '/order/list',
        hidden: true
      }
    },
    {
      path: 'orderPdf/:id(\\d+)',
      component: () => import('@/views/order.vue'),
      name: 'orderPdf',
      meta: {
        title: 'orderManagement.title',
        hidden: true,
        noCache: true,
        icon: 'shopping-cart'
      }
    }
  ]
}

export default orderRouter
