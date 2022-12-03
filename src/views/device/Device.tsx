import { AddIcon, UploadIcon } from '@assets/Icons'
import DialogWraper from '@comps/DialogWraper'
import Table from '@comps/table2/Table'
import UploadDetail from '@comps/UploadDetail'
import { Box, IconButton, Tooltip } from '@mui/material'
import { useState, useCallback, useMemo, useEffect } from 'react'

import { HamsterLoading } from '@comps/Loading'

import { useChildToParent } from '@/hooks/common'
import { DepartmentInfoWithId } from '@/types/department'
import { DeviceInfoWithId } from '@/types/device'
import {
  DeviceBaseInfoWithId,
  DeviceCategory,
  DeviceKind,
} from '@/types/deviceBase'
import { IpAddressInfoWithId } from '@/types/ipAddress'
import { NetworkTypeInfoWithId } from '@/types/networkType'
import { UserInfoWithId } from '@/types/user'

import CustomButton from '@comps/CustomButton'
import { Res, _fetch } from '@apis/fetch'
import { noticebar, confirmbar } from '@apis/mitt'

import DeviceDetail from '@views/device/DeviceDetail'

const columns = [
  {
    accessorKey: 'serial_number',
    // enableClickToCopy: true,
    header: '序列号',
    size: 150,
  },
  {
    accessorKey: 'user',
    // enableClickToCopy: true,
    header: '使用人',
    size: 150,
  },
  {
    accessorKey: 'location',
    // enableClickToCopy: true,
    header: '物理位置',
    size: 180,
  },
  {
    accessorKey: 'network_alias',
    // enableClickToCopy: true,
    header: '所属网络',
    size: 150,
  },
  {
    accessorKey: 'network_type',
    // enableClickToCopy: true,
    header: '网络类型',
    size: 150,
  },
  {
    accessorKey: 'ip_address',
    // enableClickToCopy: true,
    header: 'ip地址',
    size: 180,
  },
  {
    accessorKey: 'mac',
    // enableClickToCopy: true,
    header: 'mac',
    size: 180,
  },
  {
    accessorKey: 'device_model',
    // enableClickToCopy: true,
    header: '设备型号',
    size: 200,
  },
  {
    accessorKey: 'device_type',
    // enableClickToCopy: true,
    header: '设备类型',
    size: 150,
  },
  {
    accessorKey: 'device_category',
    // enableClickToCopy: true,
    header: '设备分类',
    size: 200,
  },
  {
    accessorKey: 'system_version',
    // enableClickToCopy: true,
    header: '系统版本',
    size: 200,
  },
  {
    accessorKey: 'disk_sn',
    // enableClickToCopy: true,
    header: '磁盘SN',
    size: 200,
  },
  {
    accessorKey: 'remark',
    // enableClickToCopy: true,
    header: '备注',
    size: 200,
  },
]

interface DevicesProps {
  title: string
  deviceCategory: DeviceCategory
}

