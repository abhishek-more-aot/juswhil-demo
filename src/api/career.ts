import request from '@/utils/request'
import { ICareerData } from './types'

export const defaultCareerData: ICareerData = {
  id: 0,
  enabled: true,
  designation: '',
  uploadResume: '',
  number: null,
  name:'',
  
}
export const getCareer = (params: any) =>
  request({
    url: '/career-page',
    method: 'get',
    params
  })

export const getCareerById = (id: number) =>
  request({
    url: `/career-page/${id}`,
    method: 'get'
  })

export const updateCareer = (id: number, data: any) =>
  request({
    url: `/career-page/${id}`,
    method: 'patch',
    data
  })
  
  export const updateOrder = (data: any) =>
  request({
    url: '/career-page/order',
    method: 'post',
    data
  })

export const deleteCareer = (id: string) =>
  request({
    url: `/career-page/${id}`,
    method: 'delete'
  })

export const createCareer = (data: any) =>
  request({
    url: '/career-page/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/career-page/fetch',
    method: 'post',
    data
  })
