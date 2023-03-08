import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const GalleryRouter: RouteConfig = {
  path: '/gallery',
  component: Layout,
  redirect: 'noredirect',
  name: 'Gallery Management',
  meta: {
    title: 'GalleryManagement.title',
    icon: 'image',
    hidden:true,
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/gallerys/list.vue'),
      name: 'Gallery',
      meta: {
        title: 'GalleryManagement.title',
        noCache: true,
        icon: 'image'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/gallerys/manage.vue'),
      name: 'Edit Admin',
      props: {
        isEdit: true
      },
      meta: {
        title: 'GalleryManagement.Gallery.manage',
        noCache: true,
        activeMenu: '/gallerys/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/gallerys/manage.vue'),
      name: 'Add Image',
      props: {
        isEdit: false
      },
      meta: {
        title: 'GalleryManagement.Gallery.manage',
        noCache: true,
        activeMenu: '/gallerys/list',
        hidden: true
      }
    }
  ]
}

export default GalleryRouter
