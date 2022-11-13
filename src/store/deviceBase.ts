import type { DeviceBaseInfoWithId } from '@/types/deviceBase'
import { _fetch } from '@apis/fetch'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const getDeviceBases = async (): Promise<DeviceBaseInfoWithId[]> => {
	const { find_device_base } = await _fetch({ find_device_base: {} })

	if (find_device_base) {
		const { success, data, errmsg } = find_device_base
		return success ? data : []
	}

	return []
}

export const deviceBaseSlice = createSlice({
	name: 'deviceBase',
	initialState: await getDeviceBases().catch((err) => []),
	reducers: {
		setDeviceBases: (state, action: PayloadAction<DeviceBaseInfoWithId[]>) =>
			action.payload,
		addDeviceBase: (state, action: PayloadAction<DeviceBaseInfoWithId>) => {
			return [action.payload, ...state]
		},
		updateDeviceBase: (state, action: PayloadAction<DeviceBaseInfoWithId>) => {
			return state.map((deviceBase) =>
				deviceBase._id === action.payload._id
					? { ...deviceBase, ...action.payload }
					: deviceBase
			)
		},
		deleteManyDeviceBase: (
			state,
			action: PayloadAction<Array<string | number>>
		) => {
			return state.filter(
				(deviceBase) =>
					!action.payload.some((target) => target === deviceBase._id)
			)
		},
		deleteDeviceBase: (state, action: PayloadAction<DeviceBaseInfoWithId>) => {
			return state.filter((deviceBase) => deviceBase._id != action.payload._id)
		},
	},
})

export const {
	setDeviceBases,
	addDeviceBase,
	updateDeviceBase,
	deleteManyDeviceBase,
	deleteDeviceBase,
} = deviceBaseSlice.actions

export default deviceBaseSlice.reducer
