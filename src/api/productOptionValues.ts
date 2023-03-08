import request from '@/utils/request'
import { IProductOptionValuesData } from './types'

export const defaultProductOptionValuesData: IProductOptionValuesData = {
  id: 0,
  enabled: true,
  optionValueId: null,
  priority: 0,
  productOptionId: null,
}
export const getProductOptionValues = (params: any) =>
  request({
    url: '/product-option-values',
    method: 'get',
    params
  })

export const getProductOptionValueById = (id: number) =>
  request({
    url: `/product-option-values/${id}`,
    method: 'get'
  })

export const updateProductOptionValue = (id: number, data: any) =>
  request({
    url: `/product-option-values/${id}`,
    method: 'patch',
    data
  })

export const deleteProductOptionValue = (ProductOptionValueValuesname: string) =>
  request({
    url: `/product-option-values/${ProductOptionValueValuesname}`,
    method: 'delete'
  })

export const addProductOptionValue = (data: any) =>
  request({
    url: '/product-option-values/',
    method: 'post',
    data
  })

export const getProductOptionValueCount = (params: any) =>
  request({
    url: '/product-option-values/count',
    method: 'get',
    params
  })

  export const updateOrder = (data: any) =>
  request({
    url: '/product-option-values/order',
    method: 'post',
    data
  });

