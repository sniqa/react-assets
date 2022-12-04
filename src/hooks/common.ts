type UseChildToParent<T = any> = [
	childHook: (cb: () => T) => void,

	parentHook: () => T
]

// 子组件传值给父组件
export const useChildToParent = <T>(): UseChildToParent<T> => {
	let callback: () => T

	const parentHook = () => callback()

	const childHook = (cb: () => T) => {
		callback = cb
	}
	return [childHook, parentHook]
}
