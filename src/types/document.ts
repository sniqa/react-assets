import { WithId } from '@/types/common'

export interface DocumentInfo {
	title: string
	content: string
	create_timestamp: number
	last_modify_timestamp: number
	autor: string
	description: string
}

export type DocumentInfoWithId = WithId & DocumentInfo
