import { AddCircleOutlineIcon, AddIcon, DeleteIcon } from '@/assets/Icons'
import Table from '@comps/table2/Table'
import { useChildToParent } from '@hooks/common'
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@store/index'

import DialogWraper from '@comps/DialogWraper'
import { useEffect, useState } from 'react'

import { nanoid } from 'nanoid'

import {
	handleAddDepartment,
	handleDeleteDepartment,
	handlerUpdateDepartment,
} from '@hooks/department'

import { DepartmentInfo, DepartmentInfoWithId } from '@/types/department'
import {
	addDepartment,
	deleteOneDepartment,
	updateDepartment,
} from '@store/department'

const columns = [
	{
		accessorKey: 'department_name',
		enableClickToCopy: true,
		header: '部门',
		size: 160,
	},
	{
		accessorKey: 'locations',
		enableClickToCopy: true,
		header: '物理位置',
		size: 160,
	},
	{
		accessorKey: 'remark',
		enableClickToCopy: true,
		header: '备注',
		size: 150,
	},
]

const Department = () => {
	const departmentRows = useAppSelector((state) =>
		state.department.map((d) => ({ ...d, locations: d.locations.join(' / ') }))
	)

	const [currentRow, setCurrentRow] = useState({})

	const [openAddDialog, setOpenAddDialog] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)

	const [addDepartmentChlid, addDepartmentParent] = useChildToParent()

	const [updateDepartmentChlid, updateDepartmentParent] = useChildToParent()

	const dispatch = useAppDispatch()

	// 新增
	const handleAddClick = async () => {
		const res = addDepartmentParent()

		const result = await handleAddDepartment(res)

		if (result) {
			setOpenAddDialog(false)

			const { department } = result

			dispatch(addDepartment({ ...res, ...department }))
		}
	}

	// 删除
	const handleDeleteClick = async (department: DepartmentInfoWithId) => {
		const res = await handleDeleteDepartment(department)

		if (res) {
			dispatch(deleteOneDepartment(department._id))
		}
	}

	// 更新
	const handleUpdateClick = async () => {
		const department = updateDepartmentParent()

		const res = await handlerUpdateDepartment(department)

		if (res) {
			setOpenEditDialog(false)

			dispatch(updateDepartment(department))
		}
	}

	return (
		<>
			<Table
				columns={columns}
				rows={departmentRows}
				enableRowActions
				initialState={{
					columnVisibility: {
						_id: false,
					},
				}}
				renderCustomToolbar={
					<Tooltip title={'新增'}>
						<IconButton onClick={() => setOpenAddDialog(true)}>
							<AddIcon />
						</IconButton>
					</Tooltip>
				}
				renderRowActions={({ cell, row, table }) => (
					<Box sx={{ width: '8rem' }}>
						<Button
							size="small"
							onClick={() => (
								setOpenEditDialog(true), setCurrentRow(row.original)
							)}
						>{`编辑`}</Button>
						<Button
							className="inline-block"
							size="small"
							onClick={() => handleDeleteClick(row.original)}
						>{`删除`}</Button>
					</Box>
				)}
			/>

			<DialogWraper
				open={openAddDialog}
				onClose={() => setOpenAddDialog(false)}
				title={'新增部门'}
				onOk={handleAddClick}
			>
				<DepartmentDetail getValue={addDepartmentChlid} />
			</DialogWraper>

			<DialogWraper
				open={openEditDialog}
				onClose={() => setOpenEditDialog(false)}
				title={'更新部门'}
				onOk={handleUpdateClick}
			>
				<DepartmentDetail
					getValue={updateDepartmentChlid}
					originDate={currentRow}
				/>
			</DialogWraper>
		</>
	)
}

export default Department

interface DepartmentDetailProps {
	getValue: (data: () => DepartmentInfo) => void
	originDate?: any
}

const DepartmentDetail = ({
	getValue = () => {},
	originDate = {
		department_name: '',
		locations: [''],
		_id: '',
		remark: '',
	},
}: DepartmentDetailProps) => {
	const [departmentInfo, setDepartmentInfo] = useState({
		...originDate,
		locations: originDate.locations.split(' / '),
	})

	console.log(originDate)

	getValue(() => departmentInfo)

	return (
		<div className="py-2">
			<TextField
				size="small"
				label={`部门名称`}
				value={departmentInfo.department_name || ''}
				onChange={(e) => {
					setDepartmentInfo({
						...departmentInfo,
						department_name: e.target.value,
					})
				}}
			/>

			<DynamicInput
				label="物理位置"
				value={departmentInfo.locations || ['']}
				onChange={(val) => {
					setDepartmentInfo({
						...departmentInfo,
						locations: val,
					})
				}}
			/>

			<TextField
				size="small"
				className="w-56"
				multiline
				minRows={3}
				label={`备注`}
				value={departmentInfo.remark || ''}
				onChange={(e) => {
					setDepartmentInfo({
						...departmentInfo,
						remark: e.target.value,
					})
				}}
			/>
		</div>
	)
}

interface DynamicInputProps {
	label: string
	onChange?: (data: string[]) => void
	value?: string[]
}

const DynamicInput = (props: DynamicInputProps) => {
	const { label, onChange = () => {}, value = [''] } = props

	const [inputVals, setInputVals] = useState<Array<string>>(value)
	const [inputKeys, setInputKeys] = useState(createUuidString(value.length))

	useEffect(() => {
		onChange(inputVals)
	}, [inputVals])

	return (
		<div className="py-2">
			{inputKeys.map((inputKey, index) => (
				<div key={inputKey} className="py-2">
					<TextField
						size="small"
						label={label + (index + 1)}
						value={inputVals[index]}
						onChange={(e) => {
							setInputVals((olds) => {
								return olds.map((old, idx) =>
									idx === index ? e.target.value : old
								)
							})
						}}
					/>

					{inputKeys.length - 1 === index ? (
						<Tooltip title="增加" placement="right">
							<IconButton
								size="small"
								onClick={() => (
									setInputKeys((old) => [...old, nanoid(6)]),
									setInputVals((old) => [...old, ''])
								)}
							>
								<AddCircleOutlineIcon color="primary" />
							</IconButton>
						</Tooltip>
					) : (
						<Tooltip title="删除" placement="right">
							<IconButton
								onClick={() => {
									setInputKeys((olds) => {
										return olds.filter((old, idx) => idx != index)
									})
									setInputVals((olds) => {
										return olds.filter((old, idx) => idx != index)
									})
								}}
								size="small"
							>
								<DeleteIcon color="primary" />
							</IconButton>
						</Tooltip>
					)}
				</div>
			))}
		</div>
	)
}

const createUuidString = (length: number) => {
	const temp: string[] = []
	for (let i = 0; i < length; i++) {
		temp.push(nanoid())
	}

	return temp
}
