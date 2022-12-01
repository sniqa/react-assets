import LoadingButton from '@mui/lab/LoadingButton'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

import { ReactNode, memo } from 'react'

export interface DialogWraperProps {
  title: string
  open: boolean
  onClose: () => void
  onOk?: () => void
  children?: ReactNode
  loading?: boolean
}

const DialogWraper = (props: DialogWraperProps) => {
  const { title, open, onClose, onOk = () => {}, children, loading } = props

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent className={`w-32rem p-4 flex flex-wrap`}>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{`取消`}</Button>
        <LoadingButton
          variant="contained"
          disableElevation
          onClick={onOk}
          loading={loading}
        >{`确定`}</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default memo(DialogWraper)
