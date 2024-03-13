<template>
  <div class="panel-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import { tr } from 'element-plus/lib/locale/index.js'
import { accountLoginRequest } from '@/service/login/login'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'

// 定义常量
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 1,定义account 数据
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 2,定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须是6~20位的数字或字母', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上的字母或数字', trigger: 'blur' }
  ]
}

// 3,账号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRePwd: boolean) {
  // console.log('panel-account Action', account.name, account.password)
  // 子组件，子组件通过 defineExpose 将 loginAction 暴露给了父组件，使得父组件能够调用子组
  // 件的方法，并且由于 account 对象是在子组件的作用域内定义的，因此 loginAction
  // 方法可以访问和操作account 对象中的数据。
  // 总之，此函数是父函数可以调用，但是此函数还是在子组件内部使用的

  formRef.value?.validate((valid) => {
    if (valid) {
      // 1 获取用户输入的账号和密码
      const name = account.name
      const password = account.password
      // 2 向服务器发送网络请求（携带账号和密码
      loginStore.loginAccountAction({ name, password }).then((res) => {
        // 3 判断是否需要记住密码
        if (isRePwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请你输入正确的格式后再输入')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
