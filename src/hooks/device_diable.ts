export {}

// import { _fetch } from '@apis/fetch'
// import { notice, confirmbar } from '@apis/mitt'
// import { useAppDispatch } from '@store/index'
// import { addDevice, updateDevice, deleteDevice } from '@store/device'
// import { setIpAddress } from '@store/ipAddress'
// import { setNetworkType } from '@store/networkType'
// import { DeviceInfo, DeviceInfoWithId } from '@/types/device'

// // 创建设备
// export const handleCreateDevice = async (deviceInfo: DeviceInfo) => {
//   const [{ create_device }, { find_ips }, { find_network_types }] =
//     await _fetch([
//       { create_device: deviceInfo },
//       {
//         find_ips: {},
//       },
//       {
//         find_network_types: {},
//       },
//     ])

//   if (create_device) {
//     const { success, data, errmsg } = create_device

//     const dispatch = useAppDispatch()

//     if (find_ips.success) {
//       dispatch(setIpAddress(find_ips.data))
//     }

//     if (find_network_types.success) {
//       dispatch(setNetworkType(find_network_types.data))
//     }

//     return success
//       ? (dispatch(addDevice({ ...data, ...deviceInfo })),
//         notice({ status: 'success', message: '创建设备成功!' }))
//       : notice({ status: 'error', message: errmsg })
//   }

//   return notice({
//     status: 'error',
//     message: '创建设备失败',
//   })
// }

// // 更新设备
// export const handleModifyDevice = async (deviceInfo: DeviceInfoWithId) => {
//   const [{ modify_device }, { find_ips }, { find_network_types }] =
//     await _fetch([
//       { modify_device: deviceInfo },
//       { find_ips: {} },
//       { find_network_types: {} },
//     ])

//   if (modify_device) {
//     const { success, data, errmsg } = modify_device

//     if (success) {
//       const dispatch = useAppDispatch()

//       dispatch(updateDevice(deviceInfo))

//       if (find_network_types) {
//         dispatch(setNetworkType(find_network_types.data))
//       }

//       if (find_ips) {
//         dispatch(setIpAddress(find_ips.data))
//       }

//       return notice({ status: 'success', message: '修改成功' })
//     } else {
//       return notice({
//         status: 'error',
//         message: errmsg,
//       })
//     }
//   }

//   return notice({ status: 'error', message: '修改失败' })
// }

// // 删除设备
// export const handleDeleteDevice = async (device: DeviceInfoWithId) => {
//   const confirmRes = await confirmbar({
//     title: '提示',
//     message: `此操作会删除该设备及回收ip`,
//   })

//   if (!confirmRes) {
//     return
//   }

//   const [{ delete_device }, { find_ips }, { find_network_types }] =
//     await _fetch([
//       {
//         delete_device: device,
//       },
//       { find_ips: {} },
//       { find_network_types: {} },
//     ])

//   if (delete_device) {
//     const { success, data, errmsg } = delete_device

//     const dispatch = useAppDispatch()

//     if (find_ips) {
//       dispatch(setIpAddress(find_ips.data))
//     }
//     if (find_network_types) {
//       dispatch(setNetworkType(find_network_types.data))
//     }

//     return success
//       ? (dispatch(deleteDevice(device)),
//         notice({ status: 'success', message: '删除成功' }))
//       : notice({
//           status: 'error',
//           message: errmsg,
//         })
//   }
//   return notice({ status: 'error', message: '删除失败' })
// }
