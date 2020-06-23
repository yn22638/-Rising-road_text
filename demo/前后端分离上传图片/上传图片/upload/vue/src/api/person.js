import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/person',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/person',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/person/${id}`,
    method: 'delete'
  })
}

export function show(id) {
  return request({
    url: `/person/${id}`,
    method: 'get'
  })
}

export function update(id, option) {
  return request({
    url: `/person/${id}`,
    method: 'put',
    data: option
  })
}

