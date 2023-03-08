import request from '@/utils/request'
import { IAmenityData } from '../types'

export const fileTransferHeaders = {}

export const defaultAmenityData: IAmenityData = {
  id: 0,
  enabled: true,
  name: '',
  icon: ''
}
export const getAmenities = (params: any) =>
  request({
    url: '/amenities',
    method: 'get',
    params
  })

export const getAmenityById = (id: number) =>
  request({
    url: `/amenities/${id}`,
    method: 'get'
  })

export const updateAmenity = (id: number, data: any) =>
  request({
    url: `/amenities/${id}`,
    method: 'patch',
    data
  })

export const deleteAmenity = (id: string) =>
  request({
    url: `/amenities/${id}`,
    method: 'delete'
  })

export const createAmenity = (data: any) =>
  request({
    url: '/amenities/',
    method: 'post',
    data
  })
