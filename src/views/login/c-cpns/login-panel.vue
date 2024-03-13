<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" label stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <!-- 插槽， #就是把上面的label的替换成 下面的 -->
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>

        <!-- 手机登录的panel -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>

          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRePwd" label="记住密码" size="large" />
      <el-link href="#" type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'
import type panelAccountVue from './panel-account.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')
const isRePwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
// 检测记住密码
watch(isRePwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})

const accountRef = ref<InstanceType<typeof PanelAccount>>()
// 组件的类型 暂时不明白，

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    // 1 获取子组件的实例
    accountRef.value?.loginAction(isRePwd.value)
    //记住密码  有浏览器进行的记住  也有此页面的记住， 这里进行页面服务器资源的记录

    // 2 调用方法
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
