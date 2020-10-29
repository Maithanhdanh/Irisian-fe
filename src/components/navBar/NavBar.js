import React, { useEffect } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import axiosClient from "../../config/axiosClient"
import ROUTE_MAP from "../../config/urlBase"
import { useStateValue } from "../context/StateProvider"
import "../css/NavBar.css"

function NavBar() {
	const history = useHistory()
	const location = useLocation().pathname
	const [{}, dispatch] = useStateValue()

	//<!-- add style after click icon -->
	useEffect(() => {
		if (location === "/") {
			document
				.querySelectorAll(".navbar__button__user")[0]
				.classList.add("circle-icon")
		} else {
			document
				.querySelectorAll(".navbar__button__plus")[0]
				.classList.add("circle-icon")
		}
	}, [location])
	
	const handleLogout = async () => {
		try {
			await axiosClient({
				method: ROUTE_MAP.USER.LOGOUT.METHOD,
				url: ROUTE_MAP.USER.LOGOUT.PATH,
			})
			dispatch({ type: "LOGOUT" })
			localStorage.clear()
			history.push("/login")
		} catch (e) {
			alert(e)
		}
	}
	return (
		<div className="navbar">
			<img src={require("../img/a2ds.png")} alt="" className="navbar__logo" />
			<div className="navbar__button-list">
				<Link to="/upload" className="navbar__button__link navbar__button__plus">
					<i className="big plus icon navbar__button"></i>
				</Link>
				<Link
					to="/"
					className="navbar__button__link navbar__button__user"
				>
					<i className="big user icon navbar__button"></i>
				</Link>
				<div className="navbar__button__link">
					<i
						className="big sign-out alternate icon navbar__button"
						onClick={handleLogout}
					></i>
				</div>
			</div>
		</div>
	)
}

export default NavBar
