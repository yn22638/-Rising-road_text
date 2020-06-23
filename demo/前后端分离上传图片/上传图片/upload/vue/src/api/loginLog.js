import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/loginlog',
    method: 'get',
    params:query
  })
}