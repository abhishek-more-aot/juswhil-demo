import request from '@/utils/request'
import { ICityData } from './types'

export const defaultCityData: ICityData = {
  id: 0,
  enabled: true,
  name: '',
  tags:'',
  pincode:"",
  coordinates:'',
  stateId: 0,
  countryId: 1,
}
export const getcities = (params: any) =>
  request({
    url: '/cities',
    method: 'get',
    params
  })

export const getcitiesById = (id: number) =>
  request({
    url: `/cities/${id}`,
    method: 'get'
  })

export const getcitiesInfo = (data: any) =>
  request({
    url: '/cities/me',
    method: 'post',
    data
  })

export const updatecities = (id: number, data: any) =>
  request({
    url: `/cities/${id}`,
    method: 'patch',
    data
  })

export const deletecities = (id: number) =>
  request({
    url: `/cities/${id}`,
    method: 'delete'
  })

export const addcities = (data: any) =>
  request({
    url: '/cities',
    method: 'post',
    data
  })

export const getcitiesCount = () =>
  request({
    url: '/cities/count',
    method: 'get'
  })
