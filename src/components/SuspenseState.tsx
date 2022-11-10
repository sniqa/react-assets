import { ReactNode, Suspense } from 'react'
import { CircularProgress } from '@mui/material'

interface LoadingProps {
  children: ReactNode
}

const Loading = () => {
  return (
    <div className="h-full flex-grow flex justify-center items-center">
      <CircularProgress />
    </div>
  )
}

export const SuspenseState = ({ children }: LoadingProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default SuspenseState
