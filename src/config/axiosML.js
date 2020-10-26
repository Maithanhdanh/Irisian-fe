import axios from "axios"
import queryString from "query-string"
import { getAccessTokenForAxios, storeToken } from "../helpers/token"
import {NAVIGATE_DOMAIN} from "./vars"


const axiosML = axios.create({
	baseURL: NAVIGATE_DOMAIN.MACHINE_LEARNING,
	headers: {
		"content-type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Credentials": true,
	},
	paramsSerializer: (params) => queryString.stringify(params),
})

axiosML.interceptors.request.use(async (config) => {
	const token = await getAccessTokenForAxios()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axiosML.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			storeToken(response.data)
			return response.data
		}

		return response
	},
	(error) => {
		// Handle errors
		throw error
	}
)

export default axiosML
