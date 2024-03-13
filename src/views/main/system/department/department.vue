<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope"
        ><span>哈哈哈:{{ scope.row[scope.prop] }}</span>
        <span>{{ scope.hName }}</span>
      </template>
      <template #parent="scope"
        ><span>呵呵呵:{{ scope.row[scope.prop] }}</span></template
      >
      <!-- 作用域插槽 我理解的是  首先插槽是父组件 在子组件引入的内部写下想要展示的内容，
        子组件在内部的模板中 预留个 slot  占位父组件传递过来的内容
          作用域插槽 就是  父组件想使用子组件的数据  想要定制化的展示内容，就可以用过让
        子组件在slot中通过v-bind=‘scope 和其他 传递给父组件，
        父组件在template 通v-slot 简称# 来接受 获得scope中的内容
        -->
    </page-content>

    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref, computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 对modalConfig 进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})

// setup中相同逻辑的抽取  hooks
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 点击了search  content的操作
// 点击了重置

// 点击content modal的操作
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped>
.department {
}
</style>
