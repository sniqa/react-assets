import { AddIcon, UploadIcon } from '@assets/Icons'
import DialogWraper from '@comps/DialogWraper'
import Table from '@comps/table2/Table'
import UploadDetail from '@comps/UploadDetail'
import {
	Autocomplete,
	Box,
	IconButton,
	TextField,
	Tooltip,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@store/index'
import { useState } from 'react'

import {
	handleCreateDevice,
	handleDeleteDevice,
	handleUpdateDevice,
} from '@/hooks/device'

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

import CustomSelect from '@comps/CustomSelect'
import { addDevice, deleteDevice, updateDevice } from '@store/device'
import { setIpAddress } from '@store/ipAddress'
import { setNetworkType } from '@store/networkType'

import CustomButton from '@comps/CustomButton'

const columns = [
	{
		accessorKey: 'serial_number',
		enableClickToCopy: true,
		header: '序列号',
		size: 130,
	},
	{
		accessorKey: 'user',
		enableClickToCopy: true,
		header: '使用人',
		size: 130,
	},
	{
		accessorKey: 'location',
		enableClickToCopy: true,
		header: '物理位置',
		size: 180,
	},
	{
		accessorKey: 'network_alias',
		enableClickToCopy: true,
		header: '所属网络',
		size: 150,
	},
	{
		accessorKey: 'network_type',
		enableClickToCopy: true,
		header: '网络类型',
		size: 150,
	},
	{
		accessorKey: 'ip_address',
		enableClickToCopy: true,
		header: 'ip地址',
		size: 180,
	},
	{
		accessorKey: 'mac',
		enableClickToCopy: true,
		header: 'mac',
		size: 180,
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

const initialDeviceInfo = {
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
	device_category: DeviceCategory.Computer, //设备分类
	system_version: '',
	disk_sn: '',
	remark: '',
}

interface DeviceProps {
	onCreate: () => void
	onDelete: () => void
	onUpdate: () => void
}

const Device = ({ onCreate, onDelete, onUpdate }: DeviceProps) => {
	const users = useAppSelector((state) => state.users)
	const departments = useAppSelector((state) => state.department)
	const networkTypes = useAppSelector((state) => state.networkTypes)
	const ipAddress = useAppSelector((state) => state.ipAddress)
	const deviceBase = useAppSelector((state) => state.deviceBase)
	const device = useAppSelector((state) =>
		state.devices
			.filter((device) => device.device_category === DeviceCategory.Computer)
			.map((device) => {
				const device_kind =
					deviceBase.find((db) => db.device_model === device.device_model)
						?.device_kind || ''
				const network_name =
					networkTypes.find(
						(networkType) => networkType.network_type === device.network_type
					)?.network_alias || ''

				return {
					...device,
					device_kind,
					network_name,
				}
			})
	)

	const [openDialog, setOpenDialog] = useState(false)

	const [openUploadDialog, setOpenUploadDialog] = useState(false)

	const [currentRow, setCurrentRow] = useState<DeviceInfoWithId | null>(null)

	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useAppDispatch()

	const [childHook, parentHook] = useChildToParent()

	// 创建
	const handleCreateClick = async () => {
		const deviceInfo = parentHook()

		setIsLoading(true)

		const res = await handleCreateDevice(deviceInfo)

		setIsLoading(false)

		if (res) {
			setOpenDialog(false)

			const { target, ips, network_types } = res
			dispatch(addDevice({ ...deviceInfo, _id: target._id }))
			dispatch(setNetworkType(network_types))
			dispatch(setIpAddress(ips))
		}
	}

	// 删除
	const handleDeleteClick = async (deviceInfo: DeviceInfoWithId) => {
		setIsLoading(true)

		const res = await handleDeleteDevice(deviceInfo)

		setIsLoading(false)

		if (res) {
			const { target, ips, network_types } = res
			dispatch(deleteDevice(deviceInfo))
			dispatch(setNetworkType(network_types))
			dispatch(setIpAddress(ips))
		}
	}

	// 更新
	const handleUpdateClick = async () => {
		const deviceInfo = parentHook()

		setIsLoading(true)

		const res = await handleUpdateDevice(deviceInfo)

		setIsLoading(false)

		if (res) {
			setOpenDialog(false)

			const { target, ips, network_types } = res

			dispatch(setNetworkType(network_types))
			dispatch(setIpAddress(ips))
			dispatch(updateDevice(deviceInfo))
		}
	}

	return (
		<>
			<div className="h-12 px-4 text-2xl">{`计算机`}</div>
			<Table
				columns={columns}
				rows={device}
				isLoading={isLoading}
				initialState={{
					columnVisibility: {
						device_category: false,
						device_model: false,
						disk_sn: false,
						system_version: false,
					},
				}}
				enableRowActions
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
				onClose={() => (setOpenDialog(false), setIsLoading(false))}
				title={currentRow === null ? '新增设备' : `编辑设备`}
				onOk={currentRow === null ? handleCreateClick : handleUpdateClick}
			>
				<DeviceDetail
					userSelection={users}
					locationSelection={departments}
					networkTypeSelection={networkTypes}
					ipAddressSelection={ipAddress}
					deviceModelSelection={deviceBase}
					defaultValue={currentRow}
					emitValue={childHook}
				/>
			</DialogWraper>

			<UploadDetail
				open={openUploadDialog}
				onClose={() => setOpenUploadDialog(false)}
				templateDownloadPath={'/设备模板.csv'}
				title={'上传设备'}
				uploadPath={'/upload/devices'}
			/>
		</>
	)
}

export default Device

interface DeviceDetailProps {
	userSelection?: Array<UserInfoWithId>
	locationSelection?: Array<DepartmentInfoWithId>
	networkTypeSelection?: Array<NetworkTypeInfoWithId>
	ipAddressSelection?: Array<IpAddressInfoWithId>
	deviceModelSelection?: Array<DeviceBaseInfoWithId>
	defaultValue?: DeviceInfoWithId | null
	emitValue: (cb: () => DeviceInfoWithId | null) => void
}

const DeviceDetail = ({
	userSelection = [],
	locationSelection = [],
	networkTypeSelection = [],
	ipAddressSelection = [],
	deviceModelSelection = [],
	defaultValue,
	emitValue,
}: DeviceDetailProps) => {
	const [deviceInfo, setDeviceInfo] = useState<DeviceInfoWithId>(
		defaultValue || initialDeviceInfo
	)

	emitValue(() => deviceInfo)

	return (
		<div className={`flex flex-wrap items-center py-2 pl-2`}>
			<TextField
				label={`序列号`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.serial_number || ''}
				onChange={(e) =>
					setDeviceInfo({
						...deviceInfo,
						serial_number: e.currentTarget.value.trim(),
					})
				}
			/>

			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`使用人`} {...params} size="small" />
				)}
				defaultValue={defaultValue?.user || ''}
				options={userSelection.map((u) => u.username).concat('')}
				onChange={(e, newValue) =>
					setDeviceInfo({ ...deviceInfo, user: newValue || '' })
				}
			/>

			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`物理位置`} {...params} size="small" />
				)}
				options={locationSelection.flatMap((l) => l.locations).concat('')}
				defaultValue={defaultValue?.location || ''}
				onChange={(e, newValue) =>
					setDeviceInfo({ ...deviceInfo, location: newValue || '' })
				}
			/>

			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`所属网络`} {...params} size="small" />
				)}
				options={networkTypeSelection.map((n) => n.network_type).concat('')}
				defaultValue={defaultValue?.network_type || ''}
				onChange={(e, newValue) =>
					setDeviceInfo({ ...deviceInfo, network_type: newValue || '' })
				}
			/>

			{/* ip地址 */}
			<CustomSelect
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				label={`ip地址`}
				options={
					ipAddressSelection
						.filter(
							(i) =>
								i.network_type === deviceInfo.network_type &&
								i.is_used === false
						)
						.map((d) => d.ip_address)
						.concat(
							defaultValue?.ip_address ? ['', defaultValue.ip_address] : ''
						) || []
				}
				value={deviceInfo?.ip_address || ''}
				onChange={(value) =>
					setDeviceInfo({ ...deviceInfo, ip_address: value.toString() })
				}
			/>

			<TextField
				label={`MAC`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.mac || ''}
				onChange={(e) =>
					setDeviceInfo({
						...deviceInfo,
						ip_address: e.currentTarget.value.trim(),
					})
				}
			/>

			{/* <TextField label={`物理位置`} size="small" /> */}

			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`设备型号`} {...params} size="small" />
				)}
				options={deviceModelSelection.map((d) => d.device_model).concat('')}
				defaultValue={defaultValue?.device_model || ''}
				onChange={(e, newValue) =>
					setDeviceInfo({ ...deviceInfo, device_model: newValue || '' })
				}
			/>

			<TextField
				label={`系统版本`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.system_version || ''}
				onChange={(e) =>
					setDeviceInfo({
						...deviceInfo,
						system_version: e.currentTarget.value.trim(),
					})
				}
			/>

			<TextField
				label={`磁盘SN`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.disk_sn || ''}
				onChange={(e) =>
					setDeviceInfo({ ...deviceInfo, user: e.currentTarget.value.trim() })
				}
			/>

			<TextField
				label={`备注`}
				multiline
				minRows={3}
				size="small"
				sx={{ width: '33rem' }}
				defaultValue={defaultValue?.remark || ''}
				onChange={(e) =>
					setDeviceInfo({ ...deviceInfo, user: e.currentTarget.value.trim() })
				}
			/>
		</div>
	)
}
