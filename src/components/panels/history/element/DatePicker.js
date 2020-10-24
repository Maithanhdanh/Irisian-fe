import React, { useState } from "react"
import moment from "moment"
import { DayPickerRangeController } from "react-dates"
import PropTypes from "prop-types"
import { DATE_FORMAT } from "../../../../config/vars"
DatePicker.propTypes = {
	data: PropTypes.object,
	setDate: PropTypes.func,
}
DatePicker.defaultProps = {
	data: { date: [], disease: [] },
	setDate: null,
}

function DatePicker({ data, setData }) {
	const [isShowDate, setIsShowDate] = useState(false)
	const [focusedInput, setFocusedInput] = useState("startDate")
	const [startDate, setStartDate] = useState(moment().subtract(7, "day"))
	const [endDate, setEndDate] = useState(moment())

	const handleOnChange = ({ startDate, endDate }) => {
		setStartDate(startDate)
		setEndDate(endDate)
		setData({
			...data,
			date: [
				startDate ? startDate.format(DATE_FORMAT) : "",
				endDate ? endDate.format(DATE_FORMAT) : "",
			],
		})
	}

	const handleFocusedChange = (e) => {
		setFocusedInput(e || "startDate")
	}

	return (
		<div>
			<button className="teal" onClick={() => setIsShowDate(!isShowDate)}>
				{`${startDate ? startDate.format(DATE_FORMAT) : ""} - ${
					endDate ? endDate.format(DATE_FORMAT) : ""
				}`}
			</button>
			{isShowDate ? (
				<div className="filter-bar__button__choice">
					<DayPickerRangeController
						startDate={startDate}
						endDate={endDate}
						onDatesChange={({ startDate, endDate }) =>
							handleOnChange({ startDate, endDate })
						}
						focusedInput={focusedInput}
						onFocusChange={(e) => handleFocusedChange(e)}
						onOutsideClick={() => setIsShowDate(false)}
					/>
				</div>
			) : null}
		</div>
	)
}

export default DatePicker
