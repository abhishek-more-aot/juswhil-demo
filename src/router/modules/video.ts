import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const VideoRouter: RouteConfig = {
  path: '/video',
  component: Layout,
  redirect: 'noredirect',
  name: 'VideoManagement.title',
  meta: {
    title: 'VideoManagement.title',
    icon: 'clapper-board'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/video/list.vue'),
      name: 'VideoManagement.Video.manage',
      meta: {
        title: 'VideoManagement.title',
        noCache: true,
        icon: 'clapper-board',
        header: 'List of all videos',
        info: 'All video details are available here. You can search videos by applying filters'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/video/manage.vue'),
      name: 'VideoManagement.Video.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'VideoManagement.Video.manage',
        noCache: true,
        activeMenu: '/video/list',
        hidden: true
      }
    },
    {
      path: 'videoinfo/:id(\\d+)',
      component: () => import('@/views/video/videoinfo.vue'),
      name: 'VideoManagement.Video.manage',
      meta: {
        title: 'VideoManagement.videoinfo.title',
        noCache: true,
        // icon: 'user',
        hidden: true,
        info: 'User Profile'
      }
    },
    // {
    //   path: 'add',
    //   component: () => import('@/views/video/manage.vue'),
    //   name: 'VideoManagement.Video.manage',
    //   props: {
    //     isEdit: false
    //   },
    //   meta: {
    //     title: 'VideoManagement.Video.manage',
    //     noCache: true,
    //     activeMenu: '/video/list',
    //     hidden: true
    //   }
    // }
  ]
}

export default VideoRouter
