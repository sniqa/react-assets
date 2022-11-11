import { WithId } from '@/types/common'
import { DeviceCategory } from '@/types/deviceBase'

export interface DeviceInfo {
  user: string
  device_name: string
  serial_number: string
  location: string
  network_type: string //网络类型
  network_alias: string
  ip_address: string
  mac: string
  device_model: string //设备型号
  device_kind: string //设备种类
  device_category: DeviceCategory //设备分类
  system_version: string
  disk_sn: string
  remark: string
}

export type DeviceInfoWithId = WithId & DeviceInfo
