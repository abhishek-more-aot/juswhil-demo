import request from '@/utils/request'

export const toggleEnable = (url: string, data: any) =>
  request({
    url: url,
    method: 'patch',
    data
  })

export const uploadFile = (data: any, onUploadProgressCallBack: any) =>
  request({
    url: '/common/upload',
    method: 'post',
    data,
    onUploadProgress: onUploadProgressCallBack
  })

export const getAppVersions = () =>
  request({
    url: '/common/app_version',
    method: 'get'
  })
