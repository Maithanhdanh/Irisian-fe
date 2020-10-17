import React, { useEffect } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { useStateValue } from "../context/StateProvider"
import "../css/Dashboard.css"
import Can from "../roleBase/Can"

function Dashboard() {
	const history = useHistory()
	const [{ user }, dispatch] = useStateValue()

	useEffect(() => {
		const user = localStorage.getItem("user")
		const accessToken = localStorage.getItem("access_token")
		const expiresIn = localStorage.getItem("access_token_expired")

		if (!user || !accessToken || !expiresIn || expiresIn < Date.now()) {
			return history.push("/login")
		}

		dispatch({
			type: "SET_USER",
			user: JSON.parse(user),
		})
	})

	return (
		<>
			{user?.role && (
				<Can
					role={user.role}
					perform="dashboard:visit"
					yes={() => <h1>Dashboard</h1>}
					no={() => <Redirect to="/" />}
				/>
			)}
		</>
	)
}

export default Dashboard
