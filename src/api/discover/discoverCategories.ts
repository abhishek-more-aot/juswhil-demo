import request from '@/utils/request'
import { IDiscoverCategoryData } from '../types'

export const fileTransferHeaders = {}

export const defaultDiscoverCategoryData: IDiscoverCategoryData = {
  id: 0,
  enabled: true,
  name: '',
  icon: ''
}
export const getDiscoverCategories = (params: any) =>
  request({
    url: 'discover-categories',
    method: 'get',
    params
  })

export const getDiscoverCategoryById = (id: number) =>
  request({
    url: `discover-categories/${id}`,
    method: 'get'
  })

export const updateDiscoverCategory = (id: number, data: any) =>
  request({
    url: `discover-categories/${id}`,
    method: 'patch',
    data
  })

export const deleteDiscoverCategory = (id: string) =>
  request({
    url: `discover-categories/${id}`,
    method: 'delete'
  })

export const createDiscoverCategory = (data: any) =>
  request({
    url: 'discover-categories/',
    method: 'post',
    data
  })
