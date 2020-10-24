const URL_BASE = {
	AUTH:"/auth",
	USER: "/user",
	IMAGE: "/image",
}

const ROUTES_IMAGE = {
	UPLOAD: "/upload",
    INFO: "/info",
    FINDING:"/findings"
}

const ROUTES_USER = {
	LOGIN: "/login",
	LOGOUT: "/logout",
	TOKEN: "/token",
	GET: "/get",
	REGISTER: "/add",
	UPDATE: "/update",
}

const ROUTE_MAP = {
	USER: {
		LOGIN: { PATH: URL_BASE.USER + ROUTES_USER.LOGIN, METHOD: "POST" },
		LOGOUT: { PATH: URL_BASE.AUTH + ROUTES_USER.LOGOUT, METHOD: "GET" },
		TOKEN: { PATH: URL_BASE.AUTH + ROUTES_USER.TOKEN, METHOD: "GET" },
		GET: { PATH: URL_BASE.USER + ROUTES_USER.GET, METHOD: "GET" },
		REGISTER: { PATH: URL_BASE.USER + ROUTES_USER.REGISTER, METHOD: "POST" },
		UPDATE: { PATH: URL_BASE.USER + ROUTES_USER.UPDATE, METHOD: "POST" },
    },
    IMAGE: {
		UPLOAD: { PATH: URL_BASE.IMAGE + ROUTES_IMAGE.UPLOAD, METHOD: "POST" },
		INFO: { PATH: URL_BASE.IMAGE + ROUTES_IMAGE.INFO, METHOD: "GET" },
		FINDING: { PATH: URL_BASE.IMAGE + ROUTES_IMAGE.FINDING, METHOD: "GET" },
	},
}

export default ROUTE_MAP
