import request from '@/utils/request'

export function index(data) {
  return request({
    url: '/images',
    method: 'get',
    params: data
  })
}

export function create(data) {
  return request({
    url:'/images',
    method: 'post',
    data
  })
}

export function destroy(id) {
  return request({
    url:`/images/${id}`,
    method: 'delete'
  })
}

export function update(option) {
  return request({
    url:`/images/${option.id}`,
    method: 'put',
    data:option
  })
}