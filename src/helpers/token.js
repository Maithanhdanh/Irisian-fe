import axiosClient from "../config/axiosClient"
import ROUTE_MAP from "../config/urlBase"

export const getAccessTokenForAxios = () => {
	const accessToken = localStorage.getItem("access_token")
	const expiresIn = localStorage.getItem("access_token_expired")

	if (!accessToken || !expiresIn) return null
	if (expiresIn-5000 < Date.now()) {
		const expiredToken = setTimeout(async () => {
			try {
				console.count("call get token")
				const getToken = axiosClient({
					method: ROUTE_MAP.USER.TOKEN.METHOD,
					url: ROUTE_MAP.USER.TOKEN.PATH,
				})
				const getTokenData = await getToken
				if (getTokenData.error) return null
				const accessToken = getTokenData.response

				storeToken(accessToken)

				console.log(accessToken)
				return accessToken.accessToken
			} catch (e) {
				console.count("error")
				clearTimeout(expiredToken)
				console.log(e)
			}
		}, 2000)
	}
	console.count("OLD token")
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

	if (expiresIn-5000 < Date.now()) {
		const getToken = axiosClient({
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
	if(!response.response) return null
	response.response.accessToken &&
		localStorage.setItem("access_token", response.response.accessToken)
	response.response.expiresIn &&
		localStorage.setItem("access_token_expired", response.response.expiresIn)
	response.response.user &&
		localStorage.setItem("user", JSON.stringify(response.response.user))
	response.response.refreshToken_expiresIn &&
		localStorage.setItem(
			"refreshToken_expiresIn",
			response.response.refreshToken_expiresIn
		)
}
