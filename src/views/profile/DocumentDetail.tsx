import { DocumentHistoryInfoWithId } from '@/types/document'
import { _fetch } from '@apis/fetch'
import { notice } from '@apis/mitt'
import ArrowBack from '@comps/ArrowBack'
import { Button, Step, StepButton, Stepper } from '@mui/material'
import { Path } from '@path'
import { setCurrentDocumentHistory } from '@store/documentHistory'
import { useAppDispatch } from '@store/index'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChaseLoading } from '@comps/Loading'

const DocumentDetail = () => {
  const { id } = useParams()

  const [title, setTitle] = useState('')

  const dispatch = useAppDispatch()

  const [documentHistorys, setDocumenthistorys] = useState<
    Array<DocumentHistoryInfoWithId>
  >([])

  const [curVersionIndex, setCurVersionIndex] = useState(0)

  const [steps, setSteps] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getDocument = async () => {
      setLoading(true)

      const { find_document_history_by_id, find_document_by_id } = await _fetch(
        {
          find_document_history_by_id: id,
          find_document_by_id: id,
        }
      )

      setLoading(false)

      if (find_document_history_by_id) {
        const { success, data, errmsg } = find_document_history_by_id

        return success
          ? (setDocumenthistorys(data),
            setTitle(find_document_by_id.data.title),
            dispatch(setCurrentDocumentHistory(data[0])),
            setSteps(
              data.map((d: DocumentHistoryInfoWithId) =>
                new Date(d.timestamp).toLocaleString()
              )
            ))
          : notice({ status: 'error', message: errmsg })
      }

      notice({ status: 'error', message: `获取数据失败, 请检查网络或服务器` })
    }

    getDocument()
  }, [])

  //   加载过程
  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ChaseLoading />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 px-2 flex justify-between items-center border-b">
        <div className="flex items-center">
          <ArrowBack />

          <div className="text-2xl ml-2">{title || ''}</div>
        </div>

        <div className=" w-4/5 overflow-auto h-24 flex items-center justify-center">
          <Stepper activeStep={curVersionIndex} nonLinear alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index} completed={index === curVersionIndex}>
                <StepButton
                  color="inherit"
                  sx={{ pb: 0 }}
                  onClick={() => {
                    setCurVersionIndex(index)
                    setCurrentDocumentHistory(documentHistorys[curVersionIndex])
                  }}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </div>

        <Link
          to={`${Path.DocumentUpdate}/${documentHistorys[curVersionIndex]?._id}`}
        >
          <Button variant="outlined">{`编辑`}</Button>
        </Link>
      </div>

      <div className="h-full p-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <MdEditor
          modelValue={documentHistorys[curVersionIndex]?.content || ''}
          className="h-full-important"
          previewOnly
        />
      </div>
    </div>
  )
}

export default DocumentDetail
