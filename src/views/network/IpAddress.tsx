import Table, { MRT_ColumnDef } from '@comps/table2/Table'
import { useAppDispatch, useAppSelector } from '@store/index'

const columns = [
  {
    accessorKey: '_id',
    header: 'ID',
  },
  {
    accessorKey: 'ip_address',
    // enableClickToCopy: true,
    header: 'ip地址',
    size: 160,
  },
  {
    accessorKey: 'username',
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
    accessorKey: 'device_type',
    // enableClickToCopy: true,
    header: '设备类型',
    size: 160,
  },
  {
    accessorKey: 'is_used',
    // enableClickToCopy: true,
    header: '状态',
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
  const deviceBases = useAppSelector((state) => state.deviceBase)
  const devices = useAppSelector((state) => state.devices)

  const ipAddressRows = useAppSelector((state) =>
    state.ipAddress.map((ip) => ({
      ...ip,
      device_type:
        deviceBases.find(
          (db) =>
            db.device_model ===
            devices.find(
              (device) =>
                device.ip_address === ip.ip_address &&
                device.network_type === ip.network_type
            )?.device_model
        )?.device_type || '',
      is_used: ip.is_used ? '已使用' : '未使用',
    }))
  )

  return (
    <Table
      columns={columns}
      rows={ipAddressRows}
      initialState={{
        columnVisibility: {
          _id: false,
        },
      }}
    />
  )
}

export default IpAddress
