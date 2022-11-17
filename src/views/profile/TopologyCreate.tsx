import { Button, TextField } from '@mui/material'
import DialogWraper from '@comps/DialogWraper'
import { useState } from 'react'
import Upload from '@comps/Upload'

const TopologyCreate = () => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <div className="h-12 border-b px-4 text-2xl">{`创建拓扑图`}</div>

      <div className="h-12">
        <Button onClick={() => setOpenDialog(true)}>{`新增`}</Button>
      </div>

      <Upload />

      <DialogWraper
        title={`创建`}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <div className="p-2">
          <TextField label={`标题`} size={`small`} />
        </div>
      </DialogWraper>
    </>
  )
}

export default TopologyCreate
