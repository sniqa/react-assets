import type { DeviceInfoWithId } from '@/types/device'
import { _fetch } from '@apis/fetch'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const getDevices = async (): Promise<DeviceInfoWithId[]> => {
	try {
		const { find_devices } = await _fetch({
			find_devices: {},
		})
		if (find_devices) {
			const { success, data, errmsg } = find_devices

			return success ? data : []
		}
	} catch {
		return []
	}
	return []
}

export const deviceSlice = createSlice({
	name: 'device',
	initialState: await getDevices().catch((err) => []),
	reducers: {
		setDevices: (state, action: PayloadAction<DeviceInfoWithId[]>) =>
			action.payload,
		addDevice: (state, action: PayloadAction<DeviceInfoWithId>) => {
			return [action.payload, ...state]
		},
		updateDevice: (state, action: PayloadAction<DeviceInfoWithId>) => {
			return state.map((device) =>
				device._id === action.payload._id
					? { ...device, ...action.payload }
					: device
			)
		},
		deleteManyDevice: (
			state,
			action: PayloadAction<Array<DeviceInfoWithId>>
		) => {
			return state.filter(
				(device) => !action.payload.some((target) => target._id === device._id)
			)
		},
		deleteDevice: (state, action: PayloadAction<DeviceInfoWithId>) => {
			return state.filter((device) => device._id != action.payload._id)
		},
	},
})

export const {
	setDevices,
	addDevice,
	updateDevice,
	deleteManyDevice,
	deleteDevice,
} = deviceSlice.actions

export default deviceSlice.reducer
