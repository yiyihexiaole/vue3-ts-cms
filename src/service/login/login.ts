import hyRequest from '..'
import type { IAccount } from '@/types'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
