import { localization } from '@comps/table2/localization'
import {  useMemo, useEffect,useRef, useState, ReactNode } from 'react'
//MRT Imports
import MaterialReactTable, { MRT_Cell, MRT_ColumnDef, MRT_Row, MRT_TableInstance, Virtualizer,  } from 'material-react-table'

import { SortingState } from '@tanstack/react-table'

//Material-UI Imports
import {
	Button,
	Tooltip,
	IconButton,
} from '@mui/material'

import { Download as DownloadIcon, DownloadForOffline as DownloadForOfflineIcon } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete';

import { useExportToCsv } from '@comps/table2/hooks'

export type Employee = {
	firstName: string
	lastName: string
	email: string
	jobTitle: string
	salary: number
	startDate: string
	signatureCatchPhrase: string
	avatar: string
}


export type { MRT_ColumnDef, MRT_Row, MRT_TableInstance }

export interface CustomTableProps {
	columns: MRT_ColumnDef<any>[]
	rows: never[]
	renderRowActions?: ({ cell, row, table }: {
		cell: MRT_Cell<never>;
    	row: MRT_Row<never>;
    	table: MRT_TableInstance<never>
	}) => ReactNode
	renderCustomToolbar?: ReactNode
	deleteSelectRows?: (rows: MRT_Row<never>[]) => void
}

const EXPORT_ALL_SELECT_ROWS_TO_CSV = '导出选中行'
const EXPORT_ALL_ROWS_TO_CSV = '导出所有行'
const DELETE_SELECT_ROWS = '删除选择行'

const CustomTable = ({columns, rows, renderRowActions, deleteSelectRows = () => {}, renderCustomToolbar}: CustomTableProps) => {
	const { exportRows, exportData } = useMemo(() => useExportToCsv(columns), [columns])

	const virtualizerInstanceRef = useRef<Virtualizer>(null)

	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [sorting, setSorting] = useState<SortingState>([])

	useEffect(() => {
		if (typeof window !== 'undefined') {
		  setData(rows);
		  setIsLoading(false);
		}
	  }, [])

	useEffect(() => {
		if(virtualizerInstanceRef.current){
			virtualizerInstanceRef.current.scrollToIndex(0)
		}
	}, [sorting])

	

	return (
		<MaterialReactTable
			columns={columns as any}
			data={data}
			enableColumnFilterModes
			enableColumnOrdering
			enableGrouping
			enablePinning
			enableRowActions
			enableRowSelection
			enableRowVirtualization
			enableColumnResizing
			virtualizerInstanceRef={virtualizerInstanceRef}
			muiTableContainerProps={{ sx: {maxHeight: 'calc(100vh - 12rem)', height: 'calc(100vh - 12rem)'}, className: 'scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200' }}
			virtualizerProps={{ overscan: 10 }}
			initialState={{ showColumnFilters: false, }}
			localization={localization}
			positionToolbarAlertBanner="bottom"
			positionActionsColumn='last'
			onSortingChange={setSorting}
			state={{ isLoading, sorting }}
			// 操作栏
			renderRowActions={renderRowActions}
			// toolbar
			renderTopToolbarCustomActions={({ table }) => {
				return (
					<div style={{ display: 'flex', }}>
						<>
							<Tooltip title={DELETE_SELECT_ROWS}>
								<span>
									<IconButton onClick={() => deleteSelectRows(table.getSelectedRowModel().rows)}
										disabled={table.getSelectedRowModel().rows.length === 0}
										>
										<DeleteIcon />
									</IconButton>
								</span>
							</Tooltip>

							<Tooltip title={EXPORT_ALL_ROWS_TO_CSV}>
								<IconButton onClick={() => exportData(data) }>
									<DownloadIcon />
								</IconButton>
							</Tooltip>

							<Tooltip title={EXPORT_ALL_SELECT_ROWS_TO_CSV}>
								<IconButton
									onClick={() => exportRows(table.getSelectedRowModel().rows) }
								>
									<DownloadForOfflineIcon />
								</IconButton>
							</Tooltip>

							{renderCustomToolbar}
						</>
					</div>
				)
			}}
		/>
	)
}

export default CustomTable
