import axios from "axios"
import queryString from "query-string"
import { NAVIGATE_DOMAIN } from "./vars"
import { getAccessTokenForAxios, storeToken } from "../helpers/token"

const axiosAuth = axios.create({
	baseURL: NAVIGATE_DOMAIN.AUTHENTICATION,
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
	console.count('axiosAuth')
	const token = await getAccessTokenForAxios()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axiosAuth.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			storeToken(response.data)
			if(!response.data?.uid && response.data?._id){
				response.data.uid = response.data._id
				delete response.data._id
			}
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
