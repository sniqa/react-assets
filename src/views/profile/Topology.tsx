import ProfileCard from '@/views/profile/ProfileCard'
import { SearchIcon } from '@assets/Icons'
import { Button, IconButton, InputBase, Stack, Tooltip } from '@mui/material'
import { Path } from '@path'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Topology = () => {
  const [searchText, setSearchText] = useState('')

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

      <Stack flexWrap={`wrap`} className={``} direction="row"></Stack>
    </>
  )
}

export default Topology
