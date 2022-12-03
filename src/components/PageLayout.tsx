import Confirmbar from '@comps/Confirmbar'
import Noticebar from '@comps/Noticebar'
import { ReactNode } from 'react'

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

			<main className="inline-block w-full h-screen box-border overflow-auto px-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
				<div className="h-full w-full box-border p-2">{children}</div>
			</main>

			{rightAside && <aside className={`inline-block box-border`}></aside>}
		</div>
	)
}

export default PageLayout
