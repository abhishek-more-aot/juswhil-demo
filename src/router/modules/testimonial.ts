import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const TestimonialRouter: RouteConfig = {
  path: '/testimonial',
  component: Layout,
  redirect: 'noredirect',
  name: 'TestimonialManagement.title',
  meta: {
    title: 'TestimonialManagement.title',
    icon: 'create-dashboard'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/testimonial/list.vue'),
      name: 'TestimonialManagement.testimonial.manage',
      meta: {
        title: 'TestimonialManagement.title',
        noCache: true,
        icon: 'create-dashboard',
        header: 'List of all categories',
        info: 'All testimonial details are available here. You can search categories by applying filters on fields like testimonial name. After clicking on testimonial name you will be redirected to style, where all the style details are available'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/testimonial/manage.vue'),
      name: 'TestimonialManagement.testimonial.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'TestimonialManagement.testimonial.manage',
        noCache: true,
        activeMenu: '/testimonial/list',
        hidden: true,
        header: 'Edit testimonial',
        info: 'You can edit testimonial here'
      }
    },
    {
      path: 'add',
      component: () => import('@/views/testimonial/manage.vue'),
      name: 'TestimonialManagement.testimonials.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'TestimonialManagement.testimonial.manage',
        noCache: true,
        activeMenu: '/testimonial/list',
        hidden: true,
        header: 'Add testimonial',
        info: 'You can create testimonial here'
      }
    }
  ]
}

export default TestimonialRouter
