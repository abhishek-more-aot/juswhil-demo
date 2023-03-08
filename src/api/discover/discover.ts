import request from '@/utils/request'
import { IDiscoverData } from '../types'

export const defaultDiscoverData: IDiscoverData = {

  id: 0,
  enabled: true,
  title: '',
  subTitle: null,
  description: null,
  image: null,
  link: null,
  howToRedeem: null,
  expiryDate: null,
  spocName: null,
  spocEmail: null,
  spocContactNumber: null,
  contract: null,
  discoverCategoryId: null,
  discoverCategory: {
    id: null
  },
  businessId: null,
  business: {
    id: null
  },
  companyId: null,
  company: {
    id: null
  },
  stateId: null,
  state: {
    id: null
  },
  countryId: null,
  country: {
    id: null
  },
  cityId: null,
  city: {
    id: null
  },
  categoryId: null,
  category: {
    id: null
  },
  siteId: null,
  site: {
    id: null
  },
  brandId: null,
  brand: {
    id: null
  }
}
export const getDiscover = (params: any) =>
  request({
    url: '/discover',
    method: 'get',
    params
  })

export const getDiscoverById = (id: number) =>
  request({
    url: `/discover/${id}`,
    method: 'get'
  })

export const updateDiscover = (id: number, data: any) =>
  request({
    url: `/discover/${id}`,
    method: 'patch',
    data
  })

export const deleteDiscover = (id: string) =>
  request({
    url: `/discover/${id}`,
    method: 'delete'
  })

export const createDiscover = (data: any) =>
  request({
    url: '/discover/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/discover/fetch',
    method: 'post',
    data
  })
