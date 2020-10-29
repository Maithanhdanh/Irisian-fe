import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getAccessToken } from "../../helpers/token"
import { useStateValue } from "../context/StateProvider"
import "../css/InnerLayout.css"
import NavBar from "../navBar/NavBar"
import LeftPanelHis from "../panels/history/LeftPanelHis"
import RightPanelHis from "../panels/history/RightPanelHis"
import ReviewHistory from "../reviewHistory/ReviewHistory"

function Personals() {
	const [{}, dispatch] = useStateValue()
	const [showReviewHistory, setShowReviewHistory] = useState(false)
	const history = useHistory()

	useEffect(() => {
		//<!-- Check login session - direct to login page -->
		try {
			const checkSession = async () => {
				const token = await getAccessToken()
				if (token == null) return history.push("/login")
				dispatch({ type: "SET_USER", user: token })
				return null
			}

			checkSession()
		} catch (e) {
			alert(e.message)
			return null
		}
	}, [])

	

	return (
		<div className="inner-layout">
			<NavBar className="navbar" />
			<LeftPanelHis className="left-panel-his" />
			<RightPanelHis
				className="right-panel-his"
				setShowReviewHistory={setShowReviewHistory}
			/>
			{showReviewHistory && <ReviewHistory setShowReviewHistory={setShowReviewHistory}/>}
		</div>
	)
}

export default Personals