const Devices = ({ title, deviceCategory }: DevicesProps) => {
  const initialDeviceInfo = useMemo(
    () => ({
      _id: '',
      number: '',
      user: '',
      device_name: '',
      serial_number: '',
      location: '',
      network_type: '', //网络类型
      network_alias: '',
      ip_address: '',
      mac: '',
      device_model: '', //设备型号
      device_kind: DeviceKind.None, //设备种类
      device_category: deviceCategory, //设备分类
      system_version: '',
      disk_sn: '',
      remark: '',
    }),
    []
  )

  const [loading, setLoading] = useState(false)

  const [deviceBaseInfos, setDeviceBaseInfos] = useState<
    DeviceBaseInfoWithId[]
  >([])

  const [networkTypeInfos, setNetworkTypeInfos] = useState<
    NetworkTypeInfoWithId[]
  >([])
  const [userInfos, setUserInfos] = useState<UserInfoWithId[]>([])

  const [departmentInfos, setDepartmentInfos] = useState<
    DepartmentInfoWithId[]
  >([])
  const [ipAddressInfos, setIpAddressInfos] = useState<IpAddressInfoWithId[]>(
    []
  )

  const [deviceInfos, setDeviceInfos] = useState<DeviceInfoWithId[]>([])

  const device = useMemo(
    () =>
      deviceInfos
        .filter((device) => device.device_category === DeviceCategory.Computer)
        .map((device) => {
          const device_kind =
            deviceBaseInfos.find(
              (db) => db.device_model === device.device_model
            )?.device_kind || ''
          const network_name =
            networkTypeInfos.find(
              (networkType) => networkType.network_type === device.network_type
            )?.network_alias || ''

          return {
            ...device,
            device_kind,
            network_name,
          }
        }),
    [deviceInfos]
  )

  const [openDialog, setOpenDialog] = useState(false)

  const [openUploadDialog, setOpenUploadDialog] = useState(false)

  const [currentRow, setCurrentRow] = useState<DeviceInfoWithId | null>(null)

  const [childHook, parentHook] = useChildToParent()

  // 创建
  const handleCreateClick = useCallback(async () => {
    const deviceInfo = parentHook()

    setLoading(true)

    const [{ create_device }, { find_devices }] = await _fetch([
      { create_device: deviceInfo },
      {
        find_devices: { device_category: deviceCategory },
      },
    ])

    setOpenDialog(false)

    setLoading(false)

    create_device.success
      ? (noticebar({ status: 'success', message: `创建成功` }),
        setDeviceInfos(find_devices.data))
      : noticebar({ status: 'error', message: create_device.errmsg })
  }, [parentHook])

  // 删除
  const handleDeleteClick = useCallback(
    async (deviceInfo: DeviceInfoWithId) => {
      const confirmRes = await confirmbar({
        title: '提示',
        message: `此操作会删除该设备及回收ip`,
      })

      if (!confirmRes) {
        return
      }

      setLoading(true)

      const [{ delete_device }, { find_devices }] = await _fetch([
        { delete_device: deviceInfo },
        {
          find_devices: { device_category: deviceCategory },
        },
      ])

      setLoading(false)

      delete_device.success
        ? (noticebar({ status: 'success', message: `删除成功` }),
          setDeviceInfos(find_devices.data))
        : noticebar({ status: 'error', message: delete_device.errmsg })
    },
    []
  )

  // 更新
  const handleUpdateClick = useCallback(async () => {
    const deviceInfo = parentHook()

    setLoading(true)

    const [{ modify_device }, { find_devices }] = await _fetch([
      { modify_device: deviceInfo },
      {
        find_devices: { device_category: deviceCategory },
      },
    ])

    setOpenDialog(false)

    setLoading(false)

    modify_device.success
      ? (noticebar({ status: `success`, message: `更新成功` }),
        setDeviceInfos(find_devices.data))
      : noticebar({ status: `success`, message: modify_device.errmsg })
  }, [parentHook])

  // 删除选择
  const handleSelectRowClick = async (ids: string[]) => {
    setLoading(true)
    const [{ delete_many_device_by_id }, { find_devices }] = await _fetch([
      {
        delete_many_device_by_id: [ids],
      },
      {
        find_devices: { device_category: deviceCategory },
      },
    ])

    setLoading(false)

    delete_many_device_by_id.success
      ? (noticebar({ status: `success`, message: '删除成功' }),
        setDeviceInfos(find_devices.data))
      : noticebar({
          status: `error`,
          message: delete_many_device_by_id.errmsg,
        })
  }

  //上传完成后
  const onUploadComplete = useCallback(
    (result: Res<{ insert: number; total: number; data: any[] }>) => {
      setOpenUploadDialog(false)

      const { success, data } = result

      success &&
        (noticebar({
          status: `success`,
          message: `共 ${data.total} 个, 上传成功 ${data.insert} 个`,
        }),
        setDeviceInfos(data.data))
    },
    []
  )

  //获取数据
  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      const {
        find_device_base,
        find_devices,
        find_network_types,
        find_users,
        find_departments,
        find_ips,
      } = await _fetch({
        find_device_base: {},
        find_devices: { device_category: deviceCategory },
        find_network_types: {},
        find_users: {},
        find_departments: {},
        find_ips: {},
      })

      setLoading(false)

      find_device_base.success && setDeviceBaseInfos(find_device_base.data)

      find_network_types.success && setNetworkTypeInfos(find_network_types.data)

      find_devices.success && setDeviceInfos(find_devices.data)

      find_users.success && setUserInfos(find_users.data)

      find_departments.success && setDepartmentInfos(find_departments.data)

      find_ips && setIpAddressInfos(find_ips.data)
    }

    getData()
  }, [])

  //   加载过程
  if (loading) {
    return <HamsterLoading />
  }

  return (
    <>
      <div className="h-12 px-4 text-2xl">{title}</div>
      <Table
        columns={columns as any}
        rows={device}
        initialState={{
          columnVisibility: {
            device_category: false,
            device_model: false,
            disk_sn: false,
            system_version: false,
          },
        }}
        enableRowActions
        deleteSelectRows={(rows) =>
          handleSelectRowClick(rows.map((row) => row.original._id))
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
                onClick={() => (setOpenDialog(true), setCurrentRow(null))}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </>
        }
        rowActionsSize={150}
        renderRowActions={({ cell, row, table }) => (
          <Box sx={{ width: '8rem', fontSize: '12px' }}>
            <CustomButton
            className='text-sm'
              onClick={() => (
                setOpenDialog(true), setCurrentRow(row.original as any)
              )}
            >
              {`编辑`}
            </CustomButton>

            <CustomButton
              onClick={() => handleDeleteClick(row.original)}
            >{`删除`}</CustomButton>

            {/* <CustomButton>{`历史`}</CustomButton> */}
          </Box>
        )}
      />

      {/*新增设备  */}
      <DialogWraper
        open={openDialog}
        onClose={() => (setOpenDialog(false), setLoading(false))}
        title={currentRow === null ? '新增设备' : `编辑设备`}
        onOk={currentRow === null ? handleCreateClick : handleUpdateClick}
      >
        <DeviceDetail
          defaultValue={currentRow}
          emitValue={childHook}
          networkTypeInfos={networkTypeInfos}
          deviceBaseInfos={deviceBaseInfos}
          userInfos={userInfos}
          departmentInfos={departmentInfos}
          ipAddressInfos={ipAddressInfos}
          initialDeviceInfo={initialDeviceInfo}
        />
      </DialogWraper>

      <UploadDetail
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
        templateDownloadPath={'/设备模板.csv'}
        title={'上传设备'}
        uploadPath={'/upload/devices'}
        onComplete={(result) => onUploadComplete(result)}
      />
    </>
  )
}

export default Devices
