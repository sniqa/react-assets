import { _fetch } from '@apis/fetch'
import { notice, confirmbar } from '@apis/mitt'
import { NetworkTypeInfo, NetworkTypeInfoWithId } from '@/types/networkType'
import { useAppDispatch } from '@store/index'
import { setIpAddress } from '@store/ipAddress'

import { setDevices } from '@store/device'
import { ThunkDispatch } from '@reduxjs/toolkit'

// 创建
export const handleAddNetworkType = async (val: Partial<NetworkTypeInfo>) => {
  const [{ create_network_type }, { find_ips }, { find_devices }] =
    await _fetch([
      { create_network_type: val },
      {
        find_ips: {},
      },
      { find_devices: {} },
    ])

  if (create_network_type) {
    const { success, errmsg } = create_network_type

    return success
      ? (notice({ status: 'success', message: '创建网络类型成功' }),
        {
          ips: find_ips.data,
          devices: find_devices.data,
          targetNetworkType: create_network_type.data,
        })
      : notice({ status: 'error', message: errmsg })
  } else {
    return notice({ status: 'error', message: '创建网络类型失败' })
  }
}

// 删除
export const handleDeleteNetworkType = async (info: NetworkTypeInfoWithId) => {
  const res = await confirmbar({
    title: '提示',
    message: '删除此信息会同步删除与此有关的全部资料',
  })

  if (!res) {
    return
  }

  const [{ delete_network_type }, { find_ips }, { find_devices }] =
    await _fetch([
      { delete_network_type: info },
      { find_ips: {} },
      { find_devices: {} },
    ])

  if (delete_network_type) {
    const { success, data, errmsg } = delete_network_type

    return success
      ? (notice({ status: 'success', message: `删除网络类型成功` }),
        {
          ips: find_ips.data,
          devices: find_devices.data,
          targetNetworkType: info,
        })
      : notice({ status: 'error', message: errmsg })
  } else {
    return notice({
      status: 'error',
      message: `删除网络类型失败`,
    })
  }
}
