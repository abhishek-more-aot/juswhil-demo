import request from '@/utils/request'
import { ICartData } from './types'

export const defaultCartData: ICartData = {
  id: 0,
  enabled: true,
  userId: 0,
  options: JSON,
  productId: 0,
  orderId: 0,
  quantity: 0,
  status: 0

}
export const getCart = (params: any) =>
  request({
    url: '/add-to-cart',
    method: 'get',
    params
  })

export const getCartcount = () =>
  request({
    url: '/add-to-cart/count',
    method: 'get'
  })
export const checkUserExist = (data:any) =>
  request({
    url: '/add-to-cart/username-check',
    method: 'post',
    data
  })
export const checkEmailExist = (data:any) =>
  request({
    url: '/add-to-cart/email-check',
    method: 'post',
    data
  })

export const getCartById = (id: number) =>
  request({
    url: `/add-to-cart/${id}`,
    method: 'get'
  })

export const updateCart = (id: number, data: any) =>
  request({
    url: `/add-to-cart/${id}`,
    method: 'patch',
    data
  })

export const deleteCart = (adminname:string) =>
  request({
    url: `/add-to-cart/${adminname}`,
    method: 'delete'
  })

export const addCart = (data: any) =>
  request({
    url: '/add-to-cart',
    method: 'post',
    data
  })
