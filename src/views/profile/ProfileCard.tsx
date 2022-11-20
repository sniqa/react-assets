import { Link } from 'react-router-dom'

interface TopologyCardProps {
	to: string
	title: string
	description: string
	create_timestamp: number
	last_modify_timestamp: number
}

const TopologyCard = ({
	to,
	title,
	description,
	create_timestamp = 0,
	last_modify_timestamp = 0,
}: TopologyCardProps) => {
	return (
		<Link to={to} className={`p-2 <sm:w-full lg:w-1/2 xl:w-1/3 `}>
			<div className="px-4 box-border border rounded-xl  shadow-lg">
				<section className={`h-12 border-b flex items-center `}>
					<span className="text-xl p-2">{title}</span>
				</section>

				<section className={`h-20 py-1 px-3 line-clamp-3 break-all`}>
					{description}
				</section>

				<section
					className={`flex justify-between h-8 border-t text-xs items-center`}
				>
					<div className="">
						{`创建时间: ${new Date(create_timestamp).toLocaleDateString()}`}
					</div>

					<div className="">
						{`最后修改时间: ${new Date(
							last_modify_timestamp
						).toLocaleDateString()}`}
					</div>
				</section>
			</div>
		</Link>
	)
}

export default TopologyCard
