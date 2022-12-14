import { WithId } from '@/types/common'
import { noticebar } from '@apis/mitt'
import { MRT_ColumnDef } from 'material-react-table'

const BOM = '\ufeff'
const EOL = '\r\n'

type ColumnType = Record<string, any> & WithId

// 导出
export const exportCSV = <T extends ColumnType>(
  columns: MRT_ColumnDef<T>[],
  rows: any[],
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

  noticebar({
    status: 'success',
    message: '下载成功, 请稍后...',
  })
}

// 创建并下载csv文件
const createCsvFile = (data: string[], filename: string) => {
  const blob = new Blob([BOM + data.join(EOL)], {
    type: 'text/csv,charset=UTF-8',
  })

  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)

  link.download = `${filename}.csv`

  link.click()
}
