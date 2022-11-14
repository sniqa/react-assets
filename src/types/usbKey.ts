import { WithId } from '@/types/common'

export interface UsbKeyInfo {
	number: string
	user: string
	enable_time: string
	collection_time: string
	return_time: string
	remark: string
}

export type UsbKeyInfoWithId = WithId & UsbKeyInfo
