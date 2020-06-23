import request from '@/utils/request'

export function index(data) {
  return request({
    url: '/videos',
    method: 'get',
    params: data
  })
}

export function create(data) {
  return request({
    url: '/videos',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url: `/videos/${id}`,
    method: 'delete'
  })
}

export function update(option) {
  return request({
    url: `/videos/${option.id}`,
    method: 'put',
    data: option
  })
}