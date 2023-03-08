import request from '@/utils/request'
import { INotificationsData } from '../types'

export const defaultNotificationsData: INotificationsData = {
  id: 0,
  enabled: true,
  title: '',
  message: '',
  image: null,
  // params: 'NA',
  sendToAll: true,
  topic:'all'
}
export const getNotifications = (params: any) =>
  request({
    url: '/Notifications',
    method: 'get',
    params
  })

export const getNotificationsById = (id: number) =>
  request({
    url: `/Notifications/${id}`,
    method: 'get'
  })

export const updateNotifications = (id: number, data: any) =>
  request({
    url: `/Notifications/${id}`,
    method: 'patch',
    data
  })

export const deleteNotifications = (id: string) =>
  request({
    url: `/Notifications/${id}`,
    method: 'delete'
  })

export const createNotifications = (data: any) =>
  request({
    url: '/Notifications/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/Notifications/fetch',
    method: 'post',
    data
  })
