import Device from '@views/device/Device'
import { DeviceCategory } from '@/types/deviceBase'

const TITLE = '计算机'

const DEVICE_CATEGORY = DeviceCategory.Computer

export default () => <Device title={TITLE} deviceCategory={DEVICE_CATEGORY} />
