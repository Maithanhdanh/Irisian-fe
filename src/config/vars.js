import moment from "moment"
if (process.env.REACT_ENV !== "production") {
	require("dotenv").config()
}

export const COLOR_PROCESS_BAR = {
	NORMAL: "green",
	LOW: "blue",
	WARNING: "orange",
	HIGH: "red",
}

export const NAVIGATE_DOMAIN = {
	AUTHENTICATION: process.env.REACT_APP_API_URL_AUTHENTICATE,
	AUTHENTICATION_DEV: process.env.REACT_APP_API_URL_AUTHENTICATE_DEV,
	MACHINE_LEARNING: process.env.REACT_APP_API_URL_MACHINE_LEARNING,
	IRISIAN: process.env.REACT_APP_API_URL_IRISIAN,
}

export const RESULT_THRESHOLD_LEVELS = {
	FINDINGS: 0.75,
	INFO: 0.5,
	NUM_BAR: 5,
}

export const RULE_FILTER_CHANGE = {
	BRIGHTNESS: { INIT: 1, CHANGE: 0.1 },
	CONTRAST: { INIT: 1, CHANGE: 1, LOW: 1 },
	GRAYSCALE: { INIT: 0, CHANGE: 1, LOW: 0, UP: 1 },
}

export const DISEASE_LIST = [
	"Eyescan findings are unremarkable",
	"Macular irregularity, may be a sign of age-related macular degeneration",
	"Optic nerve irregularity",
	"Optic nerve irregularity, may be a sign of glaucoma",
	"Others",
	"Signs of retinal thinning",
]
export const DATE_FORMAT = "MM/DD/YYYY"
export const INITIAL_SEARCH_IMAGE = {
	page: 1,
	perPage: 10,
	disease: [],
	date: [moment().subtract(7, "days").format("l"), moment().format("l")],
}
