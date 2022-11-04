import { getPathMap } from '@path'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface PageLayoutProps {
	leftAside?: ReactNode
	children?: ReactNode
	rightAside?: ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
	const { leftAside, children, rightAside } = props

	const location = useLocation().pathname

	return (
		<div className="flex relative">
			<aside className={`w-1/6 inline-block box-border`}>{leftAside}</aside>

			<main className="inline-block w-full h-screen box-border overflow-auto p-4">
				<div className="h-12 text-2xl">{getPathMap(location) || 'hello'}</div>
				<div className="main-content w-full box-border">{children}</div>
			</main>

			{rightAside && <aside className={`inline-block box-border`}></aside>}
		</div>
	)
}

export default PageLayout
