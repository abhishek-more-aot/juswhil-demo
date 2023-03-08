import request from '@/utils/request'
import { ICallbackData } from './types'

export const defaultCallbackData: ICallbackData = {
  id: 0,
  enabled: true,
  isIntrested: false,
  isContacted: false,
  number: ''
}
export const getCallback = (params: any) =>
  request({
    url: '/callback',
    method: 'get',
    params
  })

export const getCallbackById = (id: number) =>
  request({
    url: `/callback/${id}`,
    method: 'get'
  })

export const updateCallback = (id: number, data: any) =>
  request({
    url: `/callback/${id}`,
    method: 'patch',
    data
  })

export const deleteCallback = (id: string) =>
  request({
    url: `/callback/${id}`,
    method: 'delete'
  })

export const createCallback = (data: any) =>
  request({
    url: '/callback/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/callback/fetch',
    method: 'post',
    data
  })
