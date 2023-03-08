import request from '@/utils/request'
import { IGalleryData } from './types'

export const defaultGalleryData: IGalleryData = {
  id: 0,
  enabled: true,
  clickCount: 0,
  createdBy: 0,
  order: 0,
  image: '',
  redirectionOption: null,
  redirectionValue: null,
  priority: 0
}
export const getGallerys = (params: any) =>
  request({
    url: '/gallerys',
    method: 'get',
    params
  })

export const getGalleryById = (id: number) =>
  request({
    url: `/gallerys/${id}`,
    method: 'get'
  })

export const getGalleryInfo = (data: any) =>
  request({
    url: '/gallerys/me',
    method: 'post',
    data
  })

export const getGalleryByEmail = (Galleryemail: string) =>
  request({
    url: `/gallerys/${Galleryemail}`,
    method: 'get'
  })

export const updateGallery = (id: number, data: any) =>
  request({
    url: `/gallerys/${id}`,
    method: 'patch',
    data
  })

export const deleteGallerys = (Galleryname: string) =>
  request({
    url: `/gallerys/${Galleryname}`,
    method: 'delete'
  })

export const addGallery = (data: any) =>
  request({
    url: '/gallerys/',
    method: 'post',
    data
  })

export const getGalleryCount = (params: any) =>
  request({
    url: '/gallerys/count',
    method: 'get',
    params
  })

export const updateOrder = (data: any) =>
  request({
    url: '/gallerys/order',
    method: 'post',
    data
  });