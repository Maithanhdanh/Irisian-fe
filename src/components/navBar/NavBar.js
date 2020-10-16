import React, { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import "../css/NavBar.css"
function NavBar() {
	const location = useLocation().pathname

	useEffect(() => {
		if (location === "/") {
			document.querySelectorAll(".navbar__button__plus")[0].classList.add("circle-icon")
		} else {
            document.querySelectorAll(".navbar__button__user")[0].classList.add("circle-icon")
        }
	}, [location])
	const handleLogout = () => {}
	return (
		<div className="navbar">
			<img src={require("../img/a2ds.png")} alt="" className="navbar__logo" />
			<div className="navbar__button-list">
				<Link to="/" className="navbar__button__link navbar__button__plus">
					<i className="big plus icon navbar__button"></i>
				</Link>
				<Link to="/upload" className="navbar__button__link navbar__button__user">
					<i className="big user icon navbar__button"></i>
				</Link>
				<i
					className="big sign-out alternate icon navbar__button"
					onClick={handleLogout}
				></i>
			</div>
		</div>
	)
}

export default NavBar
