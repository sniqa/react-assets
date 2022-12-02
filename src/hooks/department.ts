import { DepartmentInfo, DepartmentInfoWithId } from '@/types/department'
import { _fetch } from '@apis/fetch'
import { confirmbar, noticebar } from '@apis/mitt'

// 增
export const handleAddDepartment = async (val: Partial<DepartmentInfo>) => {
  const [{ create_department }, { find_departments }] = await _fetch([
    { create_department: val },
    { find_departments: {} },
  ])

  if (create_department) {
    const { success, data, errmsg } = create_department

    return success
      ? (noticebar({
          status: 'success',
          message: '创建成功',
        }),
        find_departments.data)
      : noticebar({
          status: 'error',
          message: errmsg,
        })
  }

  return noticebar({
    status: 'error',
    message: '创建失败',
  })
}

// 删
export const handleDeleteDepartment = async (
  department: DepartmentInfoWithId
) => {
  const res = await confirmbar({
    title: '提示',
    message: '确定删除选中的项目？其他依赖此项的数据将会清空此项数据',
  })

  if (!res) {
    return
  }

  const { delete_department } = await _fetch({
    delete_department: department,
  })

  if (delete_department) {
    const { success, data, errmsg } = delete_department

    return success
      ? (noticebar({
          status: 'success',
          message: '删除成功',
        }),
        {
          result: data,
        })
      : noticebar({
          status: 'error',
          message: errmsg,
        })
  }

  return noticebar({
    status: 'error',
    message: '删除失败',
  })
}

// 改
export const handlerUpdateDepartment = async (
  department: DepartmentInfoWithId
) => {
  const [{ modify_department }, { find_departments }] = await _fetch([
    {
      modify_department: department,
    },
    { find_departments: {} },
  ])

  if (modify_department) {
    const { success, data, errmsg } = modify_department

    return success
      ? (noticebar({ status: 'success', message: '修改成功' }),
        find_departments.data)
      : noticebar({
          status: 'error',
          message: errmsg,
        })
  }

  return noticebar({
    status: 'error',
    message: `更新失败`,
  })
}
