export const ChaseLoading = () => (
  <div className="sk-chase text-sky-500 ">
    <div className="sk-chase-dot "></div>
    <div className="sk-chase-dot "></div>
    <div className="sk-chase-dot "></div>
    <div className="sk-chase-dot "></div>
    <div className="sk-chase-dot "></div>
    <div className="sk-chase-dot "></div>
  </div>
)

export const HamsterLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img src="/hamster.gif" alt="" width={120} height={120} />
    </div>
  )
}
