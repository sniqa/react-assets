import { useChildToParent } from '@/hooks/common'
import { _fetch } from '@apis/fetch'
import { notice } from '@apis/mitt'
import { upload } from '@apis/upload'
import ArrowBack from '@comps/ArrowBack'
import DialogWraper from '@comps/DialogWraper'
import { Button, TextField } from '@mui/material'
import { Path } from '@path'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DocumentCreate = () => {
	const [text, setText] = useState('')

	const [openDialog, setOpenDialog] = useState(false)

	const [childHook, parentHook] = useChildToParent()

	const navigate = useNavigate()

	const handleSaveClick = async () => {
		const value = parentHook()

		const document = {
			...value,
			content: text,
			autor: '',
		}

		const { create_document } = await _fetch({ create_document: document })

		if (create_document.success) {
			navigate(`${Path.Document}/${create_document.data}`)

			return notice({
				status: 'success',
				message: `保存成功`,
			})
		}

		notice({
			status: 'error',
			message: `保存失败`,
		})
	}

	return (
		<div className="h-full">
			<div className="h-12 px-2 flex justify-between items-center">
				<div className="flex items-center">
					<ArrowBack />
					<div className="text-xl ml-2 ">{`创建文档`}</div>
				</div>

				<Button
					variant="outlined"
					onClick={() => setOpenDialog(true)}
				>{`保存`}</Button>
			</div>

			<MdEditor
				modelValue={text}
				onChange={(modelValue) => setText(modelValue)}
				className="h-full-important rounded-xl"
				onUploadImg={async (
					files: File[],
					callback: (urls: string[]) => void
				) => {
					const res = await upload(
						{ path: '/upload/static' },
						{
							file: files,
						}
					)

					res.data && callback(res.data)
				}}
			/>

			<DialogWraper
				title={'保存'}
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				onOk={handleSaveClick}
			>
				<DocumentDetail emitValue={childHook} />
			</DialogWraper>
		</div>
	)
}

export default DocumentCreate

interface DocumentDetailProps {
	emitValue: (cb: () => { title: string; description: string } | null) => void
}

const DocumentDetail = ({ emitValue }: DocumentDetailProps) => {
	const [descript, setDescript] = useState({
		title: '',
		description: '',
	})

	emitValue(() => descript)

	return (
		<div className="flex flex-col py-2">
			<TextField
				size="small"
				label={`标题`}
				onChange={(e) =>
					setDescript({ ...descript, title: e.currentTarget.value.trim() })
				}
				sx={{ width: '18rem', mb: '1rem' }}
			/>
			<TextField
				label={`描述`}
				multiline
				minRows={3}
				onChange={(e) =>
					setDescript({
						...descript,
						description: e.currentTarget.value.trim(),
					})
				}
			/>
		</div>
	)
}
