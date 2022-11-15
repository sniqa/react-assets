import { ReactNode } from 'react'

interface CustomButtonProps {
	className?: string
	onClick?: () => void
	children?: ReactNode
}

const CustomButton = ({ onClick, className, children }: CustomButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`relative p-1 font-medium text-blue-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100 outline-none ${className}`.trim()}
		>
			{children}
		</button>
	)
}

export default CustomButton
