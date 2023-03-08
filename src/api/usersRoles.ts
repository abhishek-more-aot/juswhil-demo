import request from '@/utils/request'
import { IUsersRoleData } from './types'

export const defaultUsersRoleData: IUsersRoleData = {
  id: 0,
  enabled: true,
  name: ''
}

export const getUsersRoles = (params: any) =>
  request({
    url: '/users-roles',
    method: 'get',
    params
  })

export const getUsersRoleById = (id: number) =>
  request({
    url: `/users-roles/${id}`,
    method: 'get'
  })

export const updateUsersRole = (id: number, data: any) =>
  request({
    url: `/users-roles/${id}`,
    method: 'patch',
    data
  })

export const deleteUsersRole = (id: number) =>
  request({
    url: `/users-roles/${id}`,
    method: 'delete'
  })

export const createUsersRole = (data: any) =>
  request({
    url: '/users-roles/',
    method: 'post',
    data
  })

export const getRoutes = (params: any) =>
  request({
    url: '/routes',
    method: 'get',
    params
  })
