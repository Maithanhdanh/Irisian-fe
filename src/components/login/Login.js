import React, { useEffect, useState } from "react"
import { Button, Form } from "semantic-ui-react"
import "../css/Login.css"
import PropTypes from "prop-types"
import axiosAuth from "../../config/axiosAuth"
import ROUTE_MAP from "../../config/urlBase"
import { useHistory } from "react-router-dom"
import { useStateValue } from "../context/StateProvider"
import axiosClient from "../../config/axiosClient"

Login.propTypes = {
	type: PropTypes.string,
	initialState: PropTypes.object,
}

Login.defaultProps = {
	type: "login",
	initialState: {
		email: "",
		password: "",
	},
}

function Login({ type, initialState }) {
	const history = useHistory()
	const [{}, dispatch] = useStateValue()
	const [formData, setFormData] = useState(initialState)

	const handleOnChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	useEffect(() => {
		const user = localStorage.getItem("user")
		const accessToken = localStorage.getItem("access_token")
		const expiresIn = localStorage.getItem("access_token_expired")

		if (user && accessToken && expiresIn && expiresIn >= Date.now()) {
			dispatch({
				type: "SET_USER",
				user: JSON.parse(user),
			})
			return history.push("/")
		}
	})

	const handleOnSubmit = async (e) => {
		try {
			e.preventDefault()
			const token =
				type === "register"
					? await axiosClient({
							method: ROUTE_MAP.USER.REGISTER.METHOD,
							url: ROUTE_MAP.USER.REGISTER.PATH,
							data: formData,
					  })
					: await axiosClient({
							method: ROUTE_MAP.USER.LOGIN.METHOD,
							url: ROUTE_MAP.USER.LOGIN.PATH,
							data: formData,
					  })

			const tokenData = await token
			if (tokenData.error) return alert("failed to login")
			dispatch({
				type: "SET_USER",
				user: tokenData.response.user,
			})

			history.push("/")
			return
		} catch (e) {
			alert(e)
		}
	}

	return (
		<div className="login">
			<h1>Login</h1>
			<Form className="login__form">
				<Form.Field>
					<label>Email</label>
					<input name="email" type="email" onChange={handleOnChange} />
				</Form.Field>
				<Form.Field>
					<label>Password</label>
					<input name="password" type="password" onChange={handleOnChange} />
				</Form.Field>
				{type === "register" && (
					<Form.Field>
						<label>Name</label>
						<input name="name" onChange={handleOnChange} />
					</Form.Field>
				)}
				<Button type="submit" onClick={handleOnSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default Login
