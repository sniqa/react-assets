import { Alert, AlertColor, Snackbar, SnackbarCloseReason } from '@mui/material'
import { useState } from 'react'
import { emitter, NoticebarStatus } from '@apis/mitt'
import { useAppDispatch, useAppSelector } from '@store/index'

const Noticebar = () => {
  const [alertMsg, setAlertMsg] = useState<NoticebarStatus>({
    status: 'success',
    message: '',
  })

  emitter.on('notice', (state) => {
    setAlertMsg(state)
  })

  return (
    <Snackbar
      open={alertMsg.message != ''}
      autoHideDuration={3000}
      onClose={() => setAlertMsg({ ...alertMsg, message: '' })}
      message={alertMsg.message}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert severity={alertMsg.status} sx={{ width: '100%' }}>
        {alertMsg.message.toString()}
      </Alert>
    </Snackbar>
  )
}

export default Noticebar
