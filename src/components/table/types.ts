import { ReactNode } from 'react'

export interface TableColumn {
  header: () => ReactNode
  field: string
}

export interface TableContainerProps {
  columns: TableColumn[]
  rows: []
}

export interface TableHeaderProps {
  columns: TableColumn[]
}
