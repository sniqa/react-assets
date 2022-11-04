import {
	DownloadIcon,
	PlusIcon,
	SearchIcon,
	TrashIcon,
	UploadIcon,
} from '@assets/Icons'

const TableToolbar = () => {
	return (
		<div className="h-12 px-4 box-border text-blue-600 flex items-center justify-between">
			<section className="w-24 flex justify-around">
				<TrashIcon />
				<DownloadIcon />
				<UploadIcon />
				<PlusIcon />
			</section>

			<section>
				<div className="flex items-center border px-2 py-1 rounded-md">
					<input
						type="search"
						id="UserEmail"
						placeholder=""
						className="w-full rounded-md border-gray-200 pr-10 sm:text-sm outline-none"
					/>
					<SearchIcon />
				</div>
			</section>
		</div>
	)
}

export default TableToolbar
