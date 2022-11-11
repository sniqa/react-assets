import { AddIcon } from '@/assets/Icons'
import { useAppSelector } from '@/store/index'
import DialogWraper from '@comps/DialogWraper'
import Table from '@comps/table2/Table'
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'

import { DepartmentInfoWithId } from '@/types/department'
import { DeviceInfo, DeviceInfoWithId, DeviceCategory } from '@/types/device'
import { DeviceBaseInfoWithId } from '@/types/deviceBase'
import { IpAddressInfoWithId } from '@/types/ipAddress'
import { NetworkTypeInfoWithId } from '@/types/networkType'
import { UserInfoWithId } from '@/types/user'

const columns = [
  {
    accessorKey: '_id',
    enableClickToCopy: true,
    header: 'ID',
    size: 150,
  },
  {
    accessorKey: 'user',
    enableClickToCopy: true,
    header: '使用人',
    size: 150,
  },
  {
    accessorKey: 'location',
    enableClickToCopy: true,
    header: '物理位置',
    size: 180,
  },
  {
    accessorKey: 'network_name',
    enableClickToCopy: true,
    header: '所属网络',
    size: 150,
  },
  {
    accessorKey: 'ip_address',
    enableClickToCopy: true,
    header: 'ip地址',
    size: 200,
  },
  {
    accessorKey: 'mac',
    enableClickToCopy: true,
    header: 'mac',
    size: 200,
  },
  {
    accessorKey: 'device_model',
    enableClickToCopy: true,
    header: '设备型号',
    size: 200,
  },
  {
    accessorKey: 'device_type',
    enableClickToCopy: true,
    header: '设备类型',
    size: 150,
  },
  {
    accessorKey: 'device_category',
    enableClickToCopy: true,
    header: '设备分类',
    size: 200,
  },
  {
    accessorKey: 'system_version',
    enableClickToCopy: true,
    header: '系统版本',
    size: 200,
  },
  {
    accessorKey: 'disk_sn',
    enableClickToCopy: true,
    header: '磁盘SN',
    size: 200,
  },
  {
    accessorKey: 'remark',
    enableClickToCopy: true,
    header: '备注',
    size: 200,
  },
]

const Computer = () => {
  const users = useAppSelector((state) => state.users)
  const departments = useAppSelector((state) => state.department)
  const networkTypes = useAppSelector((state) => state.networkTypes)
  const ipAddress = useAppSelector((state) => state.ipAddress)
  const deviceBase = useAppSelector((state) => state.deviceBase)
  const device = useAppSelector((state) =>
    state.devices
      .filter((device) => device.device_category === DeviceCategory.NetDevice)
      .map((device) => {
        const device_type =
          deviceBase.find((db) => db.device_model === device.device_model)
            ?.device_type || ''
        const network_name =
          networkTypes.find(
            (networkType) => networkType.network_type === device.network_type
          )?.network_alias || ''

        return {
          ...device,
          device_type,
          network_name,
        }
      })
  )

  const [openAddDialog, setOpenAddDialog] = useState(false)

  const [openEditDialog, setOpenEditDialog] = useState(false)

  const [currentRow, setCurrentRow] = useState<Partial<DeviceInfoWithId>>({})

  return (
    <>
      <div className="h-12 px-4 text-2xl">{`网络类型`}</div>

      <Table
        columns={columns}
        rows={device}
        initialState={{
          columnVisibility: {
            _id: false,
            device_category: false,
            device_model: false,
            disk_sn: false,
            system_version: false,
          },
        }}
        enableRowActions
        renderCustomToolbar={
          <Tooltip title={'新增'}>
            <IconButton onClick={() => setOpenAddDialog(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        }
        rowActionsSize={150}
        renderRowActions={({ cell, row, table }) => (
          <Box sx={{ width: '8rem' }}>
            <Button
              size="small"
              onClick={() => (
                setOpenEditDialog(true), setCurrentRow(row.original as any)
              )}
            >{`编辑`}</Button>
            <Button className="inline-block" size="small">{`删除`}</Button>
          </Box>
        )}
      />

      {/*新增设备  */}
      <DialogWraper
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        title={'新增设备'}
        // onOk={() => }
      >
        <DeviceDetail
          userSelection={users}
          locationSelection={departments}
          networkTypeSelection={networkTypes}
          ipAddressSelection={ipAddress}
          deviceModelSelection={deviceBase}
        />
      </DialogWraper>

      {/* 编辑设备 */}
      <DialogWraper
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        title={'编辑设备'}
      >
        <DeviceDetail defaultValue={currentRow} />
      </DialogWraper>
    </>
  )
}

export default Computer

interface DeviceDetailProps {
  userSelection?: Array<UserInfoWithId>
  locationSelection?: Array<DepartmentInfoWithId>
  networkTypeSelection?: Array<NetworkTypeInfoWithId>
  ipAddressSelection?: Array<IpAddressInfoWithId>
  deviceModelSelection?: Array<DeviceBaseInfoWithId>
  defaultValue?: Partial<DeviceInfo>
}

const DeviceDetail = ({
  userSelection = [],
  locationSelection = [],
  networkTypeSelection = [],
  ipAddressSelection = [],
  deviceModelSelection = [],
  defaultValue,
}: DeviceDetailProps) => {
  return (
    <div className={`flex flex-wrap items-center py-2 pl-2`}>
      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`使用人`} {...params} size="small" />
        )}
        defaultValue={defaultValue?.user || ''}
        options={userSelection.map((u) => u.username)}
      />

      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`物理位置`} {...params} size="small" />
        )}
        options={locationSelection.flatMap((l) => l.locations)}
        defaultValue={defaultValue?.location || ''}
      />

      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`所属网络`} {...params} size="small" />
        )}
        options={networkTypeSelection.map((n) => n.network_type)}
        defaultValue={defaultValue?.network_type || ''}
      />

      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`Ip地址`} {...params} size="small" />
        )}
        options={ipAddressSelection.map((i) => i.ip_address)}
        defaultValue={defaultValue?.ip_address || ''}
      />

      <TextField
        label={`MAC`}
        size="small"
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        defaultValue={defaultValue?.mac || ''}
      />

      {/* <TextField label={`物理位置`} size="small" /> */}

      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`设备型号`} {...params} size="small" />
        )}
        options={deviceModelSelection.map((d) => d.device_model)}
        defaultValue={defaultValue?.device_model || ''}
      />

      <TextField
        label={`系统版本`}
        size="small"
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        defaultValue={defaultValue?.system_version || ''}
      />

      <TextField
        label={`磁盘SN`}
        size="small"
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        defaultValue={defaultValue?.disk_sn || ''}
      />

      <TextField
        label={`备注`}
        multiline
        minRows={3}
        size="small"
        sx={{ width: '33rem' }}
        defaultValue={defaultValue?.remark || ''}
      />
    </div>
  )
}
