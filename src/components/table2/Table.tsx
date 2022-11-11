import { localization_en } from '@comps/table2/localization'
import { ReactNode, useEffect, useRef, useState } from 'react'
//MRT Imports
import MaterialReactTable, {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  MRT_TableState,
  Virtualizer,
} from 'material-react-table'

import { SortingState } from '@tanstack/react-table'

//Material-UI Imports
import { IconButton, Tooltip } from '@mui/material'

import {
  Download as DownloadIcon,
  DownloadForOffline as DownloadForOfflineIcon,
} from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'

import { exportCSV } from '@comps/table2/hooks'

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
  rows: any[]
  renderRowActions?: ({
    cell,
    row,
    table,
  }: {
    cell: MRT_Cell<never>
    row: MRT_Row<never>
    table: MRT_TableInstance<never>
  }) => ReactNode
  renderCustomToolbar?: ReactNode
  deleteSelectRows?: (rows: MRT_Row<never>[]) => void
  isLoading?: boolean
  initialState?: Partial<MRT_TableState<never>>
  rowActionsSize?: number
  enableRowActions?: boolean
  tableContainerHeight?: string
}

const EXPORT_ALL_SELECT_ROWS_TO_CSV = '导出选中行'
const EXPORT_ALL_ROWS_TO_CSV = '导出所有行'
const DELETE_SELECT_ROWS = '删除选择行'

const CustomTable = ({
  columns,
  rows,
  renderRowActions,
  deleteSelectRows = () => {},
  renderCustomToolbar,
  isLoading = false,
  initialState,
  rowActionsSize = 100,
  enableRowActions = false,
  tableContainerHeight = 'calc(100vh - 12rem)',
}: CustomTableProps) => {
  const virtualizerInstanceRef = useRef<Virtualizer>(null)

  const [data, setData] = useState(rows)

  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    setData(rows)
  }, [rows])

  useEffect(() => {
    if (virtualizerInstanceRef.current) {
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
      enableRowActions={enableRowActions}
      enableRowSelection
      enableRowVirtualization
      enableColumnResizing
      virtualizerInstanceRef={virtualizerInstanceRef}
      muiTableContainerProps={{
        sx: {
          maxHeight: tableContainerHeight,
          height: tableContainerHeight,
        },
        className:
          'scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200',
      }}
      virtualizerProps={{ overscan: 10 }}
      initialState={{ showColumnFilters: false, ...initialState }}
      localization={localization_en}
      positionToolbarAlertBanner="bottom"
      positionActionsColumn="last"
      onSortingChange={setSorting}
      state={{ isLoading, sorting }}
      // 操作栏
      renderRowActions={renderRowActions}
      displayColumnDefOptions={{
        'mrt-row-actions': {
          header: '操作', //change header text
          size: rowActionsSize, //make actions column wider
        },
      }}
      // toolbar
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <div style={{ display: 'flex' }}>
            <>
              <Tooltip title={DELETE_SELECT_ROWS}>
                <span>
                  <IconButton
                    onClick={() =>
                      deleteSelectRows(table.getSelectedRowModel().rows)
                    }
                    disabled={table.getSelectedRowModel().rows.length === 0}
                  >
                    <DeleteIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title={EXPORT_ALL_ROWS_TO_CSV}>
                <IconButton onClick={() => exportCSV(columns, data)}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={EXPORT_ALL_SELECT_ROWS_TO_CSV}>
                <IconButton
                  onClick={() =>
                    exportCSV(
                      columns,
                      table
                        .getSelectedRowModel()
                        .rows.map((row) => row.original)
                    )
                  }
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
