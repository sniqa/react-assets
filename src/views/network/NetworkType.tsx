import Table, { MRT_ColumnDef } from '@comps/table2/Table'
import {
  IconButton,
  Tooltip,
  Button,
  Box,
  Autocomplete,
  TextField,
  Stack,
  Select,
} from '@mui/material'
import { AddIcon } from '@/assets/Icons'
import { useChildToParent } from '@hooks/common'
import { useAppDispatch, useAppSelector } from '@store/index'

import DialogWraper from '@comps/DialogWraper'
import { useState, useCallback } from 'react'

import { setIpAddress } from '@store/ipAddress'

import { setDevices } from '@store/device'
import {
  setNetworkType,
  addNetworkType,
  deleteNetworkTypes,
} from '@store/networkType'

import { NetworkTypeInfo, NetworkTypeInfoWithId } from '@/types/networkType'

import {
  handleAddNetworkType,
  handleDeleteNetworkType,
} from '@hooks/networkType'

const columns = [
  {
    accessorKey: '_id',
    header: 'ID',
  },
  {
    accessorKey: 'network_type',
    enableClickToCopy: true,
    header: '网络类型',
    size: 160,
  },
  {
    accessorKey: 'network_name',
    enableClickToCopy: true,
    header: '网络别名',
    size: 160,
  },
  {
    accessorKey: 'ip_address_start',
    enableClickToCopy: true,
    header: '开始地址',
    size: 160,
  },
  {
    accessorKey: 'ip_address_end',
    enableClickToCopy: true,
    header: '结束地址',
    size: 160,
  },
  {
    accessorKey: 'netmask',
    enableClickToCopy: true,
    header: '子网掩码',
    size: 160,
  },
  {
    accessorKey: 'gateway',
    enableClickToCopy: true,
    header: '网关',
    size: 160,
  },
  {
    accessorKey: 'dns',
    enableClickToCopy: true,
    header: 'DNS',
    size: 160,
  },
  {
    accessorKey: 'ip_use_detail',
    enableClickToCopy: true,
    header: '已使用 / 未使用 / 总数',
    size: 220,
  },

  {
    accessorKey: 'remark',
    enableClickToCopy: true,
    header: '备注',
    size: 150,
  },
]

const NetworkType = () => {
  const networkTypes = useAppSelector((state) =>
    state.networkTypes.map((networkType) => {
      const { unused_number, used_number, total_number, ...res } = networkType

      return {
        ...res,
        ip_use_detail: [used_number, unused_number, total_number].join(' / '),
      }
    })
  )

  const [openAddDialog, setOpenAddDialog] = useState(false)

  const [openEditDialog, setOpenEditDialog] = useState(false)

  const { childHook, parentHook } = useChildToParent()

  const dispatch = useAppDispatch()

  // 新增
  const handleAddClick = async () => {
    const res = parentHook()

    const result = await handleAddNetworkType(res)

    setOpenAddDialog(false)

    if (result) {
      const { ips, devices, targetNetworkType } = result
      dispatch(setIpAddress(ips))
      dispatch(setDevices(devices))
      dispatch(addNetworkType(targetNetworkType))
    }
  }

  // 删除
  const handleDeleteClick = async (data: NetworkTypeInfoWithId) => {
    const res = await handleDeleteNetworkType(data)

    if (res) {
      const { ips, devices, targetNetworkType } = res
      dispatch(setIpAddress(ips))
      dispatch(setDevices(devices))
      dispatch(deleteNetworkTypes(targetNetworkType))
    }
  }

  return (
    <>
      <Table
        columns={columns}
        rows={networkTypes}
        enableRowActions
        initialState={{
          columnVisibility: {
            _id: false,
          },
        }}
        renderCustomToolbar={
          <Tooltip title={'新增'}>
            <IconButton onClick={() => setOpenAddDialog(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        }
        renderRowActions={({ cell, row, table }) => (
          <Box sx={{ width: '8rem' }}>
            {/* <Button
              size="small"
              onClick={() => (
                setOpenEditDialog(true), setCurrentRow(row.original as any)
              )}
            >{`编辑`}</Button> */}
            <Button
              className="inline-block"
              size="small"
              onClick={() => handleDeleteClick(row.original)}
            >{`删除`}</Button>
          </Box>
        )}
      />

      <DialogWraper
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        title={'新增网络类型'}
        onOk={handleAddClick}
      >
        <NetworkTypeDetail getValue={childHook} />
      </DialogWraper>
    </>
  )
}

export default NetworkType

interface NetworkTypeDetailProps {
  getValue: (data: () => NetworkTypeInfo) => void
}

const NetworkTypeDetail = ({ getValue }: NetworkTypeDetailProps) => {
  const [networkTypeDetail, setNetworkTypeDetail] = useState<NetworkTypeInfo>({
    network_type: '',
    network_name: '',
    ip_address_start: '',
    ip_address_end: '',
    netmask: '',
    gateway: '',
    dns: '',
    remark: '',
  })

  getValue(() => networkTypeDetail)

  const handleOnChang = (val: string, key: string) => {
    setNetworkTypeDetail({ ...networkTypeDetail, [key]: val })
  }

  return (
    <div className=" py-2 pl-2">
      <div className={`flex flex-wrap items-center`}>
        <TextField
          size="small"
          label={`网络类型`}
          sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), 'network_type')
          }
        />
        <TextField
          size="small"
          label={`网络别名`}
          sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), 'network_name')
          }
        />
        <TextField
          size="small"
          label={`开始地址`}
          sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), 'ip_address_start')
          }
        />
        <TextField
          size="small"
          label={`结束地址`}
          sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), 'ip_address_end')
          }
        />
        <TextField
          size="small"
          label={`子网掩码`}
          sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), 'netmask')
          }
        />
        <TextField
          size="small"
          sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
          label={`网关`}
          onChange={(e) =>
            handleOnChang(e.currentTarget.value.trim(), 'gateway')
          }
        />
        <TextField
          size="small"
          label={`dns`}
          sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
          onChange={(e) => handleOnChang(e.currentTarget.value.trim(), 'dns')}
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
