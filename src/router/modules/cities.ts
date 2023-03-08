import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const citiesRouter: RouteConfig = {
  path: '/cities',
  component: Layout,
  redirect: 'noredirect',
  name: 'citiesManagement.title',
  meta: {
    title: 'citiesManagement.title',
    icon: 'map',
    hidden:true
  },
  children: [
    {
      path: 'list/:id(\\d+)',
      component: () => import('@/views/cities/list.vue'),
      name: ' citiesManagement.cities.manage',
      meta: {
        title: 'citiesManagement.cities.manage',
        noCache: true,
        icon: 'map',
        header: 'List of all categories',
        info: 'All citiess details are available here. You can search categories by applying filters on fields like citiess name. After clicking on citiess name you will be redirected to style, where all the style details are available'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/cities/manage.vue'),
      name: 'citiesManagement.cities.edit',
      props: {
        isEdit: true
      },
      meta: {
        title: 'citiesManagement.cities.edit',
        noCache: true,
        activeMenu: '/cities/list',
        hidden: true,
        header: 'Edit citiess',
        info: 'You can edit citiess here'
      }
    },
    {
      path: 'add/:id(\\d+)',
      component: () => import('@/views/cities/manage.vue'),
      name: 'citiesManagement.cities.add',
      props: {
        isEdit: false
      },
      meta: {
        title: 'citiesManagement.cities.add',
        noCache: true,
        activeMenu: '/cities/list',
        hidden: true,
        header: 'Add cities',
        info: 'You can create citiess here'
      }
    }
  ]
}

export default citiesRouter
