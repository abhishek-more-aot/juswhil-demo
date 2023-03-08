import request from '@/utils/request'
import { IBannerData } from './types'

export const defaultBannerData: IBannerData = {
  id: 0,
  enabled: true,
  image: "",
  order: null,
  name: "",
}
export const getBanners = (params: any) =>
  request({
    url: '/banners',
    method: 'get',
    params
  })

export const getBannerById = (id: number) =>
  request({
    url: `/banners/${id}`,
    method: 'get'
  })

export const getBannerInfo = (data: any) =>
  request({
    url: '/banners/me',
    method: 'post',
    data
  })

export const getBannerByEmail = (Banneremail: string) =>
  request({
    url: `/banners/${Banneremail}`,
    method: 'get'
  })

export const updateBanner = (id: number, data: any) =>
  request({
    url: `/banners/${id}`,
    method: 'patch',
    data
  })

export const deleteBanner = (Bannername: string) =>
  request({
    url: `/banners/${Bannername}`,
    method: 'delete'
  })

export const addBanner = (data: any) =>
  request({
    url: '/banners/',
    method: 'post',
    data
  })

export const getBannerCount = (params: any) =>
  request({
    url: '/banners/count',
    method: 'get',
    params
  })

export const updateOrder = (data: any) =>
  request({
    url: '/banners/order',
    method: 'post',
    data
  });