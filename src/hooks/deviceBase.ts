import { DeviceBaseInfo, DeviceBaseInfoWithId } from '@/types/deviceBase'
import { _fetch } from '@apis/fetch'
import { confirmbar, notice } from '@apis/mitt'

// 创建
export const handleCreateDeviceBase = async (
	deviceBaseInfo: DeviceBaseInfo
) => {
	const { create_device_base } = await _fetch({
		create_device_base: deviceBaseInfo,
	})

	if (create_device_base) {
		const { success, data, errmsg } = create_device_base
		return success
			? (notice({
					status: 'success',
					message: '创建设备基础资料成功',
			  }),
			  {
					result: data,
			  })
			: notice({
					status: 'error',
					message: errmsg,
			  })
	}

	return notice({
		status: 'error',
		message: '创建设备基础资料失败',
	})
}

// 删除
export const handleDeleteDeviceBase = async (
	deviceBaseInfo: DeviceBaseInfoWithId
) => {
	const res = await confirmbar({
		title: '提示',
		message: '确定删除选中的项目？其他依赖此项的数据将会清空此项数据',
	})

	if (!res) {
		return
	}

	const { delete_device_base } = await _fetch({
		delete_device_base: deviceBaseInfo,
	})

	if (delete_device_base) {
		const { success, data, errmsg } = delete_device_base

		return success
			? (notice({ status: 'success', message: '删除成功' }),
			  {
					result: data,
			  })
			: notice({ status: 'error', message: errmsg })
	}

	return notice({ status: 'error', message: '删除失败' })
}

export const handleModifyDeviceBase = async (
	deviceBaseInfo: DeviceBaseInfoWithId
) => {
	const { modify_device_base } = await _fetch({
		modify_device_base: deviceBaseInfo,
	})

	if (modify_device_base) {
		const { success, data, errmsg } = modify_device_base

		return success
			? (notice({
					status: 'success',
					message: '更新成功',
			  }),
			  {
					result: data,
			  })
			: notice({
					status: 'error',
					message: errmsg,
			  })
	}

	return notice({
		status: 'error',
		message: '更新失败',
	})
}
