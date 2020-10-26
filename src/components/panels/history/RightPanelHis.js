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
	setShowReviewHistory: PropTypes.func,
}
RightPanelHis.defaultProps = {
	setShowReviewHistory: null,
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
function RightPanelHis({ setShowReviewHistory }) {
	const [isScrollToQuery, setIsScrollToQuery] = useState(false)
	const [
		{ userHistory, nextSearchPage, totalPages },
		dispatch,
	] = useStateValue()
	const [formData, setFormData] = useState(initialState)

	useEffect(() => {
		console.log(formData)
	}, [formData])

	useEffect(() => {
		try {
			const getHistory = async () => {
				const res = await searchImage()
				setDataAfterSearch(res)
			}

			getHistory()
		} catch (err) {
			alert(`failed to user history deal to ${err}`)
		}
	}, [])

	useEffect(() => {
		console.log(userHistory)
	}, [userHistory])

	const setDataAfterSearch = (res) => {
		console.log(res)
		dispatch({
			type: "SET_CURRENT_SEARCH_PAGE",
			nextSearchPage: res.nextPage,
		})
		dispatch({
			type: "SET_TOTAL_SEARCH_PAGE",
			totalPages: res.totalPages,
		})
		dispatch({
			type: "SET_USER_HISTORY",
			userHistory: res.images,
		})
	}
	const handleSearch = async () => {
		dispatch({ type: "RESET_USER_HISTORY" })
		if (nextSearchPage !== 1) dispatch({ type: "RESET_SEARCH_PAGE" })
		const res = await searchImage(formData)
		setDataAfterSearch(res)
	}
	const handleClearFilter = async () => {
		dispatch({ type: "RESET_USER_HISTORY" })
		dispatch({ type: "RESET_SEARCH_PAGE" })
		const res = await searchImage()
		setDataAfterSearch(res)
		setFormData(initialState)
	}

	const handleScroll = async () => {
		var objDiv = document.querySelector(".history")
		if (
			objDiv.scrollTop + objDiv.offsetHeight >= objDiv.scrollHeight - 50 &&
			!isScrollToQuery &&
			nextSearchPage <= totalPages
		) {
			await setIsScrollToQuery(true)
			const res = await searchImage(formData, nextSearchPage)
			setDataAfterSearch(res)
			setIsScrollToQuery(false)
		}
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
			<div className="history" onScroll={handleScroll}>
				{userHistory.map((image) => (
					<HistoryCard
						imageId={image.imageId}
						result={image.result}
						date={image.date}
						key={image.imageId}
						setShowReviewHistory={setShowReviewHistory}
					/>
				))}
			</div>
		</div>
	)
}

export default RightPanelHis
