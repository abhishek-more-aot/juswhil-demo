import request from '@/utils/request'
import { ICategoryData } from './types'

export const defaultCategoryData: ICategoryData = {
  id: 0,
  enabled: true,
  name:'',
  image:'',
  priority: 0,
  // price: null,
  createdByFullName: '',
  isDeleted:false,
  isSubCategory: false
}
export const getCategorys = (params: any) =>
  request({
    url: '/categories',
    method: 'get',
    params
  })

export const getCategoryById = (id: number) =>
  request({
    url: `/categories/${id}`,
    method: 'get'
  })

export const getCategoryInfo = (data: any) =>
  request({
    url: '/categories/me',
    method: 'post',
    data
  })

export const getCategoryByEmail = (StoreCategoryemail: string) =>
  request({
    url: `/categories/${StoreCategoryemail}`,
    method: 'get'
  })

export const updateCategory = (id: number, data: any) =>
  request({
    url: `/categories/${id}`,
    method: 'patch',
    data
  })

export const StoreStoreCategory = (id: number, data: any) =>
  request({
    url: `/categories/${id}`,
    method: 'patch',
    data
  })

export const deleteCategory = (StoreCategoryname: string) =>
  request({
    url: `/categories/${StoreCategoryname}`,
    method: 'delete'
  })

export const addCategory = (data: any) =>
  request({
    url: '/categories',
    method: 'post',
    data
  })

export const getCategorysCount = (params: any) =>
  request({
    url: '/categories/count',
    method: 'get',
    params
  })

export const updateOrder = (data: any) =>
  request({
    url: '/categories/order',
    method: 'post',
    data
  })
