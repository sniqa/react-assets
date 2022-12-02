import { noticebar } from '@/apis/mitt'
import { _fetch } from '@apis/fetch'
import { SearchIcon } from '@assets/Icons'
import { Button, IconButton, InputBase, Stack, Tooltip } from '@mui/material'
import { Path } from '@path'
import ProfileCard from '@views/profile/ProfileCard'
import { useCallback, useEffect, useState } from 'react'
import { HamsterLoading } from '@comps/Loading'
import { Link } from 'react-router-dom'
import { DocumentInfoWithId } from '@/types/document'

const Document = () => {
  const [documents, setDocuments] = useState<DocumentInfoWithId[]>([])

  const [loading, setLoading] = useState(false)

  const [searchText, setSearchText] = useState('')

  //  搜索
  const handleSearchClick = useCallback(async () => {
    setLoading(true)

    const { find_document_fuzzy } = await _fetch({
      find_document_fuzzy: searchText,
    })

    setLoading(true)

    find_document_fuzzy.success
      ? setDocuments(find_document_fuzzy.data)
      : setDocuments([])
  }, [searchText])

  //   加载数据
  useEffect(() => {
    const getDocuments = async () => {
      setLoading(true)

      const { find_document } = await _fetch({ find_document: {} })

      setLoading(false)

      if (find_document) {
        const { success, data, errmsg } = find_document

        return success
          ? setDocuments(data)
          : noticebar({
              status: 'error',
              message: errmsg,
            })
      }

      return noticebar({
        status: 'error',
        message: `获取数据失败, 请检查网络或服务器`,
      })
    }

    getDocuments()
  }, [])

  //   加载过程
  if (loading) {
    return <HamsterLoading />
  }

  return (
    <>
      <div className="flex justify-between items-center border-b h-12  px-2">
        <section>
          <Link to={Path.DocumentCreate}>
            <Button variant="contained">{`新建文档`}</Button>
          </Link>
        </section>

        <section className="border rounded px-1 flex items-center">
          <InputBase
            size={`small`}
            type={`search`}
            placeholder={`搜索`}
            className={`mt-1`}
            onChange={(e) => setSearchText(e.currentTarget.value.trim())}
          />

          <Tooltip title={`搜索`}>
            <IconButton size={`small`}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
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
