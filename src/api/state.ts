import request from '@/utils/request'
import { IStateData } from './types'

export const defaultStateData: IStateData = {
  id: 0,
  name:'',
  countryId:1,
  
}
export const getstate = (params: any) =>
  request({
    url: '/states',
    method: 'get',
    params
  })

export const getstateById = (id: number) =>
  request({
    url: `/states/${id}`,
    method: 'get'
  })

export const getstateInfo = (data: any) =>
  request({
    url: '/states/me',
    method: 'post',
    data
  })

export const updatestate = (id: number, data: any) =>
  request({
    url: `/states/${id}`,
    method: 'patch',
    data
  })

export const deletestate = (id: number) =>
  request({
    url: `/states/${id}`,
    method: 'delete'
  })

export const addstate = (data: any) =>
  request({
    url: '/states',
    method: 'post',
    data
  })

export const getstateCount = () =>
  request({
    url: '/states/count',
    method: 'get'
  })
