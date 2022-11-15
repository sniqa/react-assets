import { WithId } from '@/types/common'

export interface UsbKeyInfo {
	number: string
	user: string
	enable_time: number
	collection_time: number
	return_time: number
	remark: string
}

export type UsbKeyInfoWithId = WithId & UsbKeyInfo
