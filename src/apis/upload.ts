import { notice } from './mitt'

const BASE_URL = `http://${window.location.hostname}`

const PORT = 8083

const PATH = `/upload`

const getUrl = (lastPath: string) => `${BASE_URL}:${PORT}${PATH}${lastPath}`

const uploadRequestOptions = (formdata: FormData) => ({
  method: 'POST',
  body: formdata,
})

interface UploadConfig {
  path: string
}

interface UploadFile {
  name?: string
  file: File | FileList
  filename?: string
}

export const upload = async (config: UploadConfig, targetFile: UploadFile) => {
  const url = getUrl(config.path)

  const formdata = new FormData()

  const { name = '', file, filename } = targetFile

  if (file instanceof FileList) {
    for (let i = 0; i <= file.length; i++) {
      const f = file.item(i)
      f && formdata.append(name, f, filename)
    }
  } else {
    formdata.append(name, file, filename)
  }

  const options = uploadRequestOptions(formdata)

  return fetch(url, options)
    .then((res) => res.ok && res.json())
    .catch((err) =>
      notice({ status: 'error', message: `网络连接失败或服务器无响应` })
    )
}
