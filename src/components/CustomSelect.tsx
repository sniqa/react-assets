import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectProps,
} from '@mui/material'

export type CustomSelectProps = SelectProps & {
	// label: string
	onChange?: (val: string) => void
	// required?: boolean
	// rule?: (val: any) => boolean
	options?: any[]
	className?: string
	// defaultValue?: string
	// value?: string
	// disabled?: boolean
}

const CustomSelect = ({
	label,
	onChange = () => {},
	options = [],
	className,
	...res
}: // ...res
CustomSelectProps) => {
	return (
		<div className={className}>
			<FormControl fullWidth size={`small`}>
				<InputLabel>{label}</InputLabel>
				<Select
					label={label}
					{...res}
					onChange={(e) => onChange(String(e.target.value))}
					size="small"
				>
					{options.map((option, index) => (
						<MenuItem key={index} value={option}>
							{option || ''}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}

export default CustomSelect
