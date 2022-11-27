import { DocumentHistoryInfoWithId } from '@/types/document'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: DocumentHistoryInfoWithId = {
	_id: '',
	document_id: '',
	content: '',
	timestamp: 0,
}

export const documentHistorySlice = createSlice({
	name: 'networkType',
	initialState: initialState,
	reducers: {
		setCurrentDocumentHistory: (
			state,
			action: PayloadAction<DocumentHistoryInfoWithId>
		) => {
			return (state = action.payload)
		},
	},
})

export const { setCurrentDocumentHistory } = documentHistorySlice.actions

export default documentHistorySlice.reducer
