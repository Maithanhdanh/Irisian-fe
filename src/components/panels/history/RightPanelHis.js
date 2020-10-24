import React, { useEffect, useState } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/RightPanelHis.css"
import HistoryCard from "./element/HistoryCard"

import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import DatePicker from "./element/DatePicker"
import DiseasePicker from "./element/DiseasePicker"

const initialState = {
	date: [],
	disease: [],
}
function RightPanelHis() {
	const [{ user }, dispatch] = useStateValue()
	const [formData, setFormData] = useState(initialState)

	useEffect(() => {
		console.log(formData)
	}, [formData])

	
	return (
		<div className="right-panel-his">
			<h1>Recent</h1>
			<div className="header">
				<div className="header__title">
					<h2>Search</h2>
				</div>
				<div className="filter-bar">
					<div className="filter-bar__button">
						<DatePicker data={formData} setData={setFormData} />
					</div>
					<div className="filter-bar__button">
						<DiseasePicker data={formData} setData={setFormData} />
					</div>
					<button>Find</button>
				</div>
			</div>
			<div className="history">
				{user?.recent_activities?.map((activity, index) => (
					<HistoryCard
						imageId={activity.imageId}
						result={activity.result}
						date={activity.date}
						key={index}
					/>
				))}
			</div>
		</div>
	)
}

export default RightPanelHis
