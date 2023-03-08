import request from '@/utils/request'
import { ISettingData } from './types'

export const defaultSettingData: ISettingData = {
  id: 0,
  enabled: true,
  version: '',
  appName: '',
  shareAppMessage: '',
  contactNumber: '',
  playstoreLink: '',
  appstoreLink: '',
  aboutUsLink: '',
  contactUsLink: '',
  termsAndConditionsLink: '',
  privacyPolicyLink: '',
  iosVersion: '',
  whatappNumber: ''

}
export const getSetting = (params: any) =>
  request({
    url: '/settings',
    method: 'get',
    params
  })

export const getSettingById = (id: number) =>
  request({
    url: `/settings/${id}`,
    method: 'get'
  })

export const getSettingInfo = (data: any) =>
  request({
    url: '/settings/me',
    method: 'post',
    data
  })

export const getSettingByEmail = (StoreSettingemail: string) =>
  request({
    url: `/settings/${StoreSettingemail}`,
    method: 'get'
  })

export const updateSetting = (id: number, data: any) =>
  request({
    url: `/settings/${id}`,
    method: 'patch',
    data
  })

export const StoreStoreSetting = (id: number, data: any) =>
  request({
    url: `/settings/${id}`,
    method: 'patch',
    data
  })

export const deleteSetting = (StoreSettingname: string) =>
  request({
    url: `/settings/${StoreSettingname}`,
    method: 'delete'
  })

export const addSetting = (data: any) =>
  request({
    url: '/settings/',
    method: 'post',
    data
  })

export const getSettingCount = (params: any) =>
  request({
    url: '/settings/count',
    method: 'get',
    params
  })
