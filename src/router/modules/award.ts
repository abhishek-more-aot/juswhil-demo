import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const AwardRouter: RouteConfig = {
  path: '/award',
  component: Layout,
  redirect: 'noredirect',
  name: 'AwardManagement.title',
  meta: {
    title: 'AwardManagement.title',
    icon: 'message'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/award/list.vue'),
      name: 'AwardManagement.Award.manage',
      meta: {
        title: 'AwardManagement.title',
        noCache: true,
        icon: 'award',
        info: 'List of all Award'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/award/manage.vue'),
      name: 'AwardManagement.Award.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'AwardManagement.Award.edit',
        noCache: true,
        activeMenu: '/Award/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/award/manage.vue'),
      name: 'AwardManagement.Award.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'AwardManagement.Award.add',
        noCache: true,
        activeMenu: '/Award/list',
        hidden: true
      }
    }
  
  ]
}

export default AwardRouter
