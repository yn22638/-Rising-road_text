import request from '@/utils/request'

//获取互动交流列表
export function index(query) {
  return request({
    url: '/forums',
    method: 'get',
    params:query
  })
}


export function create(data) {
  return request({
    url: '/forums',
    method: 'post',
    data
  })
}

//添加讨论内容
export function insertContent(data) {
  return request({
    url: `/forumcontents`,
    method: 'post',
    data
  })
}

//获取讨论内容
export function getForumsById(id,query) {
  return request({
    url: `/forums/${id}`,
    method: 'get',
    params:query
  })
}
