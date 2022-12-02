import Device from '@views/device/Device'
import { DeviceCategory } from '@/types/deviceBase'

const TITLE = '办公设备'

const DEVICE_CATEGORY = DeviceCategory.OfficeEquipment

export default () => <Device title={TITLE} deviceCategory={DEVICE_CATEGORY} />
