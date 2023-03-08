import request from '@/utils/request'
import { IVideoData } from './types'

export const defaultVideoData: IVideoData = {
  id: 0,
  enabled: true,
  file:	'',
  visibility:	0,
  userId:	0,
  categoriesId:null,
  styleId:null,
  videoRating:	0,
  thumbnail: '',
  rejectReason: '',
  averagePeerRating:	0,
  averageCoachRating:	0,
  totalNumberOfUsersRated:	0,
  totalNumberOfCoachesRated:	0,
  totalViewsCount:	0,
  description:	'',
  totalCommentsCount:	0,
  totalBookmarksCount:	0
}
export const getVideos = (params: any) =>
  request({
    url: '/videos',
    method: 'get',
    params
  })

export const getVideoById = (id: number) =>
  request({
    url: `/videos/${id}`,
    method: 'get'
  })

export const getVideoInfo = (data: any) =>
  request({
    url: '/videos/me',
    method: 'post',
    data
  })

export const getVideoByEmail = (StoreVideoemail: string) =>
  request({
    url: `/videos/${StoreVideoemail}`,
    method: 'get'
  })

export const updateVideo = (id: number, data: any) =>
  request({
    url: `/videos/${id}`,
    method: 'patch',
    data
  })

export const StoreStoreVideo = (id: number, data: any) =>
  request({
    url: `/videos/${id}`,
    method: 'patch',
    data
  })

export const deleteVideo = (StoreVideoname: string) =>
  request({
    url: `/videos/${StoreVideoname}`,
    method: 'delete'
  })

export const addVideo = (data: any) =>
  request({
    url: '/videos/',
    method: 'post',
    data
  })

export const getVideosCount = (params: any) =>
  request({
    url: '/videos/count',
    method: 'get',
    params
  })

export const updateOrder = (data: any) =>
  request({
    url: '/videos/order',
    method: 'post',
    data
  })
