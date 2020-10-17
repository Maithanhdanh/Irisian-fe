import axios from "axios"
import queryString from "query-string"
import axiosAuth from "../config/axiosAuth"
import ROUTE_MAP from "./urlBase"
import {NAVIGATE_DOMAIN} from "./vars"

const getAccessToken = () => {
	const accessToken = localStorage.getItem("access_token")
	const expiresIn = localStorage.getItem("access_token_expired")
	if (!accessToken || !expiresIn) return null
	if (expiresIn < Date.now()) {
		const expiredToken = setTimeout(async () => {
			const getAccessToken = axiosAuth({
				method: ROUTE_MAP.USER.TOKEN.METHOD,
				url: ROUTE_MAP.USER.TOKEN.PATH,
			})
			const getAccessTokenData = await getAccessToken
			if (getAccessTokenData.error) return null
			const accessToken = getAccessTokenData.response
			localStorage.setItem("access_token", accessToken.accessToken)
			localStorage.setItem("access_token_expired", accessToken.expiresIn)

			clearTimeout(expiredToken)
			return accessToken.accessToken
		}, 2000)
	}
	return accessToken
}

const axiosClient = axios.create({
	baseURL: NAVIGATE_DOMAIN.IRISIAN,
	headers: {
		"content-type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Credentials": true,
	},
	withCredentials: "include",
	paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
	const token = await getAccessToken()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data
		}

		return response
	},
	(error) => {
		// Handle errors
		throw error
	}
)

export default axiosClient
