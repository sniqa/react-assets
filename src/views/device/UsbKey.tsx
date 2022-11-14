import { UsbKeyInfoWithId } from '@/types/usbKey'
import { AddIcon } from '@assets/Icons'
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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'

import { _fetch } from '@apis/fetch'
import {
	handleCreateUsbKey,
	handleDeleteUsbKey,
	handleUpdateUsbKey,
} from '@hooks/usbKey'
import { useAppSelector } from '@store/index'

const date = new Date().toLocaleDateString()

console.log(date)

const initialState: UsbKeyInfoWithId = {
	_id: '',
	number: '',
	user: '',
	enable_time: date,
	collection_time: date,
	return_time: date,
	remark: '',
}

const columns = [
	{
		accessorKey: 'number',
		enableClickToCopy: true,
		header: '证书编号',
		size: 150,
	},
	{
		accessorKey: 'user',
		enableClickToCopy: true,
		header: '使用人',
		size: 150,
	},
	{
		accessorKey: 'enable_time',
		enableClickToCopy: true,
		header: '启用时间',
		size: 150,
	},
	{
		accessorKey: 'collection_time',
		enableClickToCopy: true,
		header: '领用时间',
		size: 150,
	},
	{
		accessorKey: 'return_time',
		enableClickToCopy: true,
		header: '归还时间',
		size: 150,
	},
	{
		accessorKey: 'remark',
		enableClickToCopy: true,
		header: '备注',
		size: 150,
	},
]

const UsbKey = () => {
	const users = useAppSelector((state) =>
		state.users.map((user) => user.username || '').concat('')
	)

	const [rows, setRows] = useState<UsbKeyInfoWithId[]>([])

	const [openDialog, setOpenDialog] = useState(false)

	const [currentRow, setCurrentRow] = useState<UsbKeyInfoWithId | null>(null)

	const [childHook, parentHook] = useChildToParent()

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const getUsbKeys = async () => {
			const { find_usb_key } = await _fetch({ find_usb_key: {} })

			if (find_usb_key) {
				const { success, data } = find_usb_key

				success && setRows(data)
			}
		}

		getUsbKeys()
	}, [])

	// 创建
	const handleCreateClick = async () => {
		const res = parentHook()

		setIsLoading(true)

		const result = await handleCreateUsbKey(res)

		setIsLoading(false)
	}

	// 删除
	const handleDeleteClick = async (usbKey: UsbKeyInfoWithId) => {
		setIsLoading(true)

		const res = await handleDeleteUsbKey(usbKey)
		setIsLoading(false)
	}

	// 更新
	const handleUpdateClick = async () => {
		const res = parentHook()

		setIsLoading(true)

		const result = await handleUpdateUsbKey(res)

		setIsLoading(false)
	}

	return (
		<div>
			<div className="h-12 px-4 text-2xl">{`数字证书`}</div>

			<Table
				columns={columns}
				rows={rows}
				isLoading={isLoading}
				renderCustomToolbar={
					<Tooltip title={'新增'}>
						<IconButton
							onClick={() => (setOpenDialog(true), setCurrentRow(null))}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
				}
				enableRowActions
				rowActionsSize={150}
				renderRowActions={({ cell, row, table }) => (
					<Box sx={{ width: '8rem', fontSize: '12px' }}>
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
			></Table>

			<DialogWraper
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				title={`数字证书`}
				onOk={currentRow === null ? handleCreateClick : handleUpdateClick}
			>
				<UsbKeyDetail
					emitValue={childHook}
					originData={currentRow}
					userSelection={users}
				/>
			</DialogWraper>
		</div>
	)
}

export default UsbKey

interface UsbKeyDetailProps {
	emitValue: (cb: () => UsbKeyInfoWithId) => void
	originData?: UsbKeyInfoWithId | null
	userSelection?: string[]
}

const UsbKeyDetail = ({
	emitValue,
	originData,
	userSelection = [],
}: UsbKeyDetailProps) => {
	const [usbKey, setUsbKey] = useState(originData || initialState)

	emitValue(() => usbKey)

	return (
		<div className={`flex flex-wrap items-center py-2 pl-2`}>
			<TextField
				label={`编号`}
				size="small"
				defaultValue={originData?.number || ''}
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				onChange={(e) =>
					setUsbKey({ ...usbKey, number: e.currentTarget.value.trim() || '' })
				}
			/>

			{/* 使用人 */}
			<Autocomplete
				sx={{ width: '16rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`使用人`} {...params} size="small" />
				)}
				options={userSelection}
				defaultValue={originData?.user || ''}
				onChange={(e, newValue) =>
					setUsbKey({ ...usbKey, user: newValue || '' })
				}
			/>

			<LocalizationProvider dateAdapter={AdapterDayjs}>
				{/* 启用时间 */}
				<DatePicker
					onChange={(value) =>
						setUsbKey({ ...usbKey, enable_time: value || '' })
					}
					value={usbKey.enable_time}
					renderInput={(params) => (
						<TextField
							size="small"
							defaultValue={originData?.enable_time}
							sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
							{...params}
							label={`启用时间`}
						/>
					)}
				/>

				{/* 领用时间 */}
				<DatePicker
					onChange={(value) =>
						setUsbKey({ ...usbKey, collection_time: value || '' })
					}
					value={usbKey.collection_time}
					renderInput={(params) => (
						<TextField
							size="small"
							defaultValue={originData?.collection_time}
							sx={{ width: '16rem', mb: '1rem' }}
							{...params}
							label={`领用时间`}
						/>
					)}
				/>

				{/* 归还时间 */}
				<DatePicker
					onChange={(value) =>
						setUsbKey({ ...usbKey, return_time: value || '' })
					}
					value={usbKey.return_time}
					renderInput={(params) => (
						<TextField
							sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
							defaultValue={originData?.return_time}
							size="small"
							{...params}
							label={`归还时间`}
						/>
					)}
				/>
			</LocalizationProvider>

			{/* 备注 */}
			<TextField
				sx={{ width: '33rem' }}
				label={`备注`}
				multiline
				minRows={3}
				defaultValue={originData?.remark || ''}
				onChange={(e) =>
					setUsbKey({ ...usbKey, remark: e.currentTarget.value.trim() || '' })
				}
			/>
		</div>
	)
}
