const Dropdown = () => {
	return (
		<div className="relative z-9">
			<div
				className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg"
				role="menu"
			>
				<div className="flow-root py-2">
					<div className="-my-2 divide-y divide-gray-100">
						<div className="p-2">
							<strong className="block p-2 text-xs font-medium uppercase text-gray-400">
								General
							</strong>

							<a
								href="#"
								className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
								role="menuitem"
							>
								View on Storefront
							</a>

							<a
								href="#"
								className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
								role="menuitem"
							>
								View Warehouse Info
							</a>

							<a
								href="#"
								className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
								role="menuitem"
							>
								Duplicate Product
							</a>

							<a
								href="#"
								className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
								role="menuitem"
							>
								Unpublish Product
							</a>
						</div>

						<div className="p-2">
							<strong className="block p-2 text-xs font-medium uppercase text-gray-400">
								Danger Zone
							</strong>

							<form method="POST" action="#">
								<button
									type="submit"
									className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
									role="menuitem"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
									Delete Product
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dropdown
