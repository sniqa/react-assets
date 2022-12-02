import mitt, { Emitter } from 'mitt'
import { AlertColor, SnackbarCloseReason } from '@mui/material'
import { ReactNode } from 'react'
// import { NoticebarStatus } from '../components/layouts/Noticebar'

export interface NoticebarStatus {
  status: AlertColor
  message: string
  onClose?: (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => void
}

export interface ConfirmbarState {
  title: string
  message?: string
  content?: ReactNode
}

type MittEvents = {
  notice: NoticebarStatus
  confirm: ConfirmbarState
  confirmResult: boolean
}

export const emitter: Emitter<MittEvents> = mitt<MittEvents>()

export const noticebar = (state: NoticebarStatus) => {
  emitter.emit('notice', state)
}

export const confirmbar = (state: ConfirmbarState) => {
  emitter.emit('confirm', state)
  return new Promise((resolve) => {
    emitter.on('confirmResult', (res) => resolve(res))
  })
}
