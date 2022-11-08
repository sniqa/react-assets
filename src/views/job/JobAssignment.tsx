import CustomTable from '@/components/table2/Table'
import { useState } from 'react'

const JobAssignment = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)

  return (
    <>
      <CustomTable />
    </>
  )
}

export default JobAssignment
