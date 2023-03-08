import request from '@/utils/request'
import { ITitlesData } from '../types'

export const defaultTitlesData: ITitlesData = {
  id: 0,
  enabled: true,
  title: '',
  createdBy: 0,
  bookId: '',
  createdTimestamp: '',
  isChild: false,
  order: 0,
  parentId: '',
  pdf: '',
  updatedBy: 0,
  updatedTimestamp: ''
}
export const getTitles = (params: any) =>
  request({
    url: '/titles/',
    method: 'get',
    params
  })

export const updateTitleOrder = (data: any) =>
  request({
    url: 'titles/order',
    method: 'post',
    data
  })

export const getTitlesById = (id: number) =>
  request({
    url: `/titles/${id}`,
    method: 'get'
  })

export const updateTitles = (id: number, data: any) =>
  request({
    url: `/titles/${id}`,
    method: 'patch',
    data
  })

export const deleteTitles = (id: string) =>
  request({
    url: `/titles/${id}`,
    method: 'delete'
  })

export const createTitles = (data: any) =>
  request({
    url: '/titles/',
    method: 'post',
    data
  })
export const getTitlesCount = (params: any) =>
  request({
    url: '/titles/count',
    method: 'get',
    params
  })
