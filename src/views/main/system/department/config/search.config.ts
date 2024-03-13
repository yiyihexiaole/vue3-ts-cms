const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询的部门',
      initialValue: 'aaa'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询的领导'
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请选择查询的状态',
      option: [
        { label: '启动', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
