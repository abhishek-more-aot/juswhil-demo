import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const ProductRouter: RouteConfig = {
  path: '/product',
  component: Layout,
  redirect: 'noredirect',
  name: 'ProductManagement.title',
  meta: {
    title: 'ProductManagement.title',
    icon: 'cube',
    hidden: true
  },
  children: [
    {
      path: 'list/:categoriesId(\\d+)/:subCategoryId(\\d+)',
      component: () => import('@/views/product/list.vue'),
      name: 'ProductManagement.Product.manage',
      meta: {
        title: 'ProductManagement.title',
        noCache: true,
        icon: 'cube',
        hidden: true
      }
    },
    {
      path: 'list/:categoriesId(\\d+)',
      component: () => import('@/views/product/list.vue'),
      name: 'ProductManagement.Product.manage',
      meta: {   
        title: 'ProductManagement.title',
        noCache: true,
        icon: 'cube',
        hidden: true
      }
    },
    {
      path: 'options/:id(\\d+)',
      component: () => import('@/views/product/components/OptionSelect.vue'),
      name: 'ProductOptionManagement.Option.manage',
      meta: {
        title: 'ProductOptionManagement.title',
        noCache: true,
        icon: 'cube',
        hidden: true
      }
    },
    {
      path: 'values/:id(\\d+)/:optionId(\\d+)',
      component: () => import('@/views/product/ValueSelectList.vue'),
      name: 'ProductOptionManagement.Option.manage',
      meta: {
        title: 'ProductOptionManagement.title',
        noCache: true,
        icon: 'cube',
        hidden: true
      }
    },
    {
      path: 'values/add/:id(\\d+)/:optionId(\\d+)',
      component: () => import('@/views/product/components/ValueSelect.vue'),
      name: 'ProductOptionManagement.Option.manage',
      meta: {
        title: 'ProductOptionManagement.title',
        noCache: true,
        icon: 'cube',
        hidden: true
      }
    },
    {
      path: 'values/edit/:id(\\d+)',
      component: () => import('@/views/product/components/ValueSelect.vue'),
      name: 'ProductOptionManagement.Option.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'ProductOptionManagement.title',
        noCache: true,
        icon: 'cube',
        hidden: true
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/product/manage.vue'),
      name: 'ProductManagement.Product.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'ProductManagement.Product.edit',
        noCache: true,
        activeMenu: '/product/list',
        hidden: true
      }
    },
    {
      path: 'add/:categoriesId(\\d+)/:subCategoryId(\\d+)',
      component: () => import('@/views/product/manage.vue'),
      name: 'ProductManagement.Product.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'ProductManagement.Product.manage',
        noCache: true,
        hidden: true
      }
    },
    {
      path: 'add/:categoriesId(\\d+)',
      component: () => import('@/views/product/manage.vue'),
      name: 'ProductManagement.Product.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'ProductManagement.Product.add',
        noCache: true,
        hidden: true
      }
    }
  ]
}

export default ProductRouter
