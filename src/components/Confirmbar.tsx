import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useState } from 'react'
import { emitter, ConfirmbarState } from '@apis/mitt'
import { useAppDispatch, useAppSelector } from '@store/index'
import { ok, cancel } from '@store/confirm'

const Confirmbar = () => {
  const state = useAppSelector((state: { confirm: any }) => state.confirm)

  const dispatch = useAppDispatch()

  const [confirm, setConfirm] = useState<ConfirmbarState>({
    title: '',
    message: '',
    content: null,
  })

  emitter.on('confirm', (state) => {
    dispatch(ok())
    setConfirm(state)
  })

  return (
    <Dialog open={state} onClose={() => dispatch(cancel())}>
      <DialogTitle color={`primary`}>{confirm.title}</DialogTitle>

      <DialogContent>
        {confirm.message && (
          <div className="min-w-16rem">{confirm.message}</div>
        )}

        {confirm.content && confirm.content}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => (
            emitter.emit('confirmResult', false), dispatch(cancel())
          )}
        >{`取消`}</Button>
        <Button
          variant="contained"
          onClick={() => (
            emitter.emit('confirmResult', true), dispatch(cancel())
          )}
          disableElevation
        >{`确定`}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmbar
