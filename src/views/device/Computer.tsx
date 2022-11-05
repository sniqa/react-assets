import Table, { MRT_ColumnDef } from '@comps/table2/Table'
import {rows} from '@comps/table2/makeData'
import { IconButton, Tooltip } from '@mui/material'
import { DownloadIcon } from '@/assets/Icons'
import { useMemo } from 'react'

interface Person {
	firstName: string
	lastName: string
	email: string
}



const Computer = () => {
	const columns = useMemo(() => ([
		{
			accessorKey: 'firstName', 
				enableClickToCopy: true,
				header: 'firstName',
				size: 300,
		 },
		 {
			accessorKey: 'lastName', 
				enableClickToCopy: true,
				header: 'lastName',
				size: 300,
		 },
		 {
			accessorKey: 'email', 
				enableClickToCopy: true,
				header: 'Email',
				size: 300,
		 },
		 
	]), [])

	return <Table columns={columns} rows={rows}
		renderCustomToolbar={ <>
			<Tooltip title={'EXPORT_ALL_ROWS_TO_CSV'}>
								<IconButton>
									<DownloadIcon />
								</IconButton>
							</Tooltip>

							<Tooltip title={'EXPORT_ALL_SELECT_ROWS_TO_CSV'}>
								<IconButton
									
								>
									<DownloadIcon />
								</IconButton>
							</Tooltip>
		</>}

		renderRowActions={() => <>
			<div className="">hello</div>
			</>
		}
	 />
}

export default Computer
