import { ReactNode, Suspense } from 'react'

interface LoadingProps {
  children: ReactNode
}

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  )
}

export const SuspenseState = ({ children }: LoadingProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default SuspenseState
