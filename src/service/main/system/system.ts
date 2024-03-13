import hyRequest from '@/service'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

// 用户的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    },
    data: queryInfo
  })
}

// 删除用户的网络请求
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

// 新建用户的网络请求
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

// 用户的修改编辑请求
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}

// 针对页面的网络请求  增删改查
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/`,
    data: pageInfo,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
export function editPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo,
    headers: {
      // 一般不放在这里，因为每个接口都要用到 token 所以可以放在Axios拦截器里面多用
      Authorization: localCache.getCache(LOGIN_TOKEN)
    }
  })
}
