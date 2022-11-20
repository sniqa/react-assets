import { Res } from './fetch'
import { notice } from './mitt'
const BASE_URL = `http://${window.location.hostname}`

const PORT = 8083

const PATH = `/upload`

const getUrl = (lastPath: string) => `${BASE_URL}:${PORT}${lastPath}`

const uploadRequestOptions = (formdata: FormData) => ({
	method: 'POST',
	body: formdata,
})

export interface UploadConfig {
	path: string
}

interface UploadFile {
	name?: string
	file: File | File[]
	filename?: string
}

export const upload = async <T>(
	config: UploadConfig,
	targetFile: UploadFile
): Promise<Res<any>> => {
	const url = getUrl(config.path)

	const formdata = new FormData()

	const { name = '', file, filename } = targetFile

	if (Array.isArray(file)) {
		for (let i = 0; i <= file.length; i++) {
			const f = file[i]
			f && formdata.append('file', f, filename)
		}
	} else {
		formdata.append(name, file, filename)
	}

	const options = uploadRequestOptions(formdata)

	return fetch(url, options)
		.then((res) => res.ok && res.json())
		.catch((err) => {
			notice({ status: 'error', message: `网络连接失败或服务器无响应` })
			return { success: false }
		})
}
