import { WithId } from '@/types/common'

export interface IpAddressInfo {
  _id: string
  username: string
  ip_address: string
  network_type: string
  is_used: boolean
}

export type IpAddressInfoWithId = WithId & IpAddressInfo
