import { ArrowBackIcon } from '@assets/Icons'
import { IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ArrowBack = () => {
	const navigate = useNavigate()

	return (
		<div>
			<Tooltip title={'返回'}>
				<IconButton onClick={() => navigate(-1)}>
					<ArrowBackIcon />
				</IconButton>
			</Tooltip>
		</div>
	)
}

export default ArrowBack
