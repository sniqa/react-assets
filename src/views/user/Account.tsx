import { AddIcon, UploadIcon } from '@/assets/Icons'
import Table from '@comps/table2/Table'
import { useChildToParent } from '@hooks/common'
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@store/index'

import DialogWraper from '@comps/DialogWraper'
import { memo, useCallback, useEffect, useState } from 'react'

import { setIpAddress } from '@store/ipAddress'

import { setDevices } from '@store/device'
import { addUser, deleteUser, updateUser } from '@store/users'

import { DepartmentInfoWithId } from '@/types/department'
import { NetworkTypeInfoWithId } from '@/types/networkType'

import {
  handleCreateUser,
  handleDeleteUser,
  handleModifyUser,
} from '@hooks/user'

import { UserInfoWithId, UserInfo } from '@/types/user'

import UploadDetail from '@comps/UploadDetail'

import { Res, _fetch } from '@apis/fetch'
import { confirmbar, notice } from '@apis/mitt'
import { ChaseLoading } from '@comps/Loading'

const columns = [
  {
    accessorKey: 'username',
    header: '用户名称',
    size: 160,
  },
  {
    accessorKey: 'department',
    header: '部门',
    size: 160,
  },
  {
    accessorKey: 'location',
    header: '办公室',
    size: 160,
  },
  {
    accessorKey: 'number',
    // enableClickToCopy: true,
    header: '编号',
    size: 160,
  },
  {
    accessorKey: 'remark',
    // enableClickToCopy: true,
    header: '备注',
    size: 150,
  },
]

const Account = () => {
  const [users, setUsers] = useState<UserInfoWithId[]>([])

  const [departments, setDepartments] = useState<DepartmentInfoWithId[]>([])

  const [currentRow, setCurrentRow] = useState<UserInfoWithId | null>(null)

  const [openEditDialog, setOpenEditDialog] = useState(false)

  const [openUploadDialog, setOpenUploadDialog] = useState(false)

  const [childHook, parentHook] = useChildToParent()

  const [tableLoading, setTableLoading] = useState(false)

  // 新增
  const handleAddClick = useCallback(async () => {
    const res = parentHook()

    setTableLoading(true)

    setOpenEditDialog(false)

    const result = await handleCreateUser(res)

    setTableLoading(false)

    result && setUsers([result, ...users])
  }, [parentHook])

  // 删除
  const handleDeleteClick = useCallback(async (data: NetworkTypeInfoWithId) => {
    const state = await confirmbar({
      title: '提示',
      message: `删除用户会删除该用户名下的所有资料`,
    })

    if (!state) {
      return
    }

    setTableLoading(true)

    const [{ delete_user }, { find_users }] = await _fetch([
      { delete_user: data },
      {
        find_users: {},
      },
    ])

    setTableLoading(false)

    if (delete_user) {
      const { success, errmsg } = delete_user

      return success
        ? (notice({ status: 'success', message: `删除成功` }),
          find_users.success && setUsers(find_users.data))
        : notice({
            status: 'error',
            message: errmsg,
          })
    }

    return notice({
      status: 'error',
      message: '删除失败',
    })
  }, [])

  // 更新
  const handleEditClick = useCallback(async () => {
    const res = parentHook()

    setTableLoading(true)

    const result = await handleModifyUser(res)

    setTableLoading(false)

    if (result) {
      setOpenEditDialog(false)

      setUsers(result)
    }
  }, [parentHook])

  //删除所选
  const handleDeleteSelectUsers = useCallback(async (ids: string[]) => {
    setTableLoading(true)

    const res = await _fetch([
      { delete_many_users_by_ids: [ids] },
      { find_users: {} },
    ])

    setTableLoading(false)

    const [{ delete_many_users_by_ids }, { find_users }] = res

    delete_many_users_by_ids.success
      ? (setUsers(find_users.data),
        notice({
          status: 'success',
          message: `成功删除${delete_many_users_by_ids.data}个用户`,
        }))
      : notice({
          status: 'error',
          message: `删除失败`,
        })
  }, [])

  //上传完成后
  const onUploadComplete = useCallback(
    (result: Res<{ insert: number; total: number; data: any[] }>) => {
      setOpenUploadDialog(false)

      const { success, data } = result

      success &&
        (notice({
          status: `success`,
          message: `共 ${data.total} 个, 上传成功 ${data.insert} 个`,
        }),
        setUsers(data.data))
    },
    []
  )

  //获取数据
  useEffect(() => {
    const getUsers = async () => {
      setTableLoading(true)

      const { find_users, find_departments } = await _fetch({
        find_users: {},
        find_departments: {},
      })

      setTableLoading(false)

      find_users.success && setUsers(find_users.data)

      find_departments.success && setDepartments(find_departments.data)
    }

    getUsers()
  }, [])

  //   加载过程
  if (tableLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ChaseLoading />
      </div>
    )
  }

  return (
    <>
      <div className="h-12 px-4 text-2xl">{`用户`}</div>

      <Table
        columns={columns as any}
        rows={users}
        enableRowActions
        deleteSelectRows={(rows) =>
          handleDeleteSelectUsers(rows.map((row) => row.original._id))
        }
        renderCustomToolbar={
          <>
            <Tooltip title={'上传'}>
              <IconButton onClick={() => setOpenUploadDialog(true)}>
                <UploadIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={'新增'}>
              <IconButton
                onClick={() => (setOpenEditDialog(true), setCurrentRow(null))}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </>
        }
        renderRowActions={({ cell, row, table }) => (
          <Box sx={{ width: '8rem' }}>
            <Button
              size="small"
              onClick={() => (
                setOpenEditDialog(true), setCurrentRow(row.original)
              )}
            >{`编辑`}</Button>
            <Button
              className="inline-block"
              size="small"
              onClick={() => handleDeleteClick(row.original)}
            >{`删除`}</Button>
          </Box>
        )}
      />

      {/* 编辑用户 */}
      <DialogWraper
        open={openEditDialog}
        onClose={() => (setOpenEditDialog(false), setTableLoading(false))}
        title={currentRow === null ? '新增用户' : '编辑用户'}
        onOk={currentRow === null ? handleAddClick : handleEditClick}
      >
        <AccountDetail
          emitValue={childHook}
          originData={currentRow}
          departmentSelection={departments}
        />
      </DialogWraper>

      <UploadDetail
        title="上传用户"
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
        templateDownloadPath={'/用户模板.csv'}
        uploadPath={'/upload/users'}
        onComplete={(result) => onUploadComplete(result)}
      />
    </>
  )
}

