import Upload from '@/components/Uploader'
import DialogWraper from '@comps/DialogWraper'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'

const TopologyCreate = () => {
	const [openDialog, setOpenDialog] = useState(false)

	return (
		<>
			<div className="h-12 border-b px-4 text-2xl">{`创建拓扑图`}</div>

			<div className="h-12">
				<Button onClick={() => setOpenDialog(true)}>{`新增`}</Button>
			</div>

			<DialogWraper
				title={`创建`}
				open={openDialog}
				onClose={() => setOpenDialog(false)}
			>
				<div className="p-2 flex flex-col">
					<TextField label={`标题`} size={`small`} />

					<Upload
						className="my-2"
						config={{ path: '' }}
						onComplete={() => console.log('hello')}
						tips={`点击或者上传图片/文件`}
					/>

					<TextField label={`备注`} size={`small`} multiline minRows={4} />
				</div>
			</DialogWraper>
		</>
	)
}

export default TopologyCreate
