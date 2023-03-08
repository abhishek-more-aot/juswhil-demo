import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const CategoryRouter: RouteConfig = {
  path: '/category',
  component: Layout,
  redirect: 'noredirect',
  name: 'categoryManagement.title',
  meta: {
    roles:['superadmin','admin'],
    title: 'categoryManagement.title',
    icon: 'create-dashboard',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/category/list.vue'),
      name: 'categoryManagement.title',
      meta: {
        title: 'categoryManagement.title',
        noCache: true,
        icon: 'create-dashboard',
        header: 'List of all categories',
        info: 'All category details are available here. You can search categories by applying filters on fields like category name. After clicking on category name you will be redirected to style, where all the style details are available'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/category/manage.vue'),
      name: 'categoryManagement.category.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'categoryManagement.category.edit',
        noCache: true,
        activeMenu: '/category/list',
        hidden: true,
        header: 'Edit category',
        info: 'You can edit category here'
      }
    },
    {
      path: 'add',
      component: () => import('@/views/category/manage.vue'),
      name: 'categoryManagement.category.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'categoryManagement.category.add',
        noCache: true,
        activeMenu: '/category/list',
        hidden: true,
        header: 'Add category',
        info: 'You can create category here'
      }
    }
  ]
}

export default CategoryRouter
