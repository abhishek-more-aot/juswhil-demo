import request from '@/utils/request'
import { ICompanyData } from '../types'

export const defaultCompanyData: ICompanyData = {
  id: 0,
  enabled: true,
  name: ''
}
export const getCompanies = (params: any) =>
  request({
    url: '/companies',
    method: 'get',
    params
  })

export const getCompanyById = (id: number) =>
  request({
    url: `/companies/${id}`,
    method: 'get'
  })

export const updateCompany = (id: number, data: any) =>
  request({
    url: `/companies/${id}`,
    method: 'patch',
    data
  })

export const deleteCompany = (id: string) =>
  request({
    url: `/companies/${id}`,
    method: 'delete'
  })

export const createCompany = (data: any) =>
  request({
    url: '/companies/',
    method: 'post',
    data
  })
export const getCompanyCount = (params: any) =>
  request({
    url: '/companies/count',
    method: 'get',
    params
  })
