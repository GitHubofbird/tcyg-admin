import Axios from 'axios'
import { Message } from 'element-ui'
import nProgress from 'nprogress'
const service = Axios.create({
  timeout: 15000,
  baseURL: process.env.BASE_API,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }

})

service.interceptors.request.use(config => {
  nProgress.start()
  return config
}, error => {
  nProgress.done()
  Message.error('系统异常')
  Promise.reject(error)
})
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      Message.error('系统异常')
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else {
      nProgress.done()
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    Message.fail('系统异常')
    return Promise.reject(error)
  }
)
export default service
