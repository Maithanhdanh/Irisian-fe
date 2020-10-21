import React, { useEffect } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/LeftPanelHis.css"

function LeftPanelHis() {
	const [{ user }, dispatch] = useStateValue()
    useEffect(() => {
        console.log(user)
    },[user])
	return (
		<div className="left-panel">
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
                <div className="name">{user?.name}</div>
                <div className="email">{user?.email}</div>
            </div>
			<div className="button-list"></div>
		</div>
	)
}

export default LeftPanelHis
