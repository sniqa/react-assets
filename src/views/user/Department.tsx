import { AddCircleOutlineIcon, AddIcon, DeleteIcon } from '@/assets/Icons'
import Table from '@comps/table2/Table'
import { useChildToParent } from '@hooks/common'
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material'

import DialogWraper from '@comps/DialogWraper'
import { memo, useEffect, useMemo, useState } from 'react'
import { ChaseLoading } from '@comps/Loading'
import { nanoid } from 'nanoid'

import { handleAddDepartment, handlerUpdateDepartment } from '@hooks/department'

import { DepartmentInfo, DepartmentInfoWithId } from '@/types/department'

import { _fetch } from '@apis/fetch'
import { confirmbar, notice } from '@apis/mitt'

const columns = [
  {
    accessorKey: 'department_name',
    // enableClickToCopy: true,
    header: '部门',
    size: 160,
  },
  {
    accessorKey: 'locations',
    // enableClickToCopy: true,
    header: '物理位置',
    size: 160,
  },
  {
    accessorKey: 'remark',
    // enableClickToCopy: true,
    header: '备注',
    size: 150,
  },
]

const Department = () => {
  const [departmentInfo, setDepartmentInfo] = useState<DepartmentInfoWithId[]>(
    []
  )

  const department = useMemo(
    () =>
      departmentInfo.map((d) => ({ ...d, locations: d.locations.join(' / ') })),
    [departmentInfo]
  )

  const [currentRow, setCurrentRow] = useState<DepartmentInfoWithId | null>(
    null
  )

  const [tableLoading, setTableLoading] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const [childHook, parentHook] = useChildToParent()

  // 新增
  const handleAddClick = async () => {
    const res = parentHook()

    setTableLoading(true)

    const result = await handleAddDepartment(res)

    setTableLoading(false)

    setOpenDialog(false)

    setDepartmentInfo(result)
  }

  // 删除
  const handleDeleteClick = async (department: DepartmentInfoWithId) => {
    const res = await confirmbar({
      title: '提示',
      message: '确定删除选中的项目？其他依赖此项的数据将会清空此项数据',
    })

    if (!res) {
      return
    }

    setTableLoading(true)

    const [{ delete_department }, { find_departments }] = await _fetch([
      {
        delete_department: department,
      },
      {
        find_departments: {},
      },
    ])

    setTableLoading(false)

    delete_department.success && setDepartmentInfo(find_departments.data)
  }

  // 更新
  const handleEditClick = async () => {
    const department = parentHook()

    setTableLoading(true)

    const res = await handlerUpdateDepartment(department)

    setTableLoading(false)

    if (res) {
      setOpenDialog(false)

      setDepartmentInfo(res)
    }
  }

  //删除所选
  const handleDeleteSelection = async (ids: string[]) => {
    setTableLoading(true)

    const [{ delete_many_departments_by_id }, { find_departments }] =
      await _fetch([
        {
          delete_many_departments_by_id: [ids],
        },
        { find_departments: {} },
      ])

    setTableLoading(false)

    delete_many_departments_by_id.success
      ? (setDepartmentInfo(find_departments.data),
        notice({
          status: 'success',
          message: `成功删除${delete_many_departments_by_id.data}个用户`,
        }))
      : notice({
          status: 'error',
          message: `删除失败`,
        })
  }

  // 获取数据
  useEffect(() => {
    const getDepartment = async () => {
      setTableLoading(true)

      const { find_departments } = await _fetch({ find_departments: {} })

      setTableLoading(false)

      find_departments.success && setDepartmentInfo(find_departments.data)
    }

    getDepartment()
  }, [])

  //   加载过程
  if (tableLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ChaseLoading />
      </div>
    )
  }

  return (
    <>
      <div className="h-12 px-4 text-2xl">{`部门`}</div>

      <Table
        columns={columns as any}
        rows={department}
        enableRowActions
        isLoading={tableLoading}
        deleteSelectRows={(rows) =>
          handleDeleteSelection(rows.map((row) => row.original._id))
        }
        renderCustomToolbar={
          <Tooltip title={'新增'}>
            <IconButton
              onClick={() => (setOpenDialog(true), setCurrentRow(null))}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        }
        renderRowActions={({ cell, row, table }) => (
          <Box sx={{ width: '8rem' }}>
            <Button
              size="small"
              onClick={() => (setOpenDialog(true), setCurrentRow(row.original))}
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
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={currentRow ? '更新部门' : '新建部门'}
        onOk={currentRow ? handleEditClick : handleAddClick}
      >
        <DepartmentDetail getValue={childHook} originDate={currentRow} />
      </DialogWraper>
    </>
  )
}

export default Department

interface DepartmentDetailProps {
  getValue: (data: () => DepartmentInfo) => void
  originDate?: any
}

const DepartmentDetail = memo(
  ({
    getValue = () => {},
    originDate = {
      department_name: '',
      locations: '',
      _id: '',
      remark: '',
    },
  }: DepartmentDetailProps) => {
    const [departmentInfo, setDepartmentInfo] = useState(
      originDate
        ? {
            ...originDate,
            locations: originDate.locations.split(' / '),
          }
        : {}
    )

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
          onChange={(val: any) => {
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
)

interface DynamicInputProps {
  label: string
  onChange?: (data: string[]) => void
  value?: string[]
}

const DynamicInput = memo((props: DynamicInputProps) => {
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
})

const createUuidString = (length: number) => {
  const temp: string[] = []
  for (let i = 0; i < length; i++) {
    temp.push(nanoid())
  }

  return temp
}
