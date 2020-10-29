import axios from "axios"
import queryString from "query-string"
import { NAVIGATE_DOMAIN } from "./vars"

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

// <!-- middleware handle response -->
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
