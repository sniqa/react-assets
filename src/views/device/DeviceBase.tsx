import { Button } from '@mui/material'
import Table from '@comps/table2/Table'
import DialogWraper from '@comps/DialogWraper'
import { useState } from 'react'

const columns = [
  {
    accessorKey: 'vendor',
    // enableClickToCopy: true,
    header: '设备品牌',
    size: 150,
  },
  {
    accessorKey: 'device_model',
    // enableClickToCopy: true,
    header: '设备型号',
    size: 150,
  },
  {
    accessorKey: 'manufacture_date',
    // enableClickToCopy: true,
    header: '出厂日期',
    size: 150,
  },
  {
    accessorKey: 'shelf_life',
    // enableClickToCopy: true,
    header: '保质期',
    size: 150,
  },
  {
    accessorKey: 'device_category',
    // enableClickToCopy: true,
    header: '设备分类',
    size: 150,
  },
  {
    accessorKey: 'device_kind',
    // enableClickToCopy: true,
    header: '设备种类',
    size: 150,
  },
]

const DeviceBase = () => {
  const [openDeviceKindDialog, setOpenDeviceKindDialog] = useState(false)
  const [openDeviceCategoryDialog, setOpenDeviceCategoryDialog] =
    useState(false)

  return (
    <>
      <div className="h-12 px-4 text-2xl">{`设备基础资料`}</div>
      <div className="h-12 px-4 text-2xl">
        <Button
          onClick={() => setOpenDeviceKindDialog(true)}
        >{`设备种类`}</Button>
        <Button
          onClick={() => setOpenDeviceCategoryDialog(true)}
        >{`设备分类`}</Button>
      </div>

      <Table
        columns={columns}
        rows={[]}
        tableContainerHeight="calc(100vh - 15rem)"
      />

      <DialogWraper
        title={'设备种类'}
        open={openDeviceKindDialog}
        onClose={() => setOpenDeviceKindDialog(false)}
      />
    </>
  )
}

export default DeviceBase
