import { AddIcon } from '@/assets/Icons'
import Table from '@comps/table2/Table'
import { useChildToParent } from '@hooks/common'
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@store/index'

import DialogWraper from '@comps/DialogWraper'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { setIpAddress } from '@store/ipAddress'

import { setDevices } from '@store/device'
import { addNetworkType, deleteNetworkTypes } from '@store/networkType'

import { NetworkTypeInfo, NetworkTypeInfoWithId } from '@/types/networkType'

import { handleAddNetworkType } from '@hooks/networkType'

import { HamsterLoading } from '@comps/Loading'
import { _fetch } from '@/apis/fetch'
import { confirmbar, noticebar } from '@apis/mitt'

const columns = [
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
    header: `已使用 / 未使用 / 总数`,
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
  const [loading, setLoading] = useState(false)

  const [networkTypesOrigin, setNetworkTypesOrigin] = useState<
    NetworkTypeInfoWithId[]
  >([])

  const networkTypes = useMemo(
    () =>
      networkTypesOrigin.map((networkType) => {
        const { unused_number, used_number, total_number, ...res } = networkType

        setLoading(false)

        return {
          ...res,
          ip_use_detail: [used_number, unused_number, total_number].join(' / '),
        }
      }),

    [networkTypesOrigin]
  )

  const [openDialog, setOpenDialog] = useState(false)

  const [childHook, parentHook] = useChildToParent()

  // 新增
  const handleAddClick = useCallback(async () => {
    const res = parentHook()

    setLoading(true)

    const result = await handleAddNetworkType(res)

    setOpenDialog(false)

    if (result) {
      setNetworkTypesOrigin(result.data)
    }
  }, [parentHook])

  // 删除
  const handleDeleteClick = useCallback(async (data: NetworkTypeInfoWithId) => {
    const res = await confirmbar({
      title: '提示',
      message: '删除此信息会同步删除与此有关的全部资料',
    })

    if (!res) {
      return
    }

    setLoading(true)

    const [{ delete_network_type }, { find_network_types }] = await _fetch([
      { delete_network_type: data },
      { find_network_types: {} },
    ])

    setLoading(false)

    delete_network_type.success
      ? (noticebar({ status: 'success', message: `删除成功` }),
        setNetworkTypesOrigin(find_network_types.data))
      : noticebar({
          status: 'error',
          message: delete_network_type.errmsg,
        })
  }, [])

  // 获取数据
  useEffect(() => {
    const getNetworkTypes = async () => {
      const { find_network_types } = await _fetch({ find_network_types: {} })

      find_network_types.success &&
        setNetworkTypesOrigin(find_network_types.data)
    }

    getNetworkTypes()
  }, [])

  //加载过程
  if (loading) {
    return <HamsterLoading />
  }

  return (
    <>
      <div className="h-12 px-4 text-2xl">{`网络类型`}</div>

      <Table
        columns={columns as any}
        rows={networkTypes}
        enableRowActions
        renderCustomToolbar={
          <Tooltip title={'新增'}>
            <IconButton onClick={() => setOpenDialog(true)}>
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
        open={openDialog}
        onClose={() => (setOpenDialog(false), setLoading(false))}
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

const NetworkTypeDetail = memo(({ getValue }: NetworkTypeDetailProps) => {
  const [networkTypeDetail, setNetworkTypeDetail] = useState<NetworkTypeInfo>({
    network_type: '',
    network_alias: '',
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
            handleOnChang(e.currentTarget.value.trim(), 'network_alias')
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
})
