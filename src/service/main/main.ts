import hyRequest from '..'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getEntireDepartment() {
  return hyRequest.post({
    url: '/department/list',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
