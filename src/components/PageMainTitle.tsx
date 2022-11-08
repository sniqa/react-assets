import { getPathMap } from '@path'
import { useLocation } from 'react-router-dom'

const PageMainTitle = () => {
  const location = useLocation().pathname

  return <div className="h-12 text-2xl">{getPathMap(location) || 'hello'}</div>
}

export default PageMainTitle
