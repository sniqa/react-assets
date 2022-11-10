import { ReactNode } from 'react'
import Confirmbar from '@comps/Confirmbar'
import Noticebar from '@comps/Noticebar'

interface PageLayoutProps {
  leftAside?: ReactNode
  children?: ReactNode
  rightAside?: ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
  const { leftAside, children, rightAside } = props

  return (
    <div className="flex relative">
      <Noticebar />
      <Confirmbar />

      <aside className={`w-1/6 inline-block box-border`}>{leftAside}</aside>

      <main className="inline-block w-full h-screen box-border overflow-auto p-4">
        <div className="main-content w-full box-border">{children}</div>
      </main>

      {rightAside && <aside className={`inline-block box-border`}></aside>}
    </div>
  )
}

export default PageLayout
