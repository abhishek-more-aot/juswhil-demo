import request from '@/utils/request'
import { IUsersData } from './types'

export const defaultUsersData: IUsersData = {

  id: 0,
  enabled: true,
  fullName: '',
  userType: null,
  email: '',
  companyName: '',
  pincode: null,
  isDeleted: false,
  adminId:null,
  countryId:1,
  state:[],
  stateId:null,
  cityId:null,
  city:[]

}
export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserById = (id: number) =>
  request({
    url: `/users/${id}`,
    method: 'get'
  })

export const getUserByContactNumber = (params:any) =>
  request({
    url: `/users/search`,
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/me',
    method: 'post',
    data
  })

export const sendOtp = () =>
  request({
    url: '/users/send-otp',
    method: 'post'
  })

export const verifyOtp = (data:any) =>
  request({
    url: '/users/verify--otp',
    method: 'post',
    data
  })

export const sendDeletionOtp = () =>
  request({
    url: '/users/send-deletion-otp',
    method: 'post'
  })

export const verifyDeletionOtp = (data:any) =>
  request({
    url: '/users/verify-deletion-otp',
    method: 'post',
    data
  })

// export const getUserByEmail = (Blogemail: string) =>
//   request({
//     url: `/users/${Useremail}`,
//     method: 'get'
//   })

export const updateUser = (id: number, data: any) =>
  request({
    url: `/users/${id}`,
    method: 'patch',
    data
  })

export const deleteUser = (id: number) =>
  request({
    url: `/users/${id}`,
    method: 'delete'
  })

export const addUser = (data: any) =>
  request({
    url: '/users/add',
    method: 'post',
    data
  })

export const getUsersCount = (params: any) =>
  request({
    url: '/users/userCount',
    method: 'get',
    params
  })

  export const getDistributorsCount = (params: any) =>
  request({
    url: '/users/count',
    method: 'get',
    params
  })
