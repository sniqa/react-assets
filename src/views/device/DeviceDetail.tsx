import { Autocomplete, TextField } from '@mui/material'
import { useState, memo } from 'react'

import { DepartmentInfoWithId } from '@/types/department'
import { DeviceInfoWithId } from '@/types/device'
import { DeviceBaseInfoWithId } from '@/types/deviceBase'
import { IpAddressInfoWithId } from '@/types/ipAddress'
import { NetworkTypeInfoWithId } from '@/types/networkType'
import { UserInfoWithId } from '@/types/user'

import CustomSelect from '@comps/CustomSelect'

interface DeviceDetailProps {
  userInfos: UserInfoWithId[]
  departmentInfos: DepartmentInfoWithId[]
  ipAddressInfos: IpAddressInfoWithId[]
  networkTypeInfos: NetworkTypeInfoWithId[]
  deviceBaseInfos: DeviceBaseInfoWithId[]
  defaultValue?: DeviceInfoWithId | null
  initialDeviceInfo: any
  emitValue: (cb: () => DeviceInfoWithId | null) => void
}

const DeviceDetail = ({
  defaultValue,
  emitValue,
  networkTypeInfos,
  deviceBaseInfos,
  userInfos,
  departmentInfos,
  ipAddressInfos,
  initialDeviceInfo,
}: DeviceDetailProps) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoWithId>(
    defaultValue || initialDeviceInfo
  )

  emitValue(() => deviceInfo)

  return (
    <div className={`flex flex-wrap items-center py-2 pl-2`}>
      <TextField
        label={`序列号`}
        size="small"
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        defaultValue={defaultValue?.serial_number || ''}
        onChange={(e) =>
          setDeviceInfo({
            ...deviceInfo,
            serial_number: e.currentTarget.value.trim(),
          })
        }
      />

      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`使用人`} {...params} size="small" />
        )}
        defaultValue={defaultValue?.user || ''}
        options={userInfos.map((u) => u?.username || '').concat('')}
        onChange={(e, newValue) =>
          setDeviceInfo({ ...deviceInfo, user: newValue || '' })
        }
      />

      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`物理位置`} {...params} size="small" />
        )}
        options={departmentInfos.flatMap((l) => l?.locations || '').concat('')}
        defaultValue={defaultValue?.location || ''}
        onChange={(e, newValue) =>
          setDeviceInfo({ ...deviceInfo, location: newValue || '' })
        }
      />

      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`所属网络`} {...params} size="small" />
        )}
        options={networkTypeInfos.map((n) => n?.network_type || '').concat('')}
        defaultValue={defaultValue?.network_type || ''}
        onChange={(e, newValue) =>
          setDeviceInfo({ ...deviceInfo, network_type: newValue || '' })
        }
      />

      {/* ip地址 */}
      <CustomSelect
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        label={`ip地址`}
        options={
          ipAddressInfos
            .filter(
              (i) =>
                i.network_type === deviceInfo.network_type &&
                i.is_used === false
            )
            .map((d) => d.ip_address)
            .concat(
              defaultValue?.ip_address ? ['', defaultValue.ip_address] : ''
            ) || []
        }
        value={deviceInfo?.ip_address || ''}
        onChange={(value) =>
          setDeviceInfo({ ...deviceInfo, ip_address: value.toString() })
        }
      />

      <TextField
        label={`MAC`}
        size="small"
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        defaultValue={defaultValue?.mac || ''}
        onChange={(e) =>
          setDeviceInfo({
            ...deviceInfo,
            ip_address: e.currentTarget.value.trim(),
          })
        }
      />

      {/* <TextField label={`物理位置`} size="small" /> */}

      <Autocomplete
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        renderInput={(params) => (
          <TextField label={`设备型号`} {...params} size="small" />
        )}
        options={deviceBaseInfos.map((d) => d?.device_model || '').concat('')}
        defaultValue={defaultValue?.device_model || ''}
        onChange={(e, newValue) =>
          setDeviceInfo({ ...deviceInfo, device_model: newValue || '' })
        }
      />

      <TextField
        label={`系统版本`}
        size="small"
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        defaultValue={defaultValue?.system_version || ''}
        onChange={(e) =>
          setDeviceInfo({
            ...deviceInfo,
            system_version: e.currentTarget.value.trim(),
          })
        }
      />

      <TextField
        label={`磁盘SN`}
        size="small"
        sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
        defaultValue={defaultValue?.disk_sn || ''}
        onChange={(e) =>
          setDeviceInfo({ ...deviceInfo, user: e.currentTarget.value.trim() })
        }
      />

      <TextField
        label={`备注`}
        multiline
        minRows={3}
        size="small"
        sx={{ width: '33rem' }}
        defaultValue={defaultValue?.remark || ''}
        onChange={(e) =>
          setDeviceInfo({ ...deviceInfo, user: e.currentTarget.value.trim() })
        }
      />
    </div>
  )
}

export default memo(DeviceDetail)
