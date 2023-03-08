import request from '@/utils/request'
import { IAwardData } from './types'

export const defaultAwardData: IAwardData = {
  id: 0,
  enabled: true,
  description: '',
  link: '',
  image: null,
  source:'',
  priority:0
}
export const getAward = (params: any) =>
  request({
    url: '/awards',
    method: 'get',
    params
  })

export const getAwardById = (id: number) =>
  request({
    url: `/awards/${id}`,
    method: 'get'
  })

export const updateAward = (id: number, data: any) =>
  request({
    url: `/awards/${id}`,
    method: 'patch',
    data
  })
  
  export const updateOrder = (data: any) =>
  request({
    url: '/awards/order',
    method: 'post',
    data
  })

export const deleteAward = (id: string) =>
  request({
    url: `/awards/${id}`,
    method: 'delete'
  })

export const createAward = (data: any) =>
  request({
    url: '/awards/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/awards/fetch',
    method: 'post',
    data
  })
