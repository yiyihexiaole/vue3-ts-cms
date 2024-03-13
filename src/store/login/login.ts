import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
  // 返回的数据太多了 用any方便点
}

const useLoginStore = defineStore('login', {
  // 如何指定 state 的类型
  state: (): ILoginState => ({
    token: localStorage.getItem(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1, 账号登录， 获取token等信息
      const loginResult = await accountLoginRequest(account)
      // console.log(loginResult)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2 获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3根据角色请求用户的权限(Menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4 进行本地缓存

      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 5 请求所有的role 和department的数据
      const MainStore = useMainStore()
      MainStore.fetchEntireDataAction()

      //重要 获取登录用户的所有按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 重要 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 5 页面跳转（main页面）
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 刷新后 储存数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 刷新后， 再请求所有的role 和department的数据
        const MainStore = useMainStore()
        MainStore.fetchEntireDataAction()

        // 获取按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
