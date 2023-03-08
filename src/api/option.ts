import request from '@/utils/request'
import { IOptionData } from './types'

export const defaultOptionData: IOptionData = {
  id: 0,
  enabled: true,
  name: '',
  image: '',
}
export const getOptions = (params: any) =>
  request({
    url: '/options',
    method: 'get',
    params
  })

export const getOptionById = (id: number) =>
  request({
    url: `/options/${id}`,
    method: 'get'
  })

export const getOptionInfo = (data: any) =>
  request({
    url: '/options/me',
    method: 'post',
    data
  })

export const updateOption = (id: number, data: any) =>
  request({
    url: `/options/${id}`,
    method: 'patch',
    data
  })

export const deleteOption = (Optionsname: string) =>
  request({
    url: `/options/${Optionsname}`,
    method: 'delete'
  })

export const addOption = (data: any) =>
  request({
    url: '/options/',
    method: 'post',
    data
  })

export const getOptionCount = (params: any) =>
  request({
    url: '/options/count',
    method: 'get',
    params
  })

  export const updateOrder = (data: any) =>
  request({
    url: '/options/order',
    method: 'post',
    data
  });

