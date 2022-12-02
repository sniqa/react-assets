import { DocumentHistoryInfo } from '@/types/document'
import { _fetch } from '@apis/fetch'
import { noticebar } from '@apis/mitt'
import { upload } from '@apis/upload'
import ArrowBack from '@comps/ArrowBack'
import { Button } from '@mui/material'
import { Path } from '@path'
import { useAppSelector } from '@store/index'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HamsterLoading } from '@comps/Loading'

const DocumentModify = () => {
  const history = useAppSelector((state) => state.documentHistory)

  const { id } = useParams()

  const navigate = useNavigate()

  const [text, setText] = useState(history.content)

  const [loading, setLoading] = useState(false)

  const handleSaveClick = async () => {
    const { _id, ...hitoryWhoutId } = history

    const query: DocumentHistoryInfo = { ...hitoryWhoutId, content: text }

    setLoading(true)

    const { create_document_history } = await _fetch({
      create_document_history: query,
    })

    setLoading(false)

    if (create_document_history) {
      const { success, data, errmsg } = create_document_history

      return success
        ? (noticebar({
            status: 'success',
            message: `更新文档成功`,
          }),
          navigate(`${Path.Document}/${history.document_id}`))
        : noticebar({
            status: 'error',
            message: errmsg,
          })
    }

    noticebar({
      status: 'error',
      message: `更新文档失败`,
    })
  }

  //   加载过程
  if (loading) {
    return <HamsterLoading />
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 px-2 flex justify-between items-center border-b">
        <div className="flex items-center">
          <ArrowBack />
        </div>

        <div className="">
          <Link to={``}>
            <Button
              variant="outlined"
              sx={{ mr: '0.5rem' }}
              onClick={() => navigate(-1)}
            >{`取消`}</Button>
          </Link>

          <Link to={``}>
            <Button
              variant="contained"
              onClick={handleSaveClick}
            >{`保存`}</Button>
          </Link>
        </div>
      </div>

      <div className="h-full p-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <MdEditor
          modelValue={text || ''}
          className="h-full-important"
          onChange={(modelValue) => setText(modelValue)}
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
      </div>
    </div>
  )
}

export default DocumentModify
