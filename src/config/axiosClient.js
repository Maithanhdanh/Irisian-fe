import axios from "axios"
import queryString from "query-string"
import { getAccessTokenForAxios, storeToken } from "../helpers/token"
import ROUTE_MAP from "./urlBase"
import {NAVIGATE_DOMAIN} from "./vars"

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
	const token = await getAccessTokenForAxios()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			console.log(ROUTE_MAP.USER.TOKEN.PATH)
			if(response.config.url === ROUTE_MAP.USER.LOGIN.PATH || response.config.url === ROUTE_MAP.USER.TOKEN.PATH){
				console.log('set token')
				storeToken(response.data)
			}
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
