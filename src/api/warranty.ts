import request from '@/utils/request'
import { IWarrantyData } from './types'

export const defaultWarrantyData: IWarrantyData = {
  id: 0,
  enabled: true,
  firstName: "",
  lastName: "",
  contactNumber: "",
  email: "",
  productsId: null,
  purchasedFromId: null,
  purchasedDate: "",
  invoice: "",
  comments: "",
  categoriesId: null,
}
export const getWarranty = (params: any) =>
  request({
    url: '/Warranty',
    method: 'get',
    params
  })

export const getWarrantyById = (id: number) =>
  request({
    url: `/Warranty/${id}`,
    method: 'get'
  })

// export const getWarrantyInfo = (data: any) =>
//   request({
//     url: '/Warranty/me',
//     method: 'post',
//     data
//   })

// export const getWarrantyByEmail = (Banneremail: string) =>
//   request({
//     url: `/Warranty/${Banneremail}`,
//     method: 'get'
//   })

export const updateWarranty = (id: number, data: any) =>
  request({
    url: `/Warranty/${id}`,
    method: 'patch',
    data
  })

export const deleteWarranty = (id: string) =>
  request({
    url: `/Warranty/${id}`,
    method: 'delete'
  })

export const addWarranty = (data: any) =>
  request({
    url: '/Warranty/',
    method: 'post',
    data
  })

export const getWarrantyCount = (params: any) =>
  request({
    url: '/Warranty/count',
    method: 'get',
    params
  })

export const updateOrder = (data: any) =>
  request({
    url: '/Warranty/order',
    method: 'post',
    data
  });