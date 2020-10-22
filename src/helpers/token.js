import axiosAuth from "../config/axiosAuth"
import ROUTE_MAP from "../config/urlBase"

export const getAccessTokenForAxios = () => {
	const accessToken = localStorage.getItem("access_token")
	const expiresIn = localStorage.getItem("access_token_expired")

	if (!accessToken || !expiresIn) return null
	if (expiresIn < Date.now()) {
		const expiredToken = setTimeout(async () => {
			try {
				console.count("call get token")
				const getToken = axiosAuth({
					method: ROUTE_MAP.USER.TOKEN.METHOD,
					url: ROUTE_MAP.USER.TOKEN.PATH,
				})
				const getTokenData = await getToken
				if (getTokenData.error) return null
				const accessToken = getTokenData.response

				storeToken(accessToken)
				// localStorage.setItem("access_token", accessToken.accessToken)
				// localStorage.setItem("access_token_expired", accessToken.expiresIn)

				clearTimeout(expiredToken)
				console.log(accessToken)
				return accessToken.accessToken
			} catch (e) {
				console.count("error")
				clearTimeout(expiredToken)
				console.log(e)
			}
		}, 2000)
	}
	console.count("call return token")
	return accessToken
}

export const getAccessToken = async () => {
	const user = JSON.parse(localStorage.getItem("user"))
	const accessToken = localStorage.getItem("access_token")
	const expiresIn = parseInt(localStorage.getItem("access_token_expired"))
	const refreshToken_expiresIn = parseInt(
		localStorage.getItem("refreshToken_expiresIn")
	)

	if (
		!user ||
		!accessToken ||
		!expiresIn ||
		!refreshToken_expiresIn ||
		refreshToken_expiresIn <= Date.now()
	) {
		localStorage.clear()
		return null
	}

	if (expiresIn <= Date.now()) {
		const getToken = axiosAuth({
			method: ROUTE_MAP.USER.TOKEN.METHOD,
			url: ROUTE_MAP.USER.TOKEN.PATH,
		})
		const getTokenData = await getToken
		if (getTokenData.error) return null
		const accessToken = getTokenData.response

		storeToken(accessToken)

		return accessToken.user
	}
	return user
}

export const storeToken = (response) => {
	console.log(response)
	response.accessToken &&
		localStorage.setItem("access_token", response.accessToken)
	response.expiresIn &&
		localStorage.setItem("access_token_expired", response.expiresIn)
	response.user && localStorage.setItem("user", JSON.stringify(response.user))
	response.refreshToken_expiresIn &&
		localStorage.setItem(
			"refreshToken_expiresIn",
			response.refreshToken_expiresIn
		)
}
