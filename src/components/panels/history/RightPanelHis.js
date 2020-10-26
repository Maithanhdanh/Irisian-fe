import React, { useEffect, useState } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/RightPanelHis.css"
import HistoryCard from "./element/HistoryCard"

import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import DatePicker from "./element/DatePicker"
import DiseasePicker from "./element/DiseasePicker"
import { searchImage } from "../../../helpers/image"
import { DATE_FORMAT } from "../../../config/vars"
import moment from "moment"
import PropTypes from "prop-types"

RightPanelHis.propTypes = {
	settShowReviewHistory: PropTypes.func
}
RightPanelHis.defaultProps = {
	settShowReviewHistory:null
}

const initialState = {
	date: [
		moment().subtract(7, "day").format(DATE_FORMAT),
		moment().format(DATE_FORMAT),
	],
	disease: [],
	page: 1,
	perPage: 10,
}
function RightPanelHis({settShowReviewHistory}) {
	const [{ user, userHistory }, dispatch] = useStateValue()
	const [formData, setFormData] = useState(initialState)

	useEffect(() => {
		console.log(formData)
	}, [formData])

	useEffect(() => {
		try {
			const getHistory = async () => {
				const res = await searchImage()
				dispatch({ type: "SET_USER_HISTORY", userHistory: res })
			}

			getHistory()
		} catch (err) {
			alert(`failed to user history deal to ${err}`)
		}
	}, [])

	useEffect(() => {
		console.log(userHistory)
	}, [userHistory])

	const handleSearch = async () => {
		const res = await searchImage(formData)
		dispatch({ type: "SET_USER_HISTORY", userHistory: res })
	}
	const handleClearFilter = async () => {
		const res = await searchImage()
		dispatch({ type: "SET_USER_HISTORY", userHistory: res })
	}

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
					<button onClick={handleSearch}>Find</button>
					<button onClick={handleClearFilter}>Clear</button>
				</div>
			</div>
			<div className="history">
				{userHistory.map((image) => (
					<HistoryCard
						imageId={image.imageId}
						result={image.result}
						date={image.date}
						key={image.imageId}
						settShowReviewHistory={settShowReviewHistory}
					/>
				))}
			</div>
		</div>
	)
}

export default RightPanelHis
