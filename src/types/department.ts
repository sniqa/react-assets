import { WithId } from '@/types/common'

// department
export interface DepartmentInfo {
  department_name: string
  locations: string[]
}

export type DepartmentInfoWhitId = WithId & DepartmentInfo
