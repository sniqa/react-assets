import { WithId } from '@/types/common'

export interface UserInfo {
  _id: string
  account?: string
  username?: string
  nickname?: string
  number?: string
  department?: string
  location?: string
  remark?: string
}

export type UserInfoWithId = WithId & UserInfo
