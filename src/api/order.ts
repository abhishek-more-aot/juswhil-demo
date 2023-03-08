import request from '@/utils/request'
import { IOrderData } from './types'

export const defaultOrderData: IOrderData = {

  id: 0,
  enabled: true,
  isEdited: true,
  userId: null,
  addToCartIds: null,
  status: 0,
  addToCart: null,
  invoice: null,
  isDeleted: false,
  reason: '',
  multiplier: '',
  document: []
}
export const getOrders = (params: any) =>
  request({
    url: '/orders',
    method: 'get',
    params
  })

export const getOrderById = (id: number) =>
  request({
    url: `/orders/${id}`,
    method: 'get'
  })

export const getOrderInfo = (data: any) =>
  request({
    url: '/orders/me',
    method: 'post',
    data
  })

  export const updateStatus = (data: any) =>
  request({
    url: `/orders/update`,
    method: 'put',
    data
  })

export const updateOrder = (id: number, data: any) =>
  request({
    url: `/orders/${id}`,
    method: 'patch',
    data
  })

export const deleteOrder = (id: number) =>
  request({
    url: `/orders/${id}`,
    method: 'delete'
  })

export const addOrder = (data: any) =>
  request({
    url: '/orders/',
    method: 'post',
    data
  })

export const getOrderCount = (params: any) =>
  request({
    url: '/orders/count',
    method: 'get',
    params
  })
