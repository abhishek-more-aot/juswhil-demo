import request from '@/utils/request'
import { IProductOptionData } from './types'

export const defaultProductOptionData: IProductOptionData = {
  id: 0,
  enabled: true,
  productId: null,
  optionId: null
}
export const getProductOptions = (params: any) =>
  request({
    url: '/product-options',
    method: 'get',
    params
  })

export const getProductOptionById = (id: number) =>
  request({
    url: `/product-options/${id}`,
    method: 'get'
  })

export const getProductOptionInfo = (data: any) =>
  request({
    url: '/product-options/me',
    method: 'post',
    data
  })

  export const updateProductOptionIsSelected = (data: any) =>
  request({
    url: `/product-options/select`,
    method: 'patch',
    data
  })

export const getProductOptionByEmail = (ProductOptionsemail: string) =>
  request({
    url: `/product-options/${ProductOptionsemail}`,
    method: 'get'
  })

export const updateProductOption = (id: number, data: any) =>
  request({
    url: `/product-options/${id}`,
    method: 'patch',
    data
  })

export const deleteProductOption = (ProductOptionsname: string) =>
  request({
    url: `/product-options/${ProductOptionsname}`,
    method: 'delete'
  })

export const addProductOption = (data: any) =>
  request({
    url: '/product-options/',
    method: 'post',
    data
  })

export const getProductOptionCount = (params: any) =>
  request({
    url: '/product-options/count',
    method: 'get',
    params
  })

  export const updateOrder = (data: any) =>
  request({
    url: '/product-options/order',
    method: 'post',
    data
  });

