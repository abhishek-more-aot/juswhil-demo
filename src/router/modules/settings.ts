import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const SettingRouter: RouteConfig = {
  path: '/setting',
  component: Layout,
  redirect: 'noredirect',
  name: 'settingManagement.title',
  meta: {
    roles:['superadmin','admin'],
    title: 'settingManagement.title',
    icon: 'sliders-v-alt',
    hidden: true,
  },
  children: [
    // {
    //   path: 'list',
    //   component: () => import('@/views/setting/list.vue'),
    //   name: 'settingManagement.setting.manage',
    //   meta: {
    //     title: 'settingManagement.title',
    //     noCache: true,
    //     hidden:true,
    //     icon: 'sliders-v-alt'
    //   }
    // },
    {
      path: 'edit',
      component: () => import('@/views/setting/manage.vue'),
      name: 'settingManagement.setting.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'settingManagement.setting.manage',
        noCache: true,
        activeMenu: '/setting/list',
        icon: 'sliders-v-alt',
        header: 'App Setting',
        info: 'All the app settings can be changed from this module'
      }
    },
    {
      path: 'add',
      component: () => import('@/views/setting/manage.vue'),
      name: 'settingManagement.setting.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'settingManagement.setting.manage',
        noCache: true,
        activeMenu: '/setting/list',
        hidden: true
      }
    }
  ]
}

export default SettingRouter
