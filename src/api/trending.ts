import request from '@/utils/request'
import { ITrendingData } from './types'

export const defaultTrendingData: ITrendingData = {
  id: 0,
  enabled: true,
  image: "",
  title: "",
  modelNo: "",
  modelName: "",
}
export const getTrending = (params: any) =>
  request({
    url: '/trending-products',
    method: 'get',
    params
  })

export const getTrendingById = (id: number) =>
  request({
    url: `/trending-products/${id}`,
    method: 'get'
  })

export const getTrendingInfo = (data: any) =>
  request({
    url: '/trending-products/me',
    method: 'post',
    data
  })

export const getTrendingByEmail = (Trendingemail: string) =>
  request({
    url: `/trending-products/${Trendingemail}`,
    method: 'get'
  })

export const updateTrending = (id: number, data: any) =>
  request({
    url: `/trending-products/${id}`,
    method: 'patch',
    data
  })

export const deleteTrending = (Trendingname: string) =>
  request({
    url: `/trending-products/${Trendingname}`,
    method: 'delete'
  })

export const addTrending = (data: any) =>
  request({
    url: '/trending-products/',
    method: 'post',
    data
  })

export const getTrendingCount = (params: any) =>
  request({
    url: '/trending-products/count',
    method: 'get',
    params
  })

export const updateOrder = (data: any) =>
  request({
    url: '/trending-products/order',
    method: 'post',
    data
  });