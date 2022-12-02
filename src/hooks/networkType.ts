import { NetworkTypeInfo, NetworkTypeInfoWithId } from '@/types/networkType'
import { _fetch } from '@apis/fetch'
import { confirmbar, noticebar } from '@apis/mitt'

// 创建
export const handleAddNetworkType = async (val: Partial<NetworkTypeInfo>) => {
  const [{ create_network_type }, { find_network_types }] = await _fetch([
    { create_network_type: val },
    { find_network_types: {} },
  ])

  if (create_network_type) {
    const { success, errmsg } = create_network_type

    return success
      ? (noticebar({ status: 'success', message: '创建网络类型成功' }),
        find_network_types)
      : noticebar({ status: 'error', message: errmsg })
  } else {
    return noticebar({ status: 'error', message: '创建网络类型失败' })
  }
}
