import request from '@/utils/request'
import { IReasonData } from './types'

export const defaultReasonData: IReasonData = {
  id: 0,
  enabled: true,
  reason: ''
}
export const getReasons = (params: any) =>
  request({
    url: '/reason',
    method: 'get',
    params
  })

export const getReasonById = (id: number) =>
  request({
    url: `/reason/${id}`,
    method: 'get'
  })

export const updateReason = (id: number, data: any) =>
  request({
    url: `/reason/${id}`,
    method: 'patch',
    data
  })

export const deleteReason = (id: number) =>
  request({
    url: `/reason/${id}`,
    method: 'delete'
  })

export const createReason = (data: any) =>
  request({
    url: '/reason/',
    method: 'post',
    data
  })
export const getRoutes = (params: any) =>
  request({
    url: '/routes',
    method: 'get',
    params
  })
