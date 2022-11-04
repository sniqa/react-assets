import { LeftArrowIcon, RightArrowIcon } from '@assets/Icons'

const TablePagenetion = () => {
	return (
		<div className="h-12 w-full box-border flex justify-between items-center px-4">
			<section>
				<p>
					<span className="text-blue-500 pr-2">3</span>
					<span className="pr-2">of</span>
					<span className="text-blue-500 pr-2">12</span>
					<span>selectd</span>
				</p>
			</section>

			<section className="flex items-center">
				<div className="pr-4">
					<span className="text-sm">每页</span>
					<select className="p-1 rounded border mx-1 outline-none text-sm">
						<option className="p-2">10</option>
						<option className="p-2">25</option>
						<option className="p-2">50</option>
						<option className="p-2">100</option>
					</select>
					<span className="text-sm">项</span>
				</div>

				<div className="inline-flex items-center justify-center gap-3 text-xs">
					<LeftArrowIcon />

					<p className="text-xs">
						<span>3</span>
						<span className="mx-0.25">/</span>
						<span>12</span>
					</p>

					<RightArrowIcon />
				</div>
			</section>
		</div>
	)
}

export default TablePagenetion
