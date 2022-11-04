import TableBody from '@comps/table/TableBody'
import TableHeader from '@comps/table/TableHeader'
import TableToolbar from '@comps/table/TableToolbar'
import { createContext } from 'react'
import TablePagenetion from './TablePagination'
import type { TableColumn, TableContainerProps } from './types'

export { TableColumn }

export const tableContext = createContext<TableContainerProps>({
	columns: [],
	rows: [],
})

// scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200

const TableContainer = ({ columns, rows }: TableContainerProps) => {
	return (
		<div className="rounded-lg border-gray-200 border box-border">
			<tableContext.Provider value={{ columns, rows }}>
				<TableToolbar />

				<TableHeader />
				<TableBody />
				{/* columns={columns} rows={rows} */}
				<TablePagenetion></TablePagenetion>
			</tableContext.Provider>
		</div>
	)
}

export default TableContainer
