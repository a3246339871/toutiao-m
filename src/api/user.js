// 用户相关请求模块
import request from '@/utils/request'
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送验证码 发送多次一分钟只能有一个限制
// export const sendSms = data => {
//     return request({
//         method: 'GET',
//         url: '/v1_0/codes/:mobile/${mobile}'
//     })
// }

export const getUserChannels = data => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
