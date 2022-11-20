import { notice } from '@/apis/mitt'
import { DocumentInfoWithId } from '@/types/document'
import { _fetch } from '@apis/fetch'
import { SearchIcon } from '@assets/Icons'
import { Button, IconButton, InputBase, Stack } from '@mui/material'
import { Path } from '@path'
import ProfileCard from '@views/profile/ProfileCard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Document = () => {
	const [documents, setDocuments] = useState<Array<DocumentInfoWithId>>([])

	useEffect(() => {
		const getDocuments = async () => {
			const { find_document } = await _fetch({ find_document: {} })

			if (find_document) {
				const { success, data, errmsg } = find_document

				return success
					? setDocuments(data)
					: notice({
							status: 'error',
							message: errmsg,
					  })
			}

			return notice({
				status: 'error',
				message: `获取数据失败, 请检查网络或服务器`,
			})
		}

		getDocuments()
	}, [])

	return (
		<>
			<div className="flex justify-between items-center border-b h-12  px-2">
				<section>
					<Link to={Path.DocumentCreate}>
						<Button variant="contained">{`新建文档`}</Button>
					</Link>
				</section>

				<section className="border rounded pl-2 flex items-center">
					<InputBase size={`small`} type={`search`} placeholder={`搜索`} />
					<IconButton size={`small`}>
						<SearchIcon />
					</IconButton>
				</section>
			</div>

			<Stack flexWrap={`wrap`} className={``} direction="row">
				{documents.map((document) => (
					<ProfileCard
						key={document._id}
						to={document._id}
						title={document.title}
						description={document.description}
						create_timestamp={document.create_timestamp}
						last_modify_timestamp={document.last_modify_timestamp}
					/>
				))}
			</Stack>
		</>
	)
}

export default Document
