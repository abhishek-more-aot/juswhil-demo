import request from '@/utils/request'
import { IOptionValuesData } from './types'

export const defaultOptionValuesData: IOptionValuesData = {
  id: 0,
  enabled: true,
  name: '',
  optionsId: 0,
}
export const getOptionValues = (params: any) =>
  request({
    url: '/option-values',
    method: 'get',
    params
  })

export const getOptionValueById = (id: number) =>
  request({
    url: `/option-values/${id}`,
    method: 'get'
  })

export const updateOptionValue = (id: number, data: any) =>
  request({
    url: `/option-values/${id}`,
    method: 'patch',
    data
  })

export const deleteOptionValue = (ProductOptionValuesname: string) =>
  request({
    url: `/option-values/${ProductOptionValuesname}`,
    method: 'delete'
  })

export const addOptionValue = (data: any) =>
  request({
    url: '/option-values/',
    method: 'post',
    data
  })

export const getOptionValueCount = (params: any) =>
  request({
    url: '/option-values/count',
    method: 'get',
    params
  })
  
  export const updateOrder = (data: any) =>
  request({
    url: '/option-values/order',
    method: 'post',
    data
  });


