<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}</el-button
      >
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <!-- 抽取 遍历的创建时间 -->
          <template v-if="item.type === 'timer'">
            <!-- 作用域插槽 -->
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  text
                  icon="Edit"
                  type="primary"
                  @click="handleEditBtnClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-if="idDelete"
                  size="small"
                  text
                  icon="Delete"
                  type="danger"
                  @click="handleDeleteBtnClick(scope.row.id)"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" hName="why"></slot>
              </template>
            </el-table-column>
          </template>

          <template v-else><el-table-column align="center" v-bind="item" /></template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const props = defineProps<IProps>()
// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 0 获取是否有对应的增删改查的权限

const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const idDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1 发起action 请求usersList的数据
const systemStore = useSystemStore()
// 这两个值先初始化 后面会用到
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 2 获取usersList数据 进行展开
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3 页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4,定义函数， 用于发送网络请求
function fetchPageListData(formData: any = {}) {
  // 如果 没有查询权限， 就不发送网络请求
  if (!isQuery) return

  //  获取offset 和 size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 携带查询 的信息
  const queryInfo = { ...pageInfo, ...formData }
  // 发送网络请求
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 5, 删除的操作   新建用户  编辑用户

function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleNewUserClick() {
  // 兄弟 之间的通讯 可以使用事件总线 也可以 都在父组件中操作 一个用emit 一个用ref
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 6 监听systemStore 中的actions  被执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
  console.log('action被调用')
})

// 为了通过搜索查找数据，所以把网络请求暴露给父组件
defineExpose({ fetchPageListData })
</script>

<style scoped lang="less">
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}
.table {
  .el-table-cell {
    padding: 12px 0;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
