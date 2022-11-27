import { Link, useLocation } from 'react-router-dom'

export interface RouteMenuProps {
	title: string
	to?: string
	icon?: JSX.Element
	subRouteMenus?: RouteMenuProps[]
}

const RouteMenu = ({ title, icon, to = '', subRouteMenus }: RouteMenuProps) => {
	const location = useLocation().pathname

	return subRouteMenus ? (
		<details
			className="group"
			open={subRouteMenus?.some((subRouteMenu) =>
				location.includes(subRouteMenu?.to || '')
			)}
		>
			<summary className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
				{icon}
				<span className="ml-3 text-sm font-medium">{title}</span>

				<span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
					<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</span>
			</summary>

			<nav className="mt-1.5 ml-8 flex flex-col">
				{subRouteMenus.map((subRouteMenu) => {
					const isSelect = location.includes(subRouteMenu.to || '')

					// setOpen(isSelect)

					return (
						<Link
							key={subRouteMenu.to}
							to={subRouteMenu.to || ''}
							className={`flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
								isSelect ? 'bg-gray-100' : ''
							}`}
						>
							{subRouteMenu.icon}

							<span className="ml-3 text-sm font-medium">
								{subRouteMenu.title}
							</span>
						</Link>
					)
				})}
			</nav>
		</details>
	) : (
		<Link
			to={to}
			className={`flex items-center rounded-lg px-4 py-2 text-gray-700  hover:bg-gray-100 hover:text-gray-700 ${
				location === to ? 'bg-gray-100' : ''
			}`}
		>
			{icon}

			<span className="ml-3 text-sm font-medium">{title}</span>
		</Link>
	)
}

export default RouteMenu
