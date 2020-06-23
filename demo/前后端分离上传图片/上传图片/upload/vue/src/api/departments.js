import request from '@/utils/request'

export function index() {
  return request({
    url: '/departments',
    method: 'get',
  })
}

export function destroy(id) {
  return request({
    url: `/departments/${id}`,
    method: 'delete'
  })
}

export function create(data) {
  return request({
    url:'/departments',
    method:'post',
    data
  })
}
