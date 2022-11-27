import { DocumentInfoWithId } from '@/types/document'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: DocumentInfoWithId[] = []

export const documentSlice = createSlice({
	name: 'networkType',
	initialState: initialState,
	reducers: {
		setDocuments: (state, action: PayloadAction<DocumentInfoWithId[]>) => {
			return (state = action.payload)
		},
	},
})

export const { setDocuments } = documentSlice.actions

export default documentSlice.reducer
