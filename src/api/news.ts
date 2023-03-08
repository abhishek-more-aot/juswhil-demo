import request from '@/utils/request'
import { INewsData } from './types'

export const defaultNewsData: INewsData = {
  id: 0,
  enabled: true,
  description: '',
  link: '',
  image: null,
  source:'',
  priority:0
}
export const getNews = (params: any) =>
  request({
    url: '/news',
    method: 'get',
    params
  })

export const getNewsById = (id: number) =>
  request({
    url: `/news/${id}`,
    method: 'get'
  })

export const updateNews = (id: number, data: any) =>
  request({
    url: `/news/${id}`,
    method: 'patch',
    data
  })
  
  export const updateOrder = (data: any) =>
  request({
    url: '/news/order',
    method: 'post',
    data
  })

export const deleteNews = (id: string) =>
  request({
    url: `/news/${id}`,
    method: 'delete'
  })

export const createNews = (data: any) =>
  request({
    url: '/news/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/news/fetch',
    method: 'post',
    data
  })
