import request from '@/utils/request'
import { IDocumentsData } from './types'

export const defaultDocumentsData: IDocumentsData = {
  id: 0,
  enabled: true,
  title:'',
  document:'',
  // documentMasterId: null,
  // image: '',
  orderId: null,
  tags:[],
  // documentMaster: []
}
export const getDocuments = (params: any) =>
  request({
    url: '/orders-document',
    method: 'get',
    params
  })

export const getDocumentsById = (id: number) =>
  request({
    url: `/orders-document/${id}`,
    method: 'get'
  })

export const updateDocument = (id: number, data: any) =>
  request({
    url: `/orders-document/${id}`,
    method: 'patch',
    data
  })

export const deleteDocument = (id: string) =>
  request({
    url: `/orders-document/${id}`,
    method: 'delete'
  })

export const createDocument = (data: any) =>
  request({
    url: '/orders-document/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/orders-document/fetch',
    method: 'post',
    data
  })
