import request from '@/utils/request'
import { IUnitData } from './types'

export const defaultUnitData: IUnitData = {
  id:	0,
enabled:	true,
name:'',
multiplier:0,
finalunits:'',
	
}
export const getUnit = (params: any) =>
  request({
    url: '/units',
    method: 'get',
    params
  })

export const getUnitcount = () =>
  request({
    url: '/units/count',
    method: 'get'
  })
export const checkUserExist = (data:any) =>
  request({
    url: '/units/username-check',
    method: 'post',
    data
  })
  export const checkEmailExist = (data:any) =>
  request({
    url: '/units/email-check',
    method: 'post',
    data
  })

export const getUnitId = (id: number) =>
  request({
    url: `/units/${id}`,
    method: 'get'
  })

export const updateUnit = (id: number, data: any) =>
  request({
    url: `/units/${id}`,
    method: 'patch',
    data
  })

export const deleteUnit = (adminname:string) =>
  request({
    url: `/units/${adminname}`,
    method: 'delete'
  })

  export const addUnit = (data: any) =>
  request({
    url: '/units',
    method: 'post',
    data
  })
