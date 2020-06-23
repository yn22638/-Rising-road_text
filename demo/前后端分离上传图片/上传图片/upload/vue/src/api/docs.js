import request from '@/utils/request'

export function index(data) {
  return request({
    url: '/user/docs',
    method: 'get',
    params:data
  })
}

export function create(data) {
  return request({
    url: '/user/docs',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url:`/user/docs/${id}`,
    method:'delete'
  })
}

export function show(id) {
  return request({
    url:`/user/docs/${id}`,
    method:'get'
  })
}

export function update(id, option) {
  return request({
    url:`/user/docs/${id}`,
    method:'put',
    data:option
  })
}