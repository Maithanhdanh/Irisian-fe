import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAccessToken, storeToken } from '../../helpers/token'
import { useStateValue } from '../context/StateProvider'
import '../css/InnerLayout.css'
import NavBar from '../navBar/NavBar'
import LeftPanelHis from '../panels/history/LeftPanelHis'
import RightPanelHis from '../panels/history/RightPanelHis'
import axiosClient from '../../config/axiosClient'
import ROUTE_MAP from '../../config/urlBase'

function Personals() {
    const [{ user }, dispatch] = useStateValue()
	const history = useHistory()
	useEffect(() => {
		if(history === undefined) return
		const checkSession = async () => {
            console.count('personals')
			const token = await getAccessToken()

			if(token == null) return history.push("/login")
			console.log(token)
			dispatch({ type: "SET_USER", user: token })
		}

		checkSession()
	}, [])

	useEffect(() => {
		const getUserInfo = async () => {
			if(user === {} || user._id == undefined) return
			const userInfo = await axiosClient({
				method:ROUTE_MAP.USER.GET.METHOD,
				url:ROUTE_MAP.USER.GET.PATH + `/${user._id}`,
			})

			if(userInfo.error) return alert(userInfo.message)
			console.log(userInfo)
			dispatch({type: 'SET_USER', user:userInfo.response.user})
		}
		getUserInfo()
	},[user])
    
    return (
        <div className="inner-layout">
			<NavBar className="navbar" />
			<LeftPanelHis className="left-panel-his" />
			<RightPanelHis className="right-panel-his" />
		</div>
    )
}

export default Personals
