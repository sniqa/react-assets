import { UsbKeyInfo, UsbKeyInfoWithId } from '@/types/usbKey'
import { _fetch } from '@apis/fetch'
import { confirmbar, notice } from '@apis/mitt'

export const handleCreateUsbKey = async (usbKey: UsbKeyInfo) => {
	const { create_usb_key } = await _fetch({ create_usb_key: usbKey })

	if (create_usb_key) {
		const { success, data, errmsg } = create_usb_key

		return success
			? (notice({
					status: 'success',
					message: '创建数字证书成功',
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
		message: `创建数字证书失败`,
	})
}

export const handleDeleteUsbKey = async (usbKey: UsbKeyInfoWithId) => {
	const isSure = await confirmbar({
		title: '提示',
		message: `确定删除此数字证书?`,
	})

	if (!isSure) {
		return
	}

	const { delete_usb_key } = await _fetch({ delete_usb_key: usbKey })

	if (delete_usb_key) {
		const { success, data, errmsg } = delete_usb_key

		if (success) {
			notice({
				status: 'success',
				message: `删除数字证书成功`,
			})

			return {
				result: data,
			}
		}

		return notice({
			status: 'error',
			message: errmsg,
		})
	}

	return notice({
		status: 'error',
		message: '删除数字证书失败',
	})
}

export const handleUpdateUsbKey = async (usbKey: UsbKeyInfoWithId) => {
	const { modify_usb_key } = await _fetch({ modify_usb_key: usbKey })

	if (modify_usb_key) {
		const { success, data, errmsg } = modify_usb_key

		if (success) {
			notice({
				status: 'success',
				message: `变更数字证书成功`,
			})

			return {
				result: data,
			}
		}

		return notice({
			status: 'error',
			message: errmsg,
		})
	}

	return notice({
		status: 'error',
		message: `变更数字证书失败`,
	})
}
