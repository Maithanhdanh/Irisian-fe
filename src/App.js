import React from "react"
import {
	BrowserRouter as Router,
	Route, Switch
} from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import "./App.css"
import "./components/css/App.css"
import Dashboard from "./components/dashboard/Dashboard"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Personals from "./components/personals/Personals"

function App() {
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
