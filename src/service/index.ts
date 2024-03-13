import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // config.headers!.Authorization = localCache.getCache(LOGIN_TOKEN)
      // 非空断言 但是这里判断更好

      // const token = localCache.getCache(LOGIN_TOKEN)
      // if (config.headers && token) {
      //   //  类型缩小
      //   config.headers.Authorization = 'Bearer ' + token
      // }
      // 不知道哪里出问题了 就是显示token不对
      return config
    }
  }
})

export default hyRequest
