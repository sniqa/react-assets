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
import { Suspense, useState } from 'react'

import { _fetch } from '@apis/fetch'
import {
	handleCreateUsbKey,
	handleDeleteUsbKey,
	handleUpdateUsbKey,
} from '@hooks/usbKey'
import { useAppSelector } from '@store/index'

import { HamsterLoading } from '@comps/Loading'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

// 获取
const getUsbKeys = async () => {
	const { find_usb_key } = await _fetch({ find_usb_key: {} })

	const { success, data } = find_usb_key

	return success
		? data.map((d: UsbKeyInfoWithId) => ({
				...d,
				enable_time: new Date(d.enable_time).toLocaleDateString(),
				collection_time: new Date(d.collection_time).toLocaleDateString(),
				return_time: new Date(d.return_time).toLocaleDateString(),
		  }))
		: []
}

// 创建
const handleCreateClick = async (res: UsbKeyInfoWithId) => {
	const result = await handleCreateUsbKey(res)

	return {
		...res,
		enable_time: new Date(res.enable_time).toLocaleDateString(),
		collection_time: new Date(res.collection_time).toLocaleDateString(),
		return_time: new Date(res.return_time).toLocaleDateString(),
		_id: result,
	}
}

// 删除
const handleDeleteClick = async (usbKey: UsbKeyInfoWithId) => {
	const res = await handleDeleteUsbKey(usbKey)

	return res
}

// 更新
const handleUpdateClick = async (res: UsbKeyInfoWithId) => {
	const result = await handleUpdateUsbKey(res)

	return result
}

const UsbKey = () => {
	const users = useAppSelector((state) =>
		state.users.map((user) => user.username || '').concat('')
	)

	const [openDialog, setOpenDialog] = useState(false)

	const [currentRow, setCurrentRow] = useState<UsbKeyInfoWithId | null>(null)

	const [childHook, parentHook] = useChildToParent<UsbKeyInfoWithId>()

	const queryClient = useQueryClient()

	// 获取数据
	const query = useQuery({ queryKey: ['usb_key'], queryFn: getUsbKeys })

	//创建
	const creation = useMutation({
		mutationFn: async () => {
			setOpenDialog(false)

			handleCreateClick(parentHook())
		},
		onSuccess: (data) => {
			queryClient.refetchQueries({ queryKey: ['usb_key'] })
		},
	})

	//删除
	const deletion = useMutation({
		mutationFn: async (usbKey: UsbKeyInfoWithId) => {
			setOpenDialog(false)

			handleDeleteClick(usbKey)
		},
		onSuccess: (data) => {
			console.log(data)

			queryClient.setQueryData(['usb_key'], (oldData) => oldData)

			// queryClient.refetchQueries({ queryKey: ['usb_key'] })
		},
	})
	console.log(query.data)

	// 更新
	const updation = useMutation({
		mutationFn: async () => {
			setOpenDialog(false)

			handleUpdateClick(parentHook())
		},
		onSuccess: (data) => {
			queryClient.refetchQueries({ queryKey: ['usb_key'] })
		},
	})

	return (
		<Suspense fallback={<HamsterLoading />}>
			<div className="h-12 px-4 text-2xl">{`数字证书`}</div>

			<Table
				columns={columns}
				rows={query.data}
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
							onClick={() => deletion.mutateAsync(row.original)}
						>{`删除`}</CustomButton>
					</Box>
				)}
			></Table>

			<DialogWraper
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				title={`数字证书`}
				onOk={
					currentRow === null
						? () => creation.mutateAsync()
						: () => updation.mutateAsync()
				}
			>
				<UsbKeyDetail
					emitValue={childHook}
					originData={currentRow}
					userSelection={users}
				/>
			</DialogWraper>
		</Suspense>
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
