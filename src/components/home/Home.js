import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import axiosAuth from "../../config/axiosAuth"
import { useStateValue } from "../context/StateProvider"
import "../css/InnerLayout.css"
import NavBar from "../navBar/NavBar"
import LeftPanel from "../panels/upload/LeftPanel"
import RightPanel from "../panels/upload/RightPanel"

function Home() {
	const history = useHistory()
	const [{}, dispatch] = useStateValue()

	useEffect(() => {
		const getNewAccessToken = async () => {
			try {
                const refreshToken_expiresIn = localStorage.getItem("refreshToken_expiresIn")
                if (refreshToken_expiresIn < Date.now()) return history.push("/login")
                
                const user = localStorage.getItem("user")
                const accessToken = localStorage.getItem("access_token")
                const expiresIn = localStorage.getItem("access_token_expired")

                if(!user || !accessToken || !expiresIn || expiresIn < Date.now()){
                    const getAccessToken = axiosAuth({
                        method: "GET",
                        url: "/auth/token",
                    })
                    const getAccessTokenData = await getAccessToken
    
                    if (!getAccessToken || getAccessTokenData.error)
                        return history.push("/login")
                    const accessToken = getAccessTokenData.response
    
                    dispatch({
                        type: "SET_USER",
                        user: JSON.parse(accessToken.user),
                    })
                }
			} catch (e) {
				history.push("/login")
			}
		}

		getNewAccessToken()
	})

	return (
		<div className="inner-layout">
			<NavBar className="navbar" />
			<LeftPanel className="left-panel" />
			<RightPanel className="right-panel" />
		</div>
	)
}

export default Home
