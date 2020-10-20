import React from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./components/css/App.css"
import Login from "./components/login/Login"
import Home from "./components/home/Home"
import "semantic-ui-css/semantic.min.css"
import Dashboard from "./components/dashboard/Dashboard"

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/Login">
						<Login/>
					</Route>
					<Route path="/register">
						<Login type={'register'}/>
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