export default Account

interface AccountDetailProps {
  emitValue: (cb: () => UserInfoWithId) => void
  originData?: UserInfoWithId | null
  departmentSelection?: DepartmentInfoWithId[]
}

const AccountDetail = memo(
  ({ emitValue, originData, departmentSelection = [] }: AccountDetailProps) => {
    const [accountDetail, setAccountDetail] = useState<UserInfoWithId>(
      originData || {
        _id: '',
        username: '',
        department: '',
        location: '',
        number: '',
        remark: '',
      }
    )

    emitValue(() => accountDetail)

    const handleOnChang = (val: string, key: string) => {
      setAccountDetail({ ...accountDetail, [key]: val })
    }

    return (
      <div className=" py-2 pl-2">
        <div className={`flex flex-wrap items-center`}>
          <TextField
            size="small"
            label={`用户名称`}
            sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
            defaultValue={originData?.username}
            onChange={(e) =>
              handleOnChang(e.currentTarget.value.trim(), 'username')
            }
          />
          <Autocomplete
            sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
            renderInput={(params) => (
              <TextField label={`部门`} {...params} size="small" />
            )}
            onChange={(e, newValue) =>
              setAccountDetail({ ...accountDetail, department: newValue || '' })
            }
            defaultValue={originData?.department || ''}
            options={['', ...departmentSelection.map((d) => d.department_name)]}
          />
          <Autocomplete
            sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
            renderInput={(params) => (
              <TextField label={`办公室`} {...params} size="small" />
            )}
            defaultValue={originData?.location || ''}
            onChange={(e, newValue) =>
              setAccountDetail({ ...accountDetail, location: newValue || '' })
            }
            options={['', ...departmentSelection.flatMap((d) => d.locations)]}
          />
          <TextField
            size="small"
            label={`编号`}
            sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
            onChange={(e) =>
              handleOnChang(e.currentTarget.value.trim(), 'number')
            }
          />
        </div>

        <TextField
          size="small"
          label={`备注`}
          sx={{ width: '33rem', mr: '1rem', mb: '1rem' }}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), 'remark')
          }
          multiline
          minRows={3}
        />
      </div>
    )
  }
)
