import request from '@/utils/request'
import { IArrivalsData } from './types'

export const defaultArrivalsData: IArrivalsData = {
  id: 0,
  enabled: true,
  name: "",
  image: ""
}
export const getArrivals = (params: any) =>
  request({
    url: '/new-arrivals',
    method: 'get',
    params
  })

export const getArrivalsById = (id: number) =>
  request({
    url: `/new-arrivals/${id}`,
    method: 'get'
  })

export const updateArrivals = (id: number, data: any) =>
  request({
    url: `/new-arrivals/${id}`,
    method: 'patch',
    data
  })
  
  export const updateOrder = (data: any) =>
  request({
    url: '/new-arrivals/order',
    method: 'post',
    data
  })

export const deleteArrivals = (id: string) =>
  request({
    url: `/new-arrivals/${id}`,
    method: 'delete'
  })

export const createArrivals = (data: any) =>
  request({
    url: '/new-arrivals/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/new-arrivals/fetch',
    method: 'post',
    data
  })
