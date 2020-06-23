import request from '@/utils/request'

export function index(query) {
  return request({
    url: '/users',
    method: 'get',
    params:query
  })
}

export function destroy(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function update(data) {
  return request({
    url: `/users/${data.id}`,
    method:'put',
    data
  })
}

export function create(data) {
  return request({
    url:'/users',
    method:'post',
    data
  })
}
