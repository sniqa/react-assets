import { _fetch } from '@apis/fetch'
import { HamsterLoading } from '@/components/Loading'
import { DeviceInfoWithId } from '@/types/device'
import { DeviceBaseInfoWithId } from '@/types/deviceBase'
import { IpAddressInfoWithId } from '@/types/ipAddress'
import Table, { MRT_ColumnDef } from '@comps/table2/Table'
import { useAppSelector } from '@store/index'
import { useEffect, useMemo, useState } from 'react'

const columns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: 'ip_address',
    // enableClickToCopy: true,
    header: 'ip地址',
    size: 160,
  },
  {
    accessorKey: 'user',
    // enableClickToCopy: true,
    header: '使用人',
    size: 160,
  },

  {
    accessorKey: 'network_type',
    // enableClickToCopy: true,
    header: '网络类型',
    size: 160,
  },
  {
    accessorKey: 'device_kind',
    // enableClickToCopy: true,
    header: '设备种类',
    size: 160,
  },
  {
    accessorKey: 'is_used',
    // enableClickToCopy: true,
    header: '状态',
    Cell: ({ cell }) => {
      const value = cell.getValue<string>()

      return (
        <div
          className={value === '未使用' ? 'text-gray-500' : 'text-green-500'}
        >
          {value}
        </div>
      )
    },
    size: 160,
  },
  {
    accessorKey: 'enable_time',
    // enableClickToCopy: true,
    header: '启用时间',
    size: 160,
  },
]

const IpAddress = () => {
  const [deviceBases, setDeviceBase] = useState<DeviceBaseInfoWithId[]>([])
  const [devices, setDevices] = useState<DeviceInfoWithId[]>([])
  const [ipAddressRows, setIpAddress] = useState<IpAddressInfoWithId[]>([])

  const [loading, setLoading] = useState(false)

  const ipAddressArray = useMemo(
    () =>
      ipAddressRows.map((ip) => ({
        ...ip,
        device_kind:
          deviceBases.find(
            (db) =>
              db.device_model ===
              devices.find(
                (device) =>
                  device.ip_address === ip.ip_address &&
                  device.network_type === ip.network_type
              )?.device_model
          )?.device_kind || '',
        is_used: ip.is_used ? '已使用' : '未使用',
      })),
    [ipAddressRows]
  )

  useEffect(() => {
    const getIps = async () => {
      setLoading(true)

      const { find_devices, find_device_base, find_ips } = await _fetch({
        find_devices: {},
        find_device_base: {},
        find_ips: {},
      })

      setLoading(false)

      find_devices.success && setDevices(find_devices.data)

      find_device_base.success && setDeviceBase(find_device_base.data)

      find_ips.success && setIpAddress(find_ips.data)
    }

    getIps()
  }, [])

  if (loading) {
    return <HamsterLoading />
  }

  return (
    <>
      <div className="h-12 px-4 text-2xl">{`IP地址`}</div>
      <Table columns={columns as any} rows={ipAddressArray} />
    </>
  )
}

export default IpAddress
