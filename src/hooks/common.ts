type UseChildToParent = [
	childHook: (cb: () => any) => void,

	parentHook: () => any
]

// 子组件传值给父组件
export const useChildToParent = (): UseChildToParent => {
	let callback: () => any

	const parentHook = () => callback()

	const childHook = (cb: () => any) => {
		callback = cb
	}
	return [childHook, parentHook]
}
