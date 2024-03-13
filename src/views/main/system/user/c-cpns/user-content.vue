<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="30px" />
        <el-table-column align="center" type="index" label="序号" width="50px" />

        <el-table-column align="center" prop="name" label="用户名" width="150px" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="130px" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150px" />
        <el-table-column align="center" prop="enable" label="状态" width="100px">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="180px">
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
              v-if="isDelete"
              size="small"
              text
              icon="Delete"
              type="danger"
              @click="handleDeleteBtnClick(scope.row.id)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
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

// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 用户的权限判断
const isCreate = usePermissions('user:create')
const isDelete = usePermissions('user:delete')
const isUpdate = usePermissions('user:update')
const isQuery = usePermissions('user:query')

// 1 发起action 请求usersList的数据
const systemStore = useSystemStore()
// 这两个值先初始化 后面会用到
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 2 获取usersList数据 进行展开
const { usersList, userTotalCount } = storeToRefs(systemStore)

// 3 页码相关的逻辑

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 4,定义函数， 用于发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  //  获取offset 和 size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 携带查询 的信息
  const queryInfo = { ...pageInfo, ...formData }

  // 发送网络请求
  systemStore.postUsersListAction(queryInfo)
}

// 5, 删除的操作   新建用户  编辑用户

function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}
function handleNewUserClick() {
  // 兄弟 之间的通讯 可以使用事件总线 也可以 都在父组件中操作 一个用emit 一个用ref
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 为了通过搜索查找数据，所以把网络请求暴露给父组件
defineExpose({ fetchUserListData })
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
