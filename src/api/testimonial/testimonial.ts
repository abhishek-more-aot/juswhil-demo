import request from '@/utils/request'
import { ITestimonialData } from '../types'

export const defaultTestimonialData: ITestimonialData = {
  id: 0,
  enabled: true,
  name: '',
  review: '',
  image: null,
  location: '',
//   // params: 'NA',
//   sendToAll: true,
//   topic:'all'
}
export const getTestimonial = (params: any) =>
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

export const deleteTestimonial = (id: string) =>
  request({
    url: `/testimonial/${id}`,
    method: 'delete'
  })

export const createTestimonial = (data: any) =>
  request({
    url: '/testimonial/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/testimonials/fetch',
    method: 'post',
    data
  })
