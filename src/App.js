import React, { useEffect } from "react"
import "./App.css"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom"
import "./components/css/App.css"
import Login from "./components/login/Login"
import Home from "./components/home/Home"
import "semantic-ui-css/semantic.min.css"
import Dashboard from "./components/dashboard/Dashboard"
import Personals from "./components/personals/Personals"
import { useStateValue } from "./components/context/StateProvider"
import axiosAuth from "./config/axiosAuth"

function App() {
	const [{ user }, dispatch] = useStateValue()
	const history = useHistory()
	useEffect(() => {
		const checkSession = async () => {
			const user = JSON.parse(localStorage.getItem("user"))
			const accessToken = localStorage.getItem("access_token")
			const expiresIn = parseInt(localStorage.getItem("access_token_expired"))
			const refreshToken_expiresIn = parseInt(
				localStorage.getItem("refreshToken_expiresIn")
			)

			if (
				!user ||
				!accessToken ||
				!expiresIn ||
				!refreshToken_expiresIn ||
				refreshToken_expiresIn < Date.now()
			) {
				return localStorage.clear()
			} else if (expiresIn < Date.now()) {
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
					user: accessToken.user,
				})
			}

			dispatch({
				type: "SET_USER",
				user: user,
			})
		}

		checkSession()
	}, [])

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/Login">
						<Login />
					</Route>
					<Route path="/register">
						<Login type={"register"} />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route exact path="/upload">
						<Home />
					</Route>
					<Route exact path="/">
						<Personals />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
