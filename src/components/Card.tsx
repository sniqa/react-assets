import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
interface CardProps {
  children: ReactNode
  to?: string
}

const Card = ({ children, to = '' }: CardProps) => {
  const navigate = useNavigate()

  return (
    <div
      className="block p-2  sm:w-full lg:w-1/2 2xl:w-1/3 cursor-pointer"
      onClick={() => navigate(to)}
    >
      <div className="border-gray-800  rounded-xl border shadow-xl px-4">
        {children}
      </div>
    </div>
  )
}

export default Card
