import { DocumentInfoWithId } from '@/types/document'
import { _fetch } from '@apis/fetch'
import { notice } from '@apis/mitt'
import ArrowBack from '@comps/ArrowBack'
import { Button, Step, StepButton, Stepper } from '@mui/material'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DocumentDetail = () => {
	const [documents, setDocuments] = useState<Array<DocumentInfoWithId>>([])

	const [curVersionIndex, setCurVersionIndex] = useState(0)

	const [steps, setSteps] = useState([])

	const { id } = useParams()

	const [previewOnly, setPreviewOnly] = useState(true)

	useEffect(() => {
		const getDocument = async () => {
			const { find_document_history_by_id } = await _fetch({
				find_document_history_by_id: id,
			})

			if (find_document_history_by_id) {
				const { success, data, errmsg } = find_document_history_by_id

				return success
					? (setDocuments(data),
					  setSteps(data.map((d) => new Date(d.timestamp).toLocaleString())))
					: notice({ status: 'error', message: errmsg })
			}

			notice({ status: 'error', message: `获取数据失败, 请检查网络或服务器` })
		}

		getDocument()
	}, [])

	return (
		<div className="h-full flex flex-col">
			<div className="h-24 px-2 flex justify-between items-center border-b">
				<div className="flex items-center">
					<ArrowBack />

					<div className="text-2xl ml-2">
						{documents[curVersionIndex]?.title || ''}
					</div>
				</div>

				<div className=" w-4/5 overflow-auto h-24 flex items-center justify-center">
					<Stepper activeStep={curVersionIndex} nonLinear alternativeLabel>
						{steps.map((label, index) => (
							<Step key={index} completed={index === curVersionIndex}>
								<StepButton
									color="inherit"
									sx={{ pb: 0 }}
									onClick={() => setCurVersionIndex(index)}
								>
									{label}
								</StepButton>
							</Step>
						))}
					</Stepper>
				</div>

				{previewOnly ? (
					<Button
						variant="outlined"
						onClick={() => setPreviewOnly(false)}
					>{`编辑`}</Button>
				) : (
					<div>
						<Button
							variant="outlined"
							onClick={() => setPreviewOnly(true)}
							sx={{ mr: '8px' }}
						>{`取消`}</Button>
						<Button
							variant="contained"
							onClick={() => setPreviewOnly(false)}
						>{`保存`}</Button>
					</div>
				)}
			</div>

			<div className="h-full bg-gray-200 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
				<MdEditor
					modelValue={documents[curVersionIndex]?.content || ''}
					className="h-full-important rounded-xl"
					previewOnly={previewOnly}
				/>
			</div>
		</div>
	)
}

export default DocumentDetail
