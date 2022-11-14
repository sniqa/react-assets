import { AddIcon } from '@/assets/Icons'
import Table from '@comps/table2/Table'
import { useChildToParent } from '@hooks/common'
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@store/index'

import DialogWraper from '@comps/DialogWraper'
import { useState } from 'react'

import { setIpAddress } from '@store/ipAddress'

import { setDevices } from '@store/device'
import { addUser, updateUser, deleteUser } from '@store/users'

import { NetworkTypeInfo, NetworkTypeInfoWithId } from '@/types/networkType'
import { DepartmentInfo, DepartmentInfoWithId } from '@/types/department'

import {
  handleCreateUser,
  handleDeleteUser,
  handleModifyUser,
} from '@hooks/user'

import {
  handleAddNetworkType,
  handleDeleteNetworkType,
} from '@hooks/networkType'
import { UserInfoWithId } from '@/types/user'

const columns = [
  {
    accessorKey: 'username',
    enableClickToCopy: true,
    header: '用户名称',
    size: 160,
  },
  {
    accessorKey: 'department',
    enableClickToCopy: true,
    header: '部门',
    size: 160,
  },
  {
    accessorKey: 'location',
    enableClickToCopy: true,
    header: '办公室',
    size: 160,
  },
  {
    accessorKey: 'number',
    enableClickToCopy: true,
    header: '编号',
    size: 160,
  },
  {
    accessorKey: 'remark',
    enableClickToCopy: true,
    header: '备注',
    size: 150,
  },
]

const Account = () => {
  const users = useAppSelector((state) => state.users)

  const departments = useAppSelector((state) => state.department)

  const [currentRow, setCurrentRow] = useState<UserInfoWithId | null>(null)

  const [openEditDialog, setOpenEditDialog] = useState(false)

  const [childHook, parentHook] = useChildToParent()

  const [tableLoading, setTableLoading] = useState(false)

  const dispatch = useAppDispatch()

  // 新增
  const handleAddClick = async () => {
    const res = parentHook()

    setTableLoading(true)

    const result = await handleCreateUser(res)

    setTableLoading(false)

    if (result) {
      setOpenEditDialog(false)

      dispatch(addUser(result))
    }
  }

  // 删除
  const handleDeleteClick = async (data: NetworkTypeInfoWithId) => {
    setTableLoading(true)
    const res = await handleDeleteUser(data)

    setTableLoading(false)
    if (res) {
      const { ips, devices, target } = res
      dispatch(setIpAddress(ips))
      dispatch(setDevices(devices))
      dispatch(deleteUser(target))
    }
  }

  // 更新
  const handleEditClick = async () => {
    const res = parentHook()

    setTableLoading(true)

    const result = await handleModifyUser(res)

    setTableLoading(false)

    if (result) {
      setOpenEditDialog(false)

      const { ips, devices, newUser } = result

      dispatch(setIpAddress(ips))
      dispatch(setDevices(devices))
      dispatch(updateUser(newUser))
    }
  }

  return (
    <>
      <div className="h-12 px-4 text-2xl">{`用户`}</div>

      <Table
        columns={columns}
        rows={users}
        enableRowActions
        isLoading={tableLoading}
        initialState={{
          columnVisibility: {
            _id: false,
          },
        }}
        renderCustomToolbar={
          <Tooltip title={'新增'}>
            <IconButton
              onClick={() => (setOpenEditDialog(true), setCurrentRow(null))}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
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

      {/* 新增用户
      <DialogWraper
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        title={``}
        onOk={handleAddClick}
      >
        <AccountDetail
          emitValue={childHook}
          departmentSelection={departments}
        />
      </DialogWraper> */}

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
    </>
  )
}

export default Account

interface AccountDetailProps {
  emitValue: (cb: () => UserInfoWithId) => void
  originData?: UserInfoWithId | null
  departmentSelection?: DepartmentInfoWithId[]
}

const AccountDetail = ({
  emitValue,
  originData,
  departmentSelection = [],
}: AccountDetailProps) => {
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
        onChange={(e) => handleOnChang(e.currentTarget.value.trim(), 'remark')}
        multiline
        minRows={3}
      />
    </div>
  )
}
