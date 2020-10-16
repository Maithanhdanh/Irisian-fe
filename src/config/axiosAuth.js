import axios from "axios"
import queryString from "query-string"
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config()
}

const getAccessToken = () => {
	const refreshToken = localStorage.getItem("refresh_token")
	if (!refreshToken) return null
	const accessToken = localStorage.getItem("access_token")
	const expiresIn = localStorage.getItem("access_token_expired")
	if (!accessToken || !expiresIn) return null
	if (expiresIn < Date.now()) {
		try {
			const expiredToken = setTimeout(async () => {
				const getAccessToken = axiosAuth({
					method: "GET",
					url: "/auth/token",
				})
				const getAccessTokenData = await getAccessToken
				if (getAccessTokenData.error) return null
				const accessToken = getAccessTokenData.response
				localStorage.setItem("access_token", accessToken.accessToken)
				localStorage.setItem("access_token_expired", accessToken.expiresIn)

				clearTimeout(expiredToken)
				return accessToken.accessToken
			}, 2000)
		} catch (err) {
			return null
		}
	}
	return accessToken
}

const axiosAuth = axios.create({
	baseURL: process.env.REACT_APP_API_URL_AUTHENTICATE,
	headers: {
		"content-type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Credentials": true,
	},
	withCredentials: "include",
	paramsSerializer: (params) => queryString.stringify(params),
})

axiosAuth.interceptors.request.use(async (config) => {
	const token = await getAccessToken()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axiosAuth.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data
		}

		return response
	},
	(error) => {
		// Handle errors
		throw error.response.data
	}
)

export default axiosAuth
