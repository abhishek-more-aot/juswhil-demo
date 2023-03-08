import request from '@/utils/request'
import { INotificationsData } from './types'

export const defaultNotificationData: INotificationsData = {
  id: 0,
  enabled: true,
  title: '',
  message: '',
  image: null,
  topic:'All',
  sendToAll: true,
}
export const getNotifications = (params: any) =>
  request({
    url: '/notification',
    method: 'get',
    params
  })

export const getNotificationsById = (id: number) =>
  request({
    url: `/notification/${id}`,
    method: 'get'
  })

export const updateNotifications = (id: number, data: any) =>
  request({
    url: `/notification/${id}`,
    method: 'patch',
    data
  })

export const deleteNotifications = (id: string) =>
  request({
    url: `/notification/${id}`,
    method: 'delete'
  })

export const createNotifications = (data: any) =>
  request({
    url: '/notification/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/notification/fetch',
    method: 'post',
    data
  })
