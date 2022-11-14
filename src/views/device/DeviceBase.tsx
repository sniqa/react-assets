import { AddIcon } from '@/assets/Icons'
import {
	DeviceBaseInfoWithId,
	DeviceCategory,
	DeviceKind,
	DeviceKinds,
	getDeviceCategoryFromDeviceKind,
} from '@/types/deviceBase'
import DialogWraper from '@comps/DialogWraper'
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
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@store/index'

import {
	addDeviceBase,
	deleteDeviceBase,
	updateDeviceBase,
} from '@store/deviceBase'

import {
	handleCreateDeviceBase,
	handleDeleteDeviceBase,
	handleModifyDeviceBase,
} from '@hooks/deviceBase'

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
	// {
	// 	accessorKey: 'device_category',
	// 	// enableClickToCopy: true,
	// 	header: '设备分类',
	// 	size: 150,
	// },
	{
		accessorKey: 'device_kind',
		// enableClickToCopy: true,
		header: '设备种类',
		size: 150,
	},
]

const DeviceBase = () => {
	const deviceBaseRows = useAppSelector((state) => state.deviceBase)

	const [openDialog, setOpenDialog] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [currentRow, setCurrentRow] = useState<DeviceBaseInfoWithId | null>(
		null
	)

	const [childHook, parentHook] = useChildToParent()

	const dispatch = useAppDispatch()

	// 创建
	const handleCreateClick = async () => {
		setIsLoading(true)

		const res = parentHook()

		const result = await handleCreateDeviceBase(res)

		setIsLoading(false)

		if (result) {
			setOpenDialog(false)

			console.log({ ...res, _id: result.result })

			dispatch(addDeviceBase({ ...res, _id: result.result }))
		}
	}

	// 更新
	const handleUpdateClick = async () => {
		const res = parentHook()

		setIsLoading(true)

		const result = await handleModifyDeviceBase(res)

		setIsLoading(false)
		if (result) {
			setOpenDialog(false)

			dispatch(updateDeviceBase(res))
		}
	}

	// 删除
	const handleDeleteClick = async (deviceBase: DeviceBaseInfoWithId) => {
		setIsLoading(true)

		const res = await handleDeleteDeviceBase(deviceBase)

		setIsLoading(false)

		if (res) {
			dispatch(deleteDeviceBase(deviceBase))
		}
	}

	return (
		<>
			<div className="h-12 px-4 text-2xl">{`设备基础资料`}</div>
			{/* <div className="h-12 px-4 text-2xl">
        <Button
          onClick={() => setOpenDeviceKindDialog(true)}
        >{`设备种类`}</Button>
        <Button
          onClick={() => setOpenDeviceCategoryDialog(true)}
        >{`设备分类`}</Button>
      </div> */}

			<Table
				columns={columns}
				isLoading={isLoading}
				rows={deviceBaseRows}
				tableContainerHeight="calc(100vh - 15rem)"
				enableRowActions
				renderCustomToolbar={
					<Tooltip title={'新增'}>
						<IconButton
							onClick={() => (setOpenDialog(true), setCurrentRow(null))}
						>
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
								setOpenDialog(true), setCurrentRow(row.original as any)
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

			<DialogWraper
				title={'设备基础资料'}
				open={openDialog}
				onClose={() => (setOpenDialog(false), setIsLoading(false))}
				onOk={currentRow === null ? handleCreateClick : handleUpdateClick}
			>
				<DeviceBaseDetail emitValue={childHook} originDate={currentRow} />
			</DialogWraper>
		</>
	)
}

export default DeviceBase

interface DeviceBaseDetailProps {
	emitValue: (cb: () => void) => void
	originDate?: DeviceBaseInfoWithId | null
}

const DeviceBaseDetail = ({ emitValue, originDate }: DeviceBaseDetailProps) => {
	const [deviceBase, setDeviceBase] = useState<DeviceBaseInfoWithId>(
		originDate || {
			_id: '',
			vendor: '', //设备品牌
			device_model: '', //设备型号
			device_category: DeviceCategory.None, //设备分类
			device_kind: DeviceKind.None, //设备种类
			manufacture_date: '', //出厂日期
			shelf_life: '', //保质期
			remark: '',
		}
	)

	emitValue(() => deviceBase)

	return (
		<div className={`flex flex-wrap items-center py-2 pl-2`}>
			<TextField
				size="small"
				label={`设备品牌`}
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={originDate?.vendor || ''}
				onChange={(e) =>
					setDeviceBase({ ...deviceBase, vendor: e.currentTarget.value.trim() })
				}
			></TextField>

			<TextField
				size="small"
				label={`设备型号`}
				required
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={originDate?.device_model || ''}
				onChange={(e) =>
					setDeviceBase({
						...deviceBase,
						device_model: e.currentTarget.value.trim(),
					})
				}
			></TextField>

			<TextField
				size="small"
				label={`出厂日期`}
				defaultValue={originDate?.manufacture_date || ''}
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				onChange={(e) =>
					setDeviceBase({
						...deviceBase,
						manufacture_date: e.currentTarget.value.trim(),
					})
				}
			></TextField>

			<TextField
				size="small"
				label={`保质期`}
				defaultValue={originDate?.shelf_life || ''}
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				onChange={(e) =>
					setDeviceBase({
						...deviceBase,
						shelf_life: e.currentTarget.value.trim(),
					})
				}
			></TextField>

			<Autocomplete
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField {...params} required label={`设备种类`} />
				)}
				options={DeviceKinds}
				defaultValue={originDate?.device_kind || ''}
				onChange={(e, newValue) =>
					setDeviceBase({
						...deviceBase,
						device_kind: newValue || '',
						device_category: getDeviceCategoryFromDeviceKind(newValue || ''),
					})
				}
			/>

			{/* <Autocomplete
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => <TextField {...params} label={`设备分类`} />}
				options={DeviceCategorys}
				defaultValue={originDate?.device_category || ''}
				onChange={(e, newValue) =>
					setDeviceBase({ ...deviceBase, device_category: newValue || '' })
				}
			/> */}

			<TextField
				multiline
				minRows={3}
				size="small"
				sx={{ width: '33rem' }}
				label={`备注`}
				defaultValue={originDate?.remark || ''}
				onChange={(e) =>
					setDeviceBase({ ...deviceBase, remark: e.currentTarget.value.trim() })
				}
			></TextField>
		</div>
	)
}
