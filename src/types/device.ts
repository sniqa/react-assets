import { WithId } from '@/types/common'

export interface DeviceInfo {
  user: string
  location: string
  network_type: string
  network_name: string
  ip_address: string
  mac: string
  device_model: string
  device_type: string
  device_category: 'computer' | 'peripheral' | 'netDevice'
  system_version: string
  disk_sn: string
  remark: string
}

export type DeviceInfoWithId = WithId & DeviceInfo
