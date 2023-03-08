import request from '@/utils/request'
import { ISubCategoryData } from './types'

export const defaultSubCategoryData: ISubCategoryData = {
  id: 0,
  enabled: true,
  name:'',
  image:'',
  feature: true,
  priority: 0,
  createdByFullName: '',
  isDeleted:false,
  categoriesId: null
}
export const getSubCategorys = (params: any) =>
  request({
    url: '/sub-category',
    method: 'get',
    params
  })

export const getSubCategoryById = (id: number) =>
  request({
    url: `/sub-category/${id}`,
    method: 'get'
  })

export const getSubCategoryInfo = (data: any) =>
  request({
    url: '/sub-category/me',
    method: 'post',
    data
  })

export const getSubCategoryByEmail = (StoreSubCategoryemail: string) =>
  request({
    url: `/sub-category/${StoreSubCategoryemail}`,
    method: 'get'
  })

export const updateSubCategory = (id: number, data: any) =>
  request({
    url: `/sub-category/${id}`,
    method: 'patch',
    data
  })

export const StoreStoreSubCategory = (id: number, data: any) =>
  request({
    url: `/sub-category/${id}`,
    method: 'patch',
    data
  })

export const deleteSubCategory = (StoreSubCategoryname: string) =>
  request({
    url: `/sub-category/${StoreSubCategoryname}`,
    method: 'delete'
  })

export const addSubCategory = (data: any) =>
  request({
    url: '/sub-category',
    method: 'post',
    data
  })

export const getSubSubCategorysCount = (params: any) =>
  request({
    url: '/sub-category/count',
    method: 'get',
    params
  })

export const updateOrder = (data: any) =>
  request({
    url: '/sub-category/order',
    method: 'post',
    data
  })
