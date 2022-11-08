import Card from '@comps/Card'

interface NavigateCardProps {
  title?: string
  desciption?: string
  createTimestamp?: number
  lastModifyTimestamp?: number
  to?: string
}

const NavigateCard = ({
  title,
  desciption,
  createTimestamp,
  lastModifyTimestamp,
  to,
}: NavigateCardProps) => {
  return (
    <Card to={to}>
      <div className="text-dark py-2 ">
        <div className="border-b">
          <span>{`hello`}</span>
        </div>

        <div className="h-18 line-clamp-3 py-1 px-2 ">
          <span>{`  与ThinkCentre M4350q一样，硬件配置同样是ThinkCentre硬件配置同样是ThinkCentre M4硬件配置同样是ThinkCentre M4 M4500q的最大亮点，因为在1升的机箱内，联想为ThinkCentre M4500q搭载了性能强劲的桌面级处理器，这就使其在性能表现上有所保证。`}</span>
        </div>

        <div className="border-t text-xs flex justify-between">
          <span>创建时间</span>
          <span>最后修改时间</span>
        </div>
      </div>
    </Card>
  )
}

export default NavigateCard
