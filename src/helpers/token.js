import axiosToken from "../config/axiosToken"
import ROUTE_MAP from "../config/urlBase"

export const getAccessTokenForAxios = async () => {
	const accessToken = localStorage.getItem("access_token")
	const expiresIn = localStorage.getItem("access_token_expired")

	// valid token
	if (accessToken && expiresIn && expiresIn - 30000 >= Date.now()) {
		return accessToken
	}

	// not logged in
	if (!accessToken || !expiresIn) return null

	// logged in but expired Token
	try {
		const getToken = axiosToken({
			method: ROUTE_MAP.USER.TOKEN.METHOD,
			url: ROUTE_MAP.USER.TOKEN.PATH,
		})
		const getTokenData = await getToken
		if (getTokenData.error) return null

		const accessToken = getTokenData.response
		storeToken(accessToken)
		return accessToken.accessToken
	} catch (e) {
		alert(e)
		return null
	}
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
	console.log("check current token expiresIn")
	if (expiresIn - 30000 < Date.now()) {
		try {
			console.log("call new token")
			const getToken = axiosToken({
				method: ROUTE_MAP.USER.TOKEN.METHOD,
				url: ROUTE_MAP.USER.TOKEN.PATH,
			})
			const getTokenData = await getToken
			if (getTokenData.error) return null
			const accessToken = getTokenData.response

			storeToken(accessToken)

			return accessToken.user
		} catch (e) {
			alert(e)
			return null
		}
	}
	return user
}

export const storeToken = (response) => {
	if (!response.response) return null
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

export const storeUser = (response) => {
	if (!response.response) return null
	response.response.user &&
		localStorage.setItem("user", JSON.stringify(response.response.user))
}
