import hyRequest from '@/service'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

export function getAmountListData() {
  return hyRequest.get({
    url: '/goods/amount/list',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getGoodsCategoryCount() {
  return hyRequest.get({
    url: '/goods/category/count',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getGoodsCategorySale() {
  return hyRequest.get({
    url: '/goods/category/sale',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getGoodsCategoryFavor() {
  return hyRequest.get({
    url: '/goods/category/favor',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

export function getGoodsAddressSale() {
  return hyRequest.get({
    url: '/goods/address/sale',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
