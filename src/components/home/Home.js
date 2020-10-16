import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axiosAuth from '../../config/axiosAuth'
import { useStateValue } from '../context/StateProvider'
import '../css/Home.css'
import NavBar from '../navBar/NavBar'
import LeftPanel from "../panels/upload/LeftPanel"
import RightPanel from "../panels/upload/RightPanel"

function Home() {
    const history = useHistory()
    const [{user}, dispatch] = useStateValue()


    useEffect(() => {
		const getNewAccessToken = async () => {
            try{
                const user = localStorage.getItem("user")
                const accessToken = localStorage.getItem("access_token")
                const expiresIn = localStorage.getItem("access_token_expired")

                if (!user || !accessToken || !expiresIn) {
                    if(expiresIn < Date.now()) return history.push("/login")
                    const getAccessToken = axiosAuth({
                        method: "GET",
                        url: "/auth/token",
                    })
                    const getAccessTokenData = await getAccessToken

                    if (!getAccessToken ||getAccessTokenData.error) return history.push("/login")
                    const accessToken = getAccessTokenData.response
                    localStorage.setItem("access_token", accessToken.accessToken)
                    localStorage.setItem(
                        "access_token_expired",
                        accessToken.expiresIn
                    )
                    localStorage.setItem(
                        "user",
                        accessToken.user
                    )

                    dispatch({
                        type:"SET_USER",
                        user:JSON.parse(user)
                    })
                }
            } catch(e) {
                history.push("/login")
            }
        }
        
        getNewAccessToken()
    },[])

    return (
        <div className="home">
            <NavBar className="navbar"/>
            <LeftPanel className="left-panel"/>
            <RightPanel className="right-panel"/>
        </div>
    )
}

export default Home
