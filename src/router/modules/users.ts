import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const usersRouter: RouteConfig = {
  path: '/user',
  component: Layout,
  redirect: 'noredirect',
  name: 'userManagement.users.title',
  meta: {
    roles:['superadmin','RSM','admin','ASM','Zonal Head'],
    title: 'userManagement.title',
    icon: 'users-alt',
    hidden: true
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user/list.vue'),
      name: 'userManagement.users.manage',
      meta: {
        title: 'userManagement.users.title',
        noCache: true,
        icon: 'users-alt',
        header: 'List of all players',
        info: 'All player details are available here.  You can search player information by applying filters on fields like username, email, mobile number, gender etc. Green dot represents active player. Red dot represents disabled player'
      }
    },
    // {
    //   path: 'logs/:id(\\d+)',
    //   component: () => import('@/views/users/userlog.vue'),
    //   name: 'userManagement.users.manage',
    //   meta: {
    //     title: 'userManagement.userLogs.title',
    //     noCache: true,
    //     icon: 'tennis-ball',
    //     hidden: true,
    //     info: 'Player logs'
    //   }
    // },
    // {
    //   path: 'userProfile/:id(\\d+)',
    //   component: () => import('@/views/users/userprofile.vue'),
    //   name: 'userManagement.users.manage',
    //   meta: {
    //     title: 'userManagement.userProfile.title',
    //     noCache: true,
    //     icon: 'user',
    //     hidden: true,
    //     info: 'User Profile'
    //   }
    // },
    // {
    //   path: 'logs',
    //   component: () => import('@/views/users/userlogs.vue'),
    //   name: 'userManagement.users.manage',
    //   meta: {
    //     title: 'userManagement.userLogs.title',
    //     noCache: true,
    //     icon: 'tennis-ball',
    //     hidden: true,
    //     info: 'Player logs'
    //   }
    // },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/user/manage.vue'),
      name: 'userManagement.users.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'userManagement.users.manage',
        noCache: true,
        activeMenu: '/users/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/user/manage.vue'),
      name: 'userManagement.users.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'userManagement.users.manage',
        noCache: true,
        activeMenu: '/users/list',
        hidden: true
      }
    },
    // {
    //   path: '/users-roles/list',
    //   component: () => import(/* webpackChunkName: "admins-roles" */ '@/views/users/users-roles/list.vue'),
    //   name: 'Roles',
    //   meta: {
    //     title: 'userManagement.userRoles.title',
    //     noCache: true,
    //     icon: 'skill',
    //     hidden: true
    //   }
    // },
    // {
    //   path: '/users-roles/add',
    //   component: () => import(/* webpackChunkName: "admins-roles" */ '@/views/users/users-roles/manage.vue'),
    //   name: 'Add Role',
    //   props: {
    //     isEdit: false
    //   },
    //   meta: {
    //     title: 'userManagement.userRoles.manage',
    //     noCache: true,
    //     hidden: true
    //   }
    // },
    // {
    //   path: '/users-roles/edit/:id(\\d+)',
    //   component: () => import(/* webpackChunkName: "admins-roles" */ '@/views/users/users-roles/manage.vue'),
    //   name: 'Edit Role',
    //   props: {
    //     isEdit: true
    //   },
    //   meta: {
    //     title: 'userManagement.userRoles.manage',
    //     noCache: true,
    //     hidden: true
    //   }
    // }

  ]
}

export default usersRouter
