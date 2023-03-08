import request from '@/utils/request'
import { ITestimonialData } from './types'

export const defaultTestimonialData: ITestimonialData = {
  id: 0,
  enabled: true,
  name: '',
  review: '',
  image: null,
  location: '',
  // feature: true
//   topic: 'All',
//   sendToAll: true
}
export const getTestimonials = (params: any) =>
  request({
    url: '/testimonials',
    method: 'get',
    params
  })

export const getTestimonialById = (id: number) =>
  request({
    url: `/testimonials/${id}`,
    method: 'get'
  })

export const updateTestimonial = (id: number, data: any) =>
  request({
    url: `/testimonials/${id}`,
    method: 'patch',
    data
  })

  export const addTestimonial = (data: any) =>
  request({
    url: '/testimonials',
    method: 'post',
    data
  })

export const deleteTestimonial = (id: string) =>
  request({
    url: `/testimonials/${id}`,
    method: 'delete'
  })

export const createTestimonial = (data: any) =>
  request({
    url: '/testimonials/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/testimonials/fetch',
    method: 'post',
    data
  })
