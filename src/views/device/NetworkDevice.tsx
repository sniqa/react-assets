import Device from '@views/device/Device'
import { DeviceCategory } from '@/types/deviceBase'

const TITLE = '网络设备'

const DEVICE_CATEGORY = DeviceCategory.NetDevice

export default () => <Device title={TITLE} deviceCategory={DEVICE_CATEGORY} />
