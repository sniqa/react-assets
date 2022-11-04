import Dropdown from '@comps/Dropdown'
import { tableContext } from '@comps/table/TableContainer'
import { useContext } from 'react'

const TableHeader = () => {
	const { columns, rows } = useContext(tableContext)

	return (
		<div className="bg-gray-100 h-12 box-border">
			<div className="hello">
				<Dropdown />
			</div>
		</div>
	)
}

export default TableHeader
