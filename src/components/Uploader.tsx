import { upload, UploadConfig } from '@apis/upload'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploaderProps {
	config: UploadConfig
	onComplete?: (result: any) => void
	onUploadStart?: () => void
	className?: string
	tips?: string
}

const Uploader = ({
	config,
	onComplete,
	onUploadStart,
	className = '',
	tips,
}: UploaderProps) => {
	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		onUploadStart && onUploadStart()

		// Do something with the files
		const res = await upload(config, {
			file: acceptedFiles,
		})

		if (res) {
			onComplete && onComplete(res)
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	return (
		<div
			{...getRootProps()}
			className={`border inline-flex rounded-lg items-center justify-center cursor-pointer ${className}`.trim()}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>{tips ? tips : `点击或拖动上传`}</p>
			)}
		</div>
	)
}

export default Uploader
