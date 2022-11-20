import { upload } from '@apis/upload'
import LoadingButton from '@mui/lab/LoadingButton'
import { Button, Dialog, Link, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadDetailProps {
	open: boolean
	onClose: () => void
	templateDownloadPath: string
	templateName?: string
	title: string
	uploadPath: string
	className?: string
	onUploadStart?: () => void
	onUploadComplete?: (react: any) => void
	onComplete?: (result: any) => void
}

const UploadDetail = ({
	open,
	onClose,
	title,
	templateDownloadPath,
	templateName,
	uploadPath,
	className,
	onComplete,
}: UploadDetailProps) => {
	const [loading, setLoading] = useState(false)

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		setLoading(true)

		const res = await upload(
			{ path: uploadPath },
			{
				file: acceptedFiles,
			}
		)

		setLoading(false)

		if (res) {
			onComplete && onComplete(res)
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	return (
		<Dialog open={open} onClose={onClose}>
			<Typography className="p-4 text-blue-400" sx={{ fontSize: '1.8rem' }}>
				{title}
			</Typography>

			<div className="flex flex-col p-4">
				<Link
					className="pb-4"
					href={templateDownloadPath}
					download={
						templateName ? templateName : templateDownloadPath.split('/')[1]
					}
				>{`下载模板`}</Link>

				<div
					{...getRootProps()}
					className={`border w-96 h-36 inline-flex rounded-lg items-center justify-center cursor-pointer ${className}`.trim()}
				>
					<input {...getInputProps()} />
					<LoadingButton loading={loading}>{`点击或拖动上传`}</LoadingButton>
				</div>
			</div>

			<Button
				size="large"
				onClick={onClose}
				className={`mb-2`}
			>{`取消`}</Button>
		</Dialog>
	)
}

export default UploadDetail
