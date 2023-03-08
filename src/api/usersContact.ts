import request from '@/utils/request'
import { IUsersContactData } from './types'

export const defaultUserContactData: IUsersContactData = {

  id:0,
  enabled:true,
  fullName: "",
  email: "",
  message: "",
  contactNumber: ""
}
export const getUserContacts = (params: any) =>
  request({
    url: '/contacts',
    method: 'get',
    params
  })

export const getUserContactById = (id: number) =>
  request({
    url: `/contacts/${id}`,
    method: 'get'
  })

export const getUserContactInfo = (data: any) =>
  request({
    url: '/contacts/me',
    method: 'post',
    data
  })

// export const getUserContactByEmail = (Blogemail: string) =>
//   request({
//     url: `/contacts/${UserContactemail}`,
//     method: 'get'
//   })

export const updateUserContact = (id: number, data: any) =>
  request({
    url: `/contacts/${id}`,
    method: 'patch',
    data
  })

export const deleteUserContact= (id: number) =>
  request({
    url: `/contacts/${id}`,
    method: 'delete'
  })

export const addUserContact = (data: any) =>
  request({
    url: '/contacts/',
    method: 'post',
    data
  })

  export const getusersCount = (params: any) =>
    request({
        url: '/contacts/count',
        method: 'get',
        params
    })
 