import request from '@/utils/request'
import { IProductData } from './types'

export const defaultProductData: IProductData = {
  id: 0,
  enabled: true,
  name: '',
  image: '',
  // rating: 0,
  new: true,
  topSelling: true,
  inStock: true,
  freeDelivery: true,
  trending: false,
  priority: 0,
  description: '',
  video: '',
  modelNumber: '',
 
  productImages: [],
  categoriesId: null,
  subCategoryId: null,
  optionIds: null,
  unitId: null,
  qtymultiplier: 6,
  isDeleted: false
}
export const getProducts = (params: any) =>
  request({
    url: '/products',
    method: 'get',
    params
  })

export const availableOptions = (params: any) =>
  request({
    url: '/products/available-options',
    method: 'get',
    params
  })

export const availableValues = (params: any) =>
  request({
    url: '/products/available-values',
    method: 'get',
    params
  })

export const getProductById = (id: number) =>
  request({
    url: `/products/${id}`,
    method: 'get'
  })

export const getProductInfo = (data: any) =>
  request({
    url: '/products/me',
    method: 'post',
    data
  })

export const getProductByEmail = (Productemail: string) =>
  request({
    url: `/products/${Productemail}`,
    method: 'get'
  })

export const updateProduct = (id: number, data: any) =>
  request({
    url: `/products/${id}`,
    method: 'patch',
    data
  })

export const deleteProduct = (Productname: string) =>
  request({
    url: `/products/${Productname}`,
    method: 'delete'
  })

export const addProduct = (data: any) =>
  request({
    url: '/products/',
    method: 'post',
    data
  })

export const duplicateProduct = (data: any) =>
  request({
    url: '/products/duplicate',
    method: 'post',
    data
  })

export const getProductCount = () =>
  request({
    url: '/products/count',
    method: 'get',
  })

export const updateOrder = (data: any) =>
  request({
    url: '/products/order',
    method: 'post',
    data
  })
