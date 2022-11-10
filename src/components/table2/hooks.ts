import { notice } from '@apis/mitt'
import { ExportToCsv, Options } from 'export-to-csv'
import { MRT_ColumnDef, MRT_Row } from 'material-react-table'

const BOM = '\ufeff'
const EOL = '\r\n'

const csvOptions: Options = {
	fieldSeparator: ',',
	quoteStrings: '"',
	decimalSeparator: 'locale',
	showLabels: true,
	useBom: true,
	useKeysAsHeaders: false,
}

// 导出至csv
const useExportToCsv = <T extends Record<string, any>>(
	columns: MRT_ColumnDef<T>[]
) => {
	const csv = new ExportToCsv({
		...csvOptions,
		headers: columns.map((column) => column.header),
	})

	return {
		exportRows: <T extends Record<string, any>>(rows: MRT_Row<T>[]) =>
			handleExportRows(rows, csv),
		exportData: <T extends Record<string, any>>(data: MRT_Row<T>[]) =>
			handleExportData(data, csv),
	}
}

const handleExportRows = <T extends Record<string, any>>(
	rows: MRT_Row<T>[],
	csvInstance: ExportToCsv
) => {
	console.log(rows)

	csvInstance.generateCsv(
		rows.map((row) => {
			const { _id, ...res } = row.original
			return res
		})
	)
}

const handleExportData = <T extends Record<string, any>>(
	data: MRT_Row<T>[],
	csvInstance: ExportToCsv
) => {
	const result = data.map((d) => {
		const { _id, ...res } = d as any
		return res
	})
	console.log(result)

	csvInstance.generateCsv(result)
}

const link = document.createElement('a')

// 导出
export const exportCSV = (
	columns: MRT_ColumnDef<any>[],
	rows: MRT_Row<never>[],
	filename = new Date().getTime().toString()
) => {
	const data = rows.map((row) => {
		return columns.map(
			(column) => Reflect.get(row, column.accessorKey || '') || ''
		)
	})

	const formatData = [columns.map((column) => column.header).join(',')].concat(
		data.join(EOL)
	)

	createCsvFile(formatData, filename)

	notice({
		status: 'success',
		message: '下载成功, 请稍后...',
	})
}

// 创建并下载csv文件
const createCsvFile = (data: string[], filename: string) => {
	const blob = new Blob([BOM + data.join(EOL)], {
		type: 'text/csv,charset=UTF-8',
	})

	link.href = URL.createObjectURL(blob)

	link.download = `${filename}.csv`

	link.click()
}
