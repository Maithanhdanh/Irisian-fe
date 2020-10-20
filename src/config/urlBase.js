const URL_BASE ={
    USER: '/auth',
}

const ROUTES_USER = {
    LOGIN: '/login',
    LOGOUT: '/logout',
    TOKEN: '/token',
    IS_LOGIN: '',
    REGISTER: '/register',
}

const ROUTE_MAP = {
    USER:{
        LOGIN: URL_BASE.USER + ROUTES_USER.LOGIN,
        LOGOUT: URL_BASE.USER + ROUTES_USER.LOGOUT,
        TOKEN: URL_BASE.USER + ROUTES_USER.TOKEN,
        IS_LOGIN: URL_BASE.USER + ROUTES_USER.IS_LOGIN,
        REGISTER: URL_BASE.USER + ROUTES_USER.REGISTER,
    },
}

export default ROUTE_MAP