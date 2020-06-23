import request from '@/utils/request'

export function index() {
  return request({
    url: '/roles',
    method: 'get',
  })
}

export function destroy(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}
