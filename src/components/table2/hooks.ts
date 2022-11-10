import { ExportToCsv, Options } from 'export-to-csv'
import { MRT_ColumnDef, MRT_Row } from 'material-react-table'

const csvOptions: Options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
}

// 导出至csv
export const useExportToCsv = <T extends Record<string, any>>(
  columns: MRT_ColumnDef<T>[]
) => {
  const csv = new ExportToCsv({
    ...csvOptions,
    headers: columns.map((c) => c.header),
  })

  return {
    exportRows: <T extends Record<string, any>>(rows: MRT_Row<T>[]) =>
      handleExportRows(rows, csv),
    exportData: <T extends Record<string, any>>(data: MRT_Row<T>[]) =>
      handleExportData(data, csv),
  }
}

export const handleExportRows = <T extends Record<string, any>>(
  rows: MRT_Row<T>[],
  csvInstance: ExportToCsv
) => {
  console.log(rows)

  csvInstance.generateCsv(rows.map((row) => row.original))
}

export const handleExportData = <T extends Record<string, any>>(
  data: MRT_Row<T>[],
  csvInstance: ExportToCsv
) => {
  csvInstance.generateCsv(data)
}
