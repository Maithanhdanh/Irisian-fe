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
import { getAccessToken } from "./helpers/token"

function App() {
	const [{ user }, dispatch] = useStateValue()
	const history = useHistory()
	useEffect(() => {
		if(history === undefined) return
		const checkSession = async () => {
			console.log('app nà')
			const token = await getAccessToken()

			if(token == null) return history.push("/login")
			dispatch({ type: "SET_USER", user: token.user })
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
