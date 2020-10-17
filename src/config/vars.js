if(process.env.REACT_ENV!== 'production'){
    require("dotenv").config()
}

export const COLOR_PROCESS_BAR = {
    NORMAL: 'green',
    LOW: 'blue',
    WARNING: 'orange',
    HIGH: 'red'
}

export const NAVIGATE_DOMAIN = {
    AUTHENTICATION: process.env.REACT_APP_API_URL_AUTHENTICATE,
    MACHINE_LEARNING: process.env.REACT_APP_API_URL_MACHINE_LEARNING,
    IRISIAN:process.env.REACT_APP_API_URL_IRISIAN,
}

export const RESULT_THRESHOLD_LEVELS={
    FINDINGS:0.75,
    INFO:0.5,
    NUM_BAR:3
}