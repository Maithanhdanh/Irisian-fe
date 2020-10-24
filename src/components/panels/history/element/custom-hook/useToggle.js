import { useCallback, useState } from "react"

const useToggle = (initialState) => {
	const [isToggled, setIsToggled] = useState(initialState)

	// put [setIsToggled] into the useCallback's dependencies array
	// this value never changes so the callback is not going to be ever re-created
	const toggle = useCallback(() => setIsToggled((state) => !state), [
		setIsToggled,
	])

	return [isToggled, toggle]
}

export default useToggle