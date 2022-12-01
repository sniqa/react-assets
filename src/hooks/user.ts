import { _fetch } from '@apis/fetch'
import { confirmbar, notice } from '@apis/mitt'
import { UserInfo, UserInfoWithId } from '@/types/user'

// 创建用户
export const handleCreateUser = async (userInfo: UserInfo) => {
  const { create_user } = await _fetch({ create_user: userInfo })

  if (create_user) {
    const { success, data, errmsg } = create_user

    return success
      ? (notice({ status: 'success', message: '创建用户成功' }),
        { ...userInfo, ...data } as UserInfoWithId)
      : notice({ status: 'error', message: errmsg })
  }

  return notice({ status: 'error', message: `创建用户失败` })
}

// 删除用户
export const handleDeleteUser = async (userInfo: UserInfoWithId) => {
  const result = await confirmbar({
    title: '提示',
    message: `删除用户会删除该用户名下的所有资料`,
  })

  if (!result) {
    return
  }

  const [{ delete_user }, { find_users }] = await _fetch([
    { delete_user: userInfo },
    {
      find_users: {},
    },
  ])

  if (delete_user) {
    const { success, errmsg } = delete_user

    return success
      ? (notice({ status: 'success', message: `删除成功` }), find_users.data)
      : notice({
          status: 'error',
          message: errmsg,
        })
  }

  return notice({
    status: 'error',
    message: '删除失败',
  })
}

// 更新用户
export const handleModifyUser = async (userInfo: UserInfoWithId) => {
  const [{ modify_user }, { find_users }] = await _fetch([
    { modify_user: userInfo },
    { find_users: {} },
  ])

  if (modify_user) {
    const { success, data, errmsg } = modify_user

    return success
      ? (notice({
          status: 'success',
          message: '修改成功',
        }),
        find_users.data)
      : notice({
          status: 'error',
          message: errmsg,
        })
  }

  return notice({
    status: 'error',
    message: '修改用户失败',
  })
}
