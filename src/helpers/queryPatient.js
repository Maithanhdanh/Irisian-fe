import axiosClient from "../components/config/axiosClient"
import URL_BASE from "../components/config/urlBase"
import queryString from "query-string"
import moment from "moment"
function queryPatient() {}

queryPatient.prototype.queryPatientList = async (
	data = {
		name: "",
		weight: "",
		phone: "",
		address: "",
		date_come: [
			moment().format('l'),
			moment().subtract(7, "days").format('l'),
		],
	}
) => {
	const paramsString = queryString.stringify(data)

	const response = axiosClient({
		method: "GET",
		url: `${URL_BASE.PATIENT.SEARCH}?${paramsString}`,
	})
	const responseData = await response
	return responseData
}

export default queryPatient
