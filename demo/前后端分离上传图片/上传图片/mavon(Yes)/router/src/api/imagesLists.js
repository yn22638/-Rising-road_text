import request from '@/utils/request'

export function index(data) {
  console.log(data);
  return request({
    url: '/imageslists',
    method: 'get',
    params: data
  })
}

export function create(data) {
  return request({
    url:'/imageslists',
    method: 'post',
    data,
  })
}

export function destroy(id) {
  return request({
    url:`/imageslists/${id}`,
    method: 'delete'
  })
}


export function update(option) {
  return request({
    url: `/imageslists/${option.id}`,
    method: 'put',
    data: option
  })
}