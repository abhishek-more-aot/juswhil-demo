import request from '@/utils/request'
import { IGSTData } from './types'

export const defaultGSTData: IGSTData = {
  id: 0,
  enabled: true,
  hsncode: '',
  gstPercentage: 0
}
export const getGst = (params: any) =>
  request({
    url: '/gst',
    method: 'get',
    params
  })

export const getGstById = (id: number) =>
  request({
    url: `/gst/${id}`,
    method: 'get'
  })

export const updateGst = (id: number, data: any) =>
  request({
    url: `/gst/${id}`,
    method: 'patch',
    data
  })

export const deleteGst = (id: number) =>
  request({
    url: `/gst/${id}`,
    method: 'delete'
  })

export const createGst = (data: any) =>
  request({
    url: '/gst/',
    method: 'post',
    data
  })
export const getGstCount = () =>
  request({
    url: '/gst/count',
    method: 'get'
  })
