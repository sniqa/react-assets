import { WithId } from '@/types/common'

// department
export interface DepartmentInfo {
	department_name: string
	locations: string[]
	remark: string
}

export type DepartmentInfoWithId = WithId & DepartmentInfo
