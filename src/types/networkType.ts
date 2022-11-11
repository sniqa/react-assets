import { WithId } from '@/types/common'

export interface NetworkTypeInfo {
  network_type: string //网络类型
  network_alias: string //网络别名
  ip_address_start: string
  ip_address_end: string
  netmask: string
  gateway: string
  dns: string
  used_number?: number
  unused_number?: number
  total_number?: number
  remark: string
}

export type NetworkTypeInfoWithId = WithId & NetworkTypeInfo
