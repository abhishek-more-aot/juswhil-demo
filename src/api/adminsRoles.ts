import request from '@/utils/request'
import { IAdminsRoleData } from './types'

export const defaultAdminsRoleData: IAdminsRoleData = {
  id: 0,
  enabled: true,
  name: ''
}
export const getAdminsRoles = (params: any) =>
  request({
    url: '/admins-roles',
    method: 'get',
    params
  })

export const getAdminsRoleById = (id: number) =>
  request({
    url: `/admins-roles/${id}`,
    method: 'get'
  })

export const updateAdminsRole = (id: number, data: any) =>
  request({
    url: `/admins-roles/${id}`,
    method: 'patch',
    data
  })

export const deleteAdminsRole = (id: number) =>
  request({
    url: `/admins-roles/${id}`,
    method: 'delete'
  })

export const createAdminsRole = (data: any) =>
  request({
    url: '/admins-roles/',
    method: 'post',
    data
  })
export const getRoutes = (params: any) =>
  request({
    url: '/routes',
    method: 'get',
    params
  })
