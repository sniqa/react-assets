import { Stack, Card, CardHeader } from '@mui/material'
import TopologyCard from '@views/profile/TopologyCard2'

const Topology = () => {
  return (
    <Stack flexWrap={`wrap`} className={``} direction="row">
      <TopologyCard />
      <TopologyCard />
      <TopologyCard />
      <TopologyCard />
    </Stack>
  )
}

export default Topology
