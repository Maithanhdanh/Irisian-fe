import { useCallback, useState } from "react"

const useToggle = (initialState) => {
	const [isToggled, setIsToggled] = useState(initialState)

	const toggle = useCallback(() => setIsToggled((state) => !state), [
		setIsToggled,
	])

	return [isToggled, toggle]
}

export default useToggle