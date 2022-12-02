import Device from '@views/device/Device'
import { DeviceCategory } from '@/types/deviceBase'

const TITLE = '服务器'

const DEVICE_CATEGORY = DeviceCategory.Server

export default () => <Device title={TITLE} deviceCategory={DEVICE_CATEGORY} />
