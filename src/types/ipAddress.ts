import { WithId } from '@/types/common'
import { DeviceKind } from '@/types/deviceBase'

export interface IpAddressInfo {
  _id: string
  username: string
  ip_address: string
  network_type: string
  device_kind: DeviceKind
  is_used: boolean
}

export type IpAddressInfoWithId = WithId & IpAddressInfo
