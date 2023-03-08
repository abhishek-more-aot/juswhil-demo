import request from '@/utils/request'
import { ISiteData } from '../types'

export const defaultSiteData: ISiteData = {
  id: 0,
  enabled: true,
  name: '',
  companyId: 0,
  company: {
    id: undefined
  }
}
export const getSites = (params: any) =>
  request({
    url: '/sites',
    method: 'get',
    params
  })

export const getSiteById = (id: number) =>
  request({
    url: `/sites/${id}`,
    method: 'get'
  })

export const updateSite = (id: number, data: any) =>
  request({
    url: `/sites/${id}`,
    method: 'patch',
    data
  })

export const deleteSite = (id: string) =>
  request({
    url: `/sites/${id}`,
    method: 'delete'
  })

export const createSite = (data: any) =>
  request({
    url: '/sites/',
    method: 'post',
    data
  })
