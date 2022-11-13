import { DeviceInfo, DeviceInfoWithId } from '@/types/device'
import { _fetch } from '@apis/fetch'
import { confirmbar, notice } from '@apis/mitt'

// 创建设备
export const handleCreateDevice = async (deviceInfo: DeviceInfo) => {
	const [{ create_device }, { find_ips }, { find_network_types }] =
		await _fetch([
			{ create_device: deviceInfo },
			{
				find_ips: {},
			},
			{
				find_network_types: {},
			},
		])

	if (create_device) {
		const { success, data, errmsg } = create_device

		return success
			? (notice({ status: 'success', message: '创建设备成功!' }),
			  {
					ips: find_ips.data,
					network_types: find_network_types.data,
					target: data,
			  })
			: notice({ status: 'error', message: errmsg })
	}

	return notice({
		status: 'error',
		message: '创建设备失败',
	})
}

// 删除设备
export const handleDeleteDevice = async (deviceInfo: DeviceInfoWithId) => {
	const confirmRes = await confirmbar({
		title: '提示',
		message: `此操作会删除该设备及回收ip`,
	})

	if (!confirmRes) {
		return
	}

	const [{ delete_device }, { find_ips }, { find_network_types }] =
		await _fetch([
			{
				delete_device: deviceInfo,
			},
			{ find_ips: {} },
			{ find_network_types: {} },
		])

	if (delete_device) {
		const { success, data, errmsg } = delete_device

		return success
			? (notice({ status: 'success', message: '删除成功' }),
			  {
					ips: find_ips.data,
					network_types: find_network_types.data,
					target: data,
			  })
			: notice({
					status: 'error',
					message: errmsg,
			  })
	}
	return notice({ status: 'error', message: '删除失败' })
}

// 编辑设备
export const handleUpdateDevice = async (deviceInfo: DeviceInfoWithId) => {
	const [{ modify_device }, { find_ips }, { find_network_types }] =
		await _fetch([
			{ modify_device: deviceInfo },
			{ find_ips: {} },
			{ find_network_types: {} },
		])

	if (modify_device) {
		const { success, data, errmsg } = modify_device

		if (success) {
			notice({ status: 'success', message: '修改成功' })
			return {
				ips: find_ips.data,
				network_types: find_network_types.data,
				target: data,
			}
		} else {
			return notice({
				status: 'error',
				message: errmsg,
			})
		}
	}

	return notice({ status: 'error', message: '修改失败' })
}
