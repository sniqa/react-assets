// 子组件传值给父组件
export const useChildToParent = () => {
  let callbak: () => any

  const parentHook = () => callbak()

  const childHook = (cb: () => any) => {
    callbak = cb
  }
  return {
    childHook,
    parentHook,
  }
}
