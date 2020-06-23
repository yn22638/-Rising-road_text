import request from '@/utils/request'

//获取投票标题，通过query获取分页信息，数据展示在列表页
export function getVotesThemes(query) {
  return request({
    url: '/votes',
    method: 'get',
    params: query
  })
}

//通过id获取
export function getVotesOptionsById(id) {
    return request({
      url: `/votes/${id}`,
      method: 'get'
    })
}

//发起投票
export function insertTheme(data) {
    return request({
      url: '/votes',
      method: 'post',
      data
    })
}

//删除投票
export function destroy(id) {
  return request({
    url: `/votes/${id}`,
    method: 'delete'
  })
}

//投票，每次调用接口，指定id的tickets+1
export function setTicketsByOptionId(id) {
  return request({
    url: `/votes/${id}`,
    method: 'put'
  })
}
