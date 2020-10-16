import React, { useEffect, useState } from "react"
import { Button, Form } from "semantic-ui-react"
import "../css/Login.css"
import PropTypes from "prop-types"
import axiosAuth from "../../config/axiosAuth"
import ROUTE_MAP from "../../config/urlBase"
import { useHistory } from "react-router-dom"
import { useStateValue } from "../context/StateProvider"

Login.propTypes = {
	type: PropTypes.string,
	initialState: {
		email: PropTypes.string,
		password: PropTypes.string,
	},
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
	const [{},dispatch] = useStateValue()
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
				type:"SET_USER",
				user:JSON.parse(user)
			})
			return history.push("/")
		}
	},[])

	const handleOnSubmit = async (e) => {
		try {
			e.preventDefault()
			const token =
				type === "register"
					? await axiosAuth({
							method: "POST",
							url: ROUTE_MAP.USER.REGISTER,
							data: formData,
					  })
					: await axiosAuth({
							method: "POST",
							url: ROUTE_MAP.USER.LOGIN,
							data: formData,
					  })

			const tokenData = await token
			if (tokenData.error) return alert("failed to login")

			localStorage.setItem("access_token", tokenData.response.accessToken)
			localStorage.setItem("access_token_expired", tokenData.response.expiresIn)
			localStorage.setItem("user", JSON.stringify(tokenData.response.user))
			dispatch({
				type:"SET_USER",
				user:tokenData.response.user
			})

			history.push("/")
			return
		} catch (e) {
			console.log(e)
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
