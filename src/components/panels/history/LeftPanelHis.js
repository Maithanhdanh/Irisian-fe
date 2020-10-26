import React, { useEffect, useState } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/LeftPanelHis.css"
import axiosClient from "../../../config/axiosClient"
import ROUTE_MAP from "../../../config/urlBase"

function LeftPanelHis() {
	const [{ user }, dispatch] = useStateValue()
	const initialState = {
		name: user.name,
		email: user.email,
	}
	const [showMessage, setShowMessage] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [showError, setShowError] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)
	const [formData, setFormData] = useState(initialState)
	
	useEffect(() => {
		console.log(user)
		setFormData({ name: user.name, email: user.email })
	}, [user])

	useEffect(() => {
		setTimeout(() => {
			setShowMessage(false)
		}, 3000)
	}, [showMessage])
	useEffect(() => {
		setTimeout(() => {
			setShowSuccess(false)
		}, 3000)
	}, [showSuccess])

	const handleOnChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleOnSubmit = async () => {
		if (formData.email !== "") {
			setShowMessage(true)
		}
		const res = await axiosClient({
			method: ROUTE_MAP.USER.UPDATE.METHOD,
			url: ROUTE_MAP.USER.UPDATE.PATH,
			data: formData,
		})

		if (res.error) {
			setShowError(true)
		}
		setIsEdit(false)
		setShowSuccess(true)
	}
	return (
		<div className="left-panel-his">
			<div className="avatar">
				<img
					src={
						user?.avatar
							? require(user.avatar)
							: "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png"
					}
					alt="avatar"
				/>
			</div>
			<div className="info">
				<div className="ui labeled input">
					<div className="ui label teal">Name</div>
					{isEdit ? (
						<input
							type="text"
							placeholder={formData?.name}
							value={formData?.name}
							name="name"
							onChange={handleOnChange}
						/>
					) : (
						<span>{user?.name}</span>
					)}
				</div>
				<div className="ui labeled input">
					<div className="ui label teal">Email</div>
					{isEdit ? (
						<input
							type="text"
							placeholder={formData?.email}
							value={formData?.email}
							name="email"
							onChange={handleOnChange}
						/>
					) : (
						<span>{user?.email}</span>
					)}
				</div>
			</div>
			<div className="button-list">
				{isEdit ? (
					<button
						className="ui labeled icon button red"
						onClick={() => {
							setFormData(initialState)
							setIsEdit(false)
							setShowMessage(false)
						}}
					>
						<i className="edit icon"></i>
						clear
					</button>
				) : (
					<button
						className="ui labeled icon button teal"
						onClick={() => setIsEdit(true)}
					>
						<i className="edit icon"></i>
						Edit
					</button>
				)}
				{isEdit ? (
					<button
						className="ui labeled icon button primary"
						onClick={handleOnSubmit}
					>
						<i className="edit icon"></i>
						Confirm
					</button>
				) : null}
			</div>
			{showMessage ? (
				<div class="ui form warning">
					<div class="ui warning message">
						<div class="header">Note!</div>
						<ul class="list">
							<li>That e-mail won't change.</li>
						</ul>
					</div>
				</div>
			) : null}
			{showError ? (
				<div class="ui error message">
					<div class="header">Error</div>
					<p>Update failed</p>
				</div>
			) : null}
			{showSuccess ? (
				<div class="ui success message">
					<div class="header">Update Completed</div>
					<p>Your changes have been saved.</p>
				</div>
			) : null}

			<button className="edit-button">Edit</button>
		</div>
	)
}

export default LeftPanelHis
