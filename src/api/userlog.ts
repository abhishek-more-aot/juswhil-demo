import request from '@/utils/request'
// import { IUserLogData } from './types'

// export const defaultUserLogData: IUserLogData = {
//   id: 0,
//   enabled: true,
//   clickCount: 0,
//   createdBy: 0,
//   image: '',
//   redirectionOption: null,
//   redirectionValue: null,
//   priority: 0
// }
export const getUserLogs = (params: any) =>
  request({
    url: '/OrderStatusLog',
    method: 'get',
    params
  })

export const getUserLogById = (id: number) =>
  request({
    url: `/OrderStatusLog/${id}`,
    method: 'get'
  })

export const getUserLogInfo = (data: any) =>
  request({
    url: '/OrderStatusLog/me',
    method: 'post',
    data
  })

export const getUserLogByEmail = (UserLogemail: string) =>
  request({
    url: `/OrderStatusLog/${UserLogemail}`,
    method: 'get'
  })

export const updateUserLog = (id: number, data: any) =>
  request({
    url: `/OrderStatusLog/${id}`,
    method: 'patch',
    data
  })

export const deleteUserLog = (UserLogname: string) =>
  request({
    url: `/OrderStatusLog/${UserLogname}`,
    method: 'delete'
  })

export const addUserLog = (data: any) =>
  request({
    url: '/OrderStatusLog/',
    method: 'post',
    data
  })

export const getUserLogCount = (params: any) =>
  request({
    url: '/OrderStatusLog/count',
    method: 'get',
    params
  })

export const updateOrder = (data: any) =>
  request({
    url: '/OrderStatusLog/order',
    method: 'post',
    data
  });