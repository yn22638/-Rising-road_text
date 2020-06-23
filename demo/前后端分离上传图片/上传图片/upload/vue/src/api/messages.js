import request from '@/utils/request'

export function index(data) {
  return request({
    url: '/messages',
    method: 'get',
    params: data
  })
}

export function create(data) {
  return request({
    url: '/messages',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/messages/${id}`,
    method: 'delete'
  })
}

export function show(id) {
  return request({
    url: `/messages/${id}`,
    method: 'get'
  })
}

export function update(id, option) {
  return request({
    url: `/messages/${id}`,
    method: 'put',
    data: option
  })
}
