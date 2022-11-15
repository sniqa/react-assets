import { UsbKeyInfoWithId } from '@/types/usbKey'
import { AddIcon } from '@assets/Icons'
import CustomButton from '@comps/CustomButton'
import DialogWraper from '@comps/DialogWraper'
import Table from '@comps/table2/Table'
import { useChildToParent } from '@hooks/common'

import {
	Autocomplete,
	Box,
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

import dayjs from 'dayjs'
import zhcn from 'dayjs/locale/zh-cn'

dayjs.locale(zhcn)

const date = new Date().getTime()

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

	// 初始化
	useEffect(() => {
		const getUsbKeys = async () => {
			const { find_usb_key } = await _fetch({ find_usb_key: {} })

			if (find_usb_key) {
				const { success, data } = find_usb_key

				const newData = data.map((d: UsbKeyInfoWithId) => ({
					...d,
					enable_time: new Date(d.enable_time).toLocaleDateString(),
					collection_time: new Date(d.collection_time).toLocaleDateString(),
					return_time: new Date(d.return_time).toLocaleDateString(),
				}))

				console.log(newData)

				success && setRows(newData)
			}
		}

		getUsbKeys()
	}, [])

	// 创建
	const handleCreateClick = async () => {
		const res = parentHook()

		setIsLoading(true)
		setOpenDialog(false)

		const result = await handleCreateUsbKey(res)

		setIsLoading(false)

		if (result) {
			setRows((olds) => [
				{
					...{
						...res,
						enable_time: new Date(res.enable_time).toLocaleDateString(),
						collection_time: new Date(res.collection_time).toLocaleDateString(),
						return_time: new Date(res.return_time).toLocaleDateString(),
					},
					_id: result.result,
				},
				...olds,
			])
		}
	}

	// 删除
	const handleDeleteClick = async (usbKey: UsbKeyInfoWithId) => {
		setIsLoading(true)
		setOpenDialog(false)

		const result = await handleDeleteUsbKey(usbKey)

		setIsLoading(false)

		if (result) {
			setRows((olds) => olds.filter((old) => old._id != usbKey._id))
		}
	}

	// 更新
	const handleUpdateClick = async () => {
		const res = parentHook()

		setOpenDialog(false)

		setIsLoading(true)

		const result = await handleUpdateUsbKey(res)

		setIsLoading(false)

		if (result) {
			setRows((olds) =>
				olds.map((old) =>
					old._id === res._id
						? {
								...res,
								enable_time: new Date(res.enable_time).toLocaleDateString(),
								collection_time: new Date(
									res.collection_time
								).toLocaleDateString(),
								return_time: new Date(res.return_time).toLocaleDateString(),
						  }
						: old
				)
			)
		}
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
						<CustomButton
							onClick={() => (
								setOpenDialog(true), setCurrentRow(row.original as any)
							)}
						>{`编辑`}</CustomButton>

						<CustomButton
							onClick={() => handleDeleteClick(row.original)}
						>{`删除`}</CustomButton>
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
						setUsbKey({
							...usbKey,
							enable_time: value?.valueOf() || new Date().getTime(),
						})
					}
					value={usbKey.enable_time}
					renderInput={(params) => (
						<TextField
							size="small"
							sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
							{...params}
							label={`启用时间`}
						/>
					)}
				/>

				{/* 领用时间 */}
				<DatePicker
					onChange={(value) => {
						setUsbKey({
							...usbKey,
							collection_time: value?.valueOf() || new Date().getTime(),
						})
					}}
					value={usbKey.collection_time}
					renderInput={(params) => (
						<TextField
							size="small"
							// defaultValue={originData?.collection_time}
							sx={{ width: '16rem', mb: '1rem' }}
							{...params}
							label={`领用时间`}
						/>
					)}
				/>

				{/* 归还时间 */}
				<DatePicker
					onChange={(value) =>
						setUsbKey({
							...usbKey,
							return_time: value?.valueOf() || new Date().getTime(),
						})
					}
					value={usbKey.return_time}
					renderInput={(params) => (
						<TextField
							sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
							// defaultValue={originData?.return_time}
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
