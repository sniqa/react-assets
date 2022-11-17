import {
  Stack,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material'

import { Link } from 'react-router-dom'

interface TopologyCardProps {
  to?: string
  title?: string
  content?: string
  create_timestamp?: number
  last_modify_timestamp?: number
}

const TopologyCard = ({
  to = '',
  title = '',
  content = '',
  create_timestamp = 0,
  last_modify_timestamp = 0,
}: TopologyCardProps) => {
  const createTime = new Date(create_timestamp).toLocaleDateString()
  const lastModifyTime = new Date(last_modify_timestamp).toLocaleDateString()

  return (
    <Link to={to} className={`sm:w-full md:w-1/2 2xl:w-1/3`}>
      <Box className={`p-2`}>
        <Card>
          <CardHeader
            className="border-b"
            sx={{ height: '2.4rem' }}
            title={<Typography>{title}</Typography>}
          ></CardHeader>

          <CardContent>
            <span className="line-clamp-3 break-words">{content}</span>
          </CardContent>

          <CardActions className={`border-t`} sx={{ py: '0.2rem' }}>
            <div className="">
              <span className="text-xs">{`创建时间: ${createTime}`}</span>
              <span className="text-xs">{`最后修改时间: ${lastModifyTime}`}</span>
            </div>
          </CardActions>
        </Card>
      </Box>
    </Link>
  )
}

export default TopologyCard
