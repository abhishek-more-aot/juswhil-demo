import request from '@/utils/request'

export const getRatings = (params: any) =>
  request({
    url: '/ratings',
    method: 'get',
    params
  })

