import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type CallbackFnType = (data?: any) => void

function usePageModal(newCallback?: CallbackFnType, editCallback?: CallbackFnType) {
  // 点击content modal的操作
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    // 一些 hook 拿到的数据，要在组件中使用 比如回显
    if (editCallback) editCallback(itemData)
  }
  return { modalRef, handleNewClick, handleEditClick }

  // [modalRef, handleNewClick, handleEditClick]
  // 元组类型  顺序不能乱写
}

export default usePageModal
