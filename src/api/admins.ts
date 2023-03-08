import request from '@/utils/request'
import { IAdminData } from './types'

export const defaultAdminData: IAdminData = {
  id: 0,
  enabled: true,
  fullName: '',
  email: '',
  contactNumber: '',
  password: '',
  gender: null,
  avatar: '',
  lastLogin: '',
  adminsRoleId: null,
  createdByFullName: '',
  adminsRole: {
    id: null,
    name: ''
  }
}
export const getAdmins = (params: any) =>
  request({
    url: '/admins',
    method: 'get',
    params
  })

  export const getAdminStats = () =>
  request({
    url: '/admins/statistics',
    method: 'get',
   
  })

export const getAdminById = (id: number) =>
  request({
    url: `/admins/${id}`,
    method: 'get'
  })

export const getAdminInfo = (data: any) =>
  request({
    url: '/admins/me',
    method: 'post',
    data
  })

export const getAdminByEmail = (adminemail: string) =>
  request({
    url: `/admins/${adminemail}`,
    method: 'get'
  })

export const updateAdmin = (id: number, data: any) =>
  request({
    url: `/admins/${id}`,
    method: 'patch',
    data
  })

export const deleteAdmin = (adminname: string) =>
  request({
    url: `/admins/${adminname}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/admins/login',
    method: 'post',
    data
  })

export const forgotPassword = (data: any) =>
  request({
    url: '/admins/forgot',
    method: 'post',
    data
  })
  
  export const changePassword = (data: any) =>
  request({
    url: '/admins/reset-password',
    method: 'post',
    data
  })

  export const UpdatePassword = (data: any) =>
  request({
    url: '/admins/change-password',
    method: 'put',
    data
  })

export const changePasswordLink = (data: any) =>
  request({
    url: '/admins/check-link',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/admins/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/admins/',
    method: 'post',
    data
  })

  export const logPostAdmin = (data: any) =>
  request({
    url: '/admin-logs',
    method: 'post',
    data
  })

  export const getLogsAdmin = (params: any) =>
  request({
    url: '/admin-logs',
    method: 'get',
    params
  })
  
