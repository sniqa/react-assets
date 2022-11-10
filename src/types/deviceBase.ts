import { WithId } from '@/types/common'

export interface DeviceBaseInfo {
  _id: string
  device_model: string //设备型号
  device_type: string //设备类型
  manufacture_date: string //出厂日期
  shelf_life: string //保质期
}

export type DeviceBaseInfoWithId = WithId & DeviceBaseInfo
