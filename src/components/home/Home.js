import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getAccessToken } from "../../helpers/token"
import { useStateValue } from "../context/StateProvider"
import "../css/InnerLayout.css"
import NavBar from "../navBar/NavBar"
import LeftPanel from "../panels/upload/LeftPanel"
import RightPanel from "../panels/upload/RightPanel"

function Home() {
	const [{ user }, dispatch] = useStateValue()
	const history = useHistory()
	useEffect(() => {
		if(history === undefined) return
		const checkSession = async () => {
            console.count('upload')
			const token = await getAccessToken()

			if(token == null) return history.push("/login")
		}

		checkSession()
	}, [])

	return (
		<div className="inner-layout">
			<NavBar className="navbar" />
			<LeftPanel className="left-panel" />
			<RightPanel className="right-panel" />
		</div>
	)
}

export default Home
