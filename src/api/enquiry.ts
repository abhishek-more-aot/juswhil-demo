import request from '@/utils/request'
import { IEnquiryData } from './types'

export const defaultEnquiryData: IEnquiryData = {
    id: 0,
    enabled: true,
    name: '',
    number: '',
    email: '',
    message: ''
}
export const getEnquiry = (params: any) =>
  request({
    url: '/contacts',
    method: 'get',
    params
  })

export const getEnquiryById = (id: number) =>
  request({
    url: `/contacts/${id}`,
    method: 'get'
  })

export const updateEnquiry = (id: number, data: any) =>
  request({
    url: `/contacts/${id}`,
    method: 'patch',
    data
  })

export const deleteEnquiry = (id: string) =>
  request({
    url: `/contacts/${id}`,
    method: 'delete'
  })

export const createEnquiry = (data: any) =>
  request({
    url: '/contacts/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/contacts/fetch',
    method: 'post',
    data
  })
