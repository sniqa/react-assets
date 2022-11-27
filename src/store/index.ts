import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import confirmReducer from './confirm'
import departmentReducer from './department'
import deviceReducer from './device'
import deviceBaseReducer from './deviceBase'
import documentReducer from './document'
import documentHistoryReducer from './documentHistory'
import ipAddressReducer from './ipAddress'
import networkTypeReducer from './networkType'
import userReducer from './users'

const store = configureStore({
	reducer: {
		users: userReducer,
		networkTypes: networkTypeReducer,
		confirm: confirmReducer,
		department: departmentReducer,
		deviceBase: deviceBaseReducer,
		devices: deviceReducer,
		ipAddress: ipAddressReducer,
		document: documentReducer,
		documentHistory: documentHistoryReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
