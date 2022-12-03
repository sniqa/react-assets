import Table from '@comps/table2/Table'
import { Box, Button, Typography } from '@mui/material'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { _fetch } from '@apis/fetch'
import { noticebar, confirmbar } from '@apis/mitt'
import { HamsterLoading } from '@comps/Loading'
import CustomButton from '@comps/CustomButton'
import DialogWraper from '@/components/DialogWraper'

const columns = [
  {
    accessorKey: 'current_time',
    header: '时间',
    size: 160,
  },
  {
    accessorKey: 'who',
    header: '操作人',
    size: 160,
  },
  {
    accessorKey: 'for_who',
    header: '对象',
    size: 160,
  },
  {
    accessorKey: 'event',
    // enableClickToCopy: true,
    header: '事件',
    size: 120,
  },
  {
    accessorKey: 'state',
    // enableClickToCopy: true,
    header: '结果',
    size: 120,
  },

  {
    accessorKey: 'message',
    // enableClickToCopy: true,
    header: '信息',
    size: 150,
  },
  {
    accessorKey: 'before_update',
    // enableClickToCopy: true,
    header: '更新前',
    size: 150,
  },
  {
    accessorKey: 'after_update',
    // enableClickToCopy: true,
    header: '更新后',
    size: 150,
  },
]


 const Message = () => {
  const [logs, setLogs] = useState<any[]>([])

  const logRows = useMemo(() => logs.map((d: any) => ({
    ...d,
    state: d.state ? '成功' : '失败',
  })), [logs])

  const [loading, setLoading] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const [currentRow, setCurrentRow] = useState({})

  //删除单个数据
  const handleDeleteClick = useCallback(async (id: string) => {
    const res = await confirmbar({
			title: '提示',
			message: '确定删除选中的日志？',
		})

		if (!res) {
			return
		}


    setLoading(true)

    const [{delete_log}, {find_logs }] = await _fetch([{ delete_log: id }, { find_logs: {}}])

    setLoading(false)
    

    delete_log.success ? (noticebar({status: 'success', message: '删除成功' }), setLogs(find_logs.data)) : noticebar({status: 'error', message: delete_log.errmsg })
  }, [])


  //删除多个数据
  const handleDeleteSelectionClick = useCallback(async (ids: string[]) => {
		const res = await confirmbar({
			title: '提示',
			message: '确定删除选中的日志？',
		})

		if (!res) {
			return
		}

    setLoading(true)

		const { delete_logs } = await _fetch({ delete_logs: [ids] })


    setLoading(false)


		if (delete_logs) {
			const { success, data, errmsg } = delete_logs

			return success
				? (setLogs((old) => old.filter((log) => !ids.includes(log._id))),
				  noticebar({ status: 'success', message: '删除成功' }))
				: noticebar({ status: 'error', message: errmsg })
		}

		return noticebar({
			status: 'error',
			message: '删除失败, 请重试',
		})
	}, [])


  // 获取数据
  useEffect(() => {
		const getLogs = async () => {

      setLoading(true)

			const {find_logs } = await _fetch({ find_logs: {} })

      setLoading(false)

				if (find_logs) {
					const { success, data } = find_logs


					success && setLogs(data)
				}
    }


		getLogs()
	}, [])

   //   加载过程
   if (loading) {
    return <HamsterLoading />
  }

  return (
    <>
    <div className="h-12 px-4 text-2xl">{`日志`}</div>

      <Table columns={columns as any} rows={logRows}  
        enableRowActions
        deleteSelectRows={rows => handleDeleteSelectionClick(rows.map(row => row.original._id))}
        renderRowActions={({ cell, row, table }) => (
          <>
            <CustomButton
              className="text-sm"
             onClick={() => (setOpenDialog(true), setCurrentRow(row.original))}
              
            >{`详细`}</CustomButton>
            <CustomButton
              className="text-sm"
             onClick={() => handleDeleteClick(row.original._id)}
            >{`删除`}</CustomButton>
          </>
        )}/>


      <DialogWraper
        open={openDialog}
        onClose={() => (setOpenDialog(false))}
        title={`详细信息`}
        onOk={() => (setOpenDialog(false))  }
      >

<div>
							<LogDetail
								lable="时间"
								value={Reflect.get(currentRow, 'current_time')}
							/>

							<LogDetail lable="操作人" value={Reflect.get(currentRow, 'who')} />

							<LogDetail
								lable="对象"
								value={Reflect.get(currentRow, 'for_who')}
							/>
							<LogDetail lable="事件" value={Reflect.get(currentRow, 'event')} />
							<LogDetail
								lable="结果"
								value={Reflect.get(currentRow, 'state') ? '成功' : '失败'}
							/>
							<LogDetail
								lable="信息"
								value={Reflect.get(currentRow, 'message')}
							/>

							{Reflect.get(currentRow, 'event') === '更新' && (
								<LogDetail
									lable="更新内容"
									value={
										<DisplayUpdateContent
											beforeUpdate={Reflect.get(currentRow, 'before_update')}
											afterUpdate={Reflect.get(currentRow, 'after_update')}
										/>
									}
								/>
							)}
						</div>

        
      </DialogWraper>

    </>
  )
}

export default Message




interface LogDetailProps {
	lable: string
	value: string | JSX.Element
}

const LogDetail = memo(({ lable, value }: LogDetailProps) => {
	return (
		<div className="flex">
			<span className="w-20 full-length-text  text-blue-500 py-0.5">
				{lable}:
			</span>

			<span className="py-0.5">{value}</span>
		</div>
	)
})

interface DisplayUpdateContentProps {
	beforeUpdate: string
	afterUpdate: string
}

const DisplayUpdateContent = memo(({
	beforeUpdate,
	afterUpdate,
}: DisplayUpdateContentProps) => {
	const itemsAndBeforeVal = beforeUpdate
		.split(';')
		.filter((item) => item.trim() != '')
		.map((item) => item.split('='))

	const afterVal = afterUpdate
		.split(';')
		.filter((item) => item.trim() != '')
		.map((item) => item.split('=')[1])

	return (
		<div className="w-96 flex text-0.8rem mt-1.5">
			<section className="w-1/3  border border-blue-400 py-1 flex flex-col border-r-0">
				<span className="w-full h-8 inline-flex justify-center items-center">{`项目`}</span>
				{itemsAndBeforeVal.map((item, index) => (
					<span
						key={index}
						className=" h-8 flex border-t items-center justify-center border-blue-400"
					>
						{item[0] || ''}
					</span>
				))}
			</section>

			<section className="w-1/3 py-1 border border-blue-400 flex flex-col  border-r-0">
				<span className="w-full h-8 inline-flex justify-center items-center">{`更新前`}</span>
				{itemsAndBeforeVal.map((item, index) => (
					<span
						key={index}
						className=" h-8 border-t flex items-center justify-center border-blue-400"
					>
						{item[1] || ''}
					</span>
				))}
			</section>

			<section className="w-1/3 py-1 flex flex-col border border-blue-400">
				<span className="w-full h-8 inline-flex justify-center items-center">{`更新后`}</span>
				{afterVal.map((item, index) => (
					<span
						key={index}
						className="h-8 border-t flex items-center justify-center border-blue-400"
					>
						{item || ''}
					</span>
				))}
			</section>
		</div>
	)}
)