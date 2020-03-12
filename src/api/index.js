import request from '../utils/request'

export function login (loginInfo) {
  return request.post('/user/login', loginInfo)
}
