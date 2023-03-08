import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const SubCategoryRouter: RouteConfig = {
  path: '/subCategory',
  component: Layout,
  redirect: 'noredirect',
  name: 'subCategoryManagement.title',
  meta: {
    title: 'subCategoryManagement.title',
    icon: 'create-dashboard',
    hidden: true
  },
  children: [
    {
      path: 'list/:id(\\d+)',
      component: () => import('@/views/sub-category/list.vue'),
      name: 'subCategoryManagement.subCategory.manage',
      meta: {
        title: 'subCategoryManagement.title',
        noCache: true,
        hidden: true,
        icon: 'create-dashboard',
        header: 'List of all categories',
        info: 'All subCategory details are available here. You can search categories by applying filters on fields like subCategory name. After clicking on subCategory name you will be redirected to style, where all the style details are available'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/sub-category/manage.vue'),
      name: 'subCategoryManagement.subCategory.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'subCategoryManagement.subCategory.manage',
        noCache: true,
        activeMenu: '/subCategory/list',
        hidden: true,
        header: 'Edit subCategory',
        info: 'You can edit subCategory here'
      }
    },
    {
      path: 'add/:id(\\d+)',
      component: () => import('@/views/sub-category/manage.vue'),
      name: 'subCategoryManagement.subCategory.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'subCategoryManagement.subCategory.manage',
        noCache: true,
        activeMenu: '/subCategory/list',
        hidden: true,
        header: 'Add subCategory',
        info: 'You can create subCategory here'
      }
    }
  ]
}

export default SubCategoryRouter
