import React, { useEffect } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/LeftPanelHis.css"

function LeftPanelHis() {
	const [{ user }, dispatch] = useStateValue()
	useEffect(() => {
		console.log(user)
	}, [user])

	const { history } = user
	console.log(history)
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
				<div class="ui labeled input">
					<div class="ui label teal">Name</div>
					<input type="text" placeholder={user?.name} value={user?.name} disabled=""/>
				</div>
				<div class="ui labeled input">
					<div class="ui label teal">Email</div>
					<input type="text" placeholder={user?.email} value={user?.email} disabled=""/>
				</div>
			</div>
			<div className="button-list">
				<button class="ui labeled icon button teal">
					<i class="edit icon"></i>
					Edit
				</button>
			</div>
		</div>
	)
}

export default LeftPanelHis
