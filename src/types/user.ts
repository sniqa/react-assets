import { WithId } from '@/types/common'

export interface UserInfo {
  _id: string
  account?: string
  username?: string
  nickname?: string
  number?: number
  department?: string
  location?: string
}

export type UserInfoWithId = WithId & UserInfo
