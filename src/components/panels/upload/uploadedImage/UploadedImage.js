import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStateValue } from "../../../context/StateProvider"
import handlePredictImage from "../../../../helpers/predictImage"
import { NAVIGATE_DOMAIN } from "../../../../config/vars"
import { RULE_FILTER_CHANGE } from "../../../../config/vars"

UploadedImage.propTypes = {
	file: PropTypes.object,
}
UploadedImage.defaultProps = {
	file: {},
}

function UploadedImage() {
	const [{ uploadedImage }, dispatch] = useStateValue()
	const [brightness, setBrightness] = useState(
		RULE_FILTER_CHANGE.BRIGHTNESS.INIT
	)
	const [contrast, setContrast] = useState(RULE_FILTER_CHANGE.CONTRAST.INIT)
	const [grayscale, setGrayscale] = useState(RULE_FILTER_CHANGE.GRAYSCALE.INIT)
	const [imgStyle, setImageStyle] = useState({})

	const clearFilter = () => {
		setBrightness(RULE_FILTER_CHANGE.BRIGHTNESS.INIT)
		setContrast(RULE_FILTER_CHANGE.CONTRAST.INIT)
		setGrayscale(RULE_FILTER_CHANGE.GRAYSCALE.INIT)
	}
	const checkChange = (type, change) => {
		console.log(RULE_FILTER_CHANGE[type]?.LOW, RULE_FILTER_CHANGE[type]?.UP)
		if (RULE_FILTER_CHANGE[type]?.LOW == null && RULE_FILTER_CHANGE[type]?.UP == null)
			return roundNum(change)

			console.log(change, RULE_FILTER_CHANGE[type]?.LOW, change < RULE_FILTER_CHANGE[type]?.LOW)
		if (RULE_FILTER_CHANGE[type]?.LOW != null && change < RULE_FILTER_CHANGE[type]?.LOW)
			return RULE_FILTER_CHANGE[type].LOW
			console.log(change, RULE_FILTER_CHANGE[type]?.UP, change > RULE_FILTER_CHANGE[type]?.UP)
		if (RULE_FILTER_CHANGE[type]?.UP != null&& change > RULE_FILTER_CHANGE[type]?.UP)
			return RULE_FILTER_CHANGE[type].UP

		return roundNum(change)
	}
	const roundNum = (num) => Math.round(num * 10) / 10

	useEffect(() => {
		console.log(imgStyle)
	}, [imgStyle])

	const handleClear = () => {
		dispatch({ type: "REMOVE_CURRENT_IMAGE" })
	}
	const handlePrediction = async () => {
		handlePredictImage(uploadedImage.imageId, dispatch)
	}

	useEffect(() => {
		setImageStyle({
			filter: ` contrast(${contrast}) brightness(${brightness}) grayscale(${grayscale})`,
		})
	}, [brightness, contrast, grayscale])

	return (
		<div className="thumbsContainer">
			<div className="process__buttons">
				<div className="process__buttons__group" onClick={clearFilter}>
					<div className="process__buttons__group__control">
						<i className="trash alternate icon"></i>
					</div>
				</div>
				<div className="process__buttons__group">
					<span>Brightness</span>
					<div className="process__buttons__group__control">
						<i
							className="plus circle icon"
							onClick={() =>
								setBrightness(
									checkChange('BRIGHTNESS',brightness + RULE_FILTER_CHANGE.BRIGHTNESS.CHANGE)
								)
							}
						></i>
						{brightness}
						<i
							className="minus circle icon"
							onClick={() =>
								setBrightness(
									checkChange('BRIGHTNESS',brightness - RULE_FILTER_CHANGE.BRIGHTNESS.CHANGE)
								)
							}
						></i>
					</div>
				</div>
				<div className="process__buttons__group">
					<span>Contrast</span>
					<div className="process__buttons__group__control">
						<i
							className="plus circle icon"
							onClick={() =>
								setContrast(
									checkChange('CONTRAST',contrast + RULE_FILTER_CHANGE.CONTRAST.CHANGE)
								)
							}
						></i>
						{contrast}
						<i
							className="minus circle icon"
							onClick={() =>
								setContrast(
									checkChange('CONTRAST',contrast - RULE_FILTER_CHANGE.CONTRAST.CHANGE)
								)
							}
						></i>
					</div>
				</div>
				<div className="process__buttons__group">
					<span>Red free</span>
					<div className="process__buttons__group__control">
						<i
							className="plus circle icon"
							onClick={() =>
								setGrayscale(
									checkChange('GRAYSCALE',grayscale + RULE_FILTER_CHANGE.GRAYSCALE.CHANGE)
								)
							}
						></i>
						{grayscale}
						<i
							className="minus circle icon"
							onClick={() =>
								setGrayscale(
									checkChange('GRAYSCALE',grayscale - RULE_FILTER_CHANGE.GRAYSCALE.CHANGE)
								)
							}
						></i>
					</div>
				</div>
				<div className="process__buttons__group" onClick={clearFilter}>
					<div className="process__buttons__group__control">
						<i className="trash alternate icon"></i>
					</div>
				</div>
			</div>
			<div className="thumb" key={uploadedImage.noBackgroundImageId}>
				<div className="thumbInner">
					<img
						src={`${NAVIGATE_DOMAIN.MACHINE_LEARNING}/image/${uploadedImage.noBackgroundImageId}`}
						alt="preview"
						style={imgStyle}
					/>
				</div>
			</div>
			<div className="nav__buttons">
				<button className="ui negative button" onClick={handleClear}>
					Discard
				</button>
				<button className="ui primary button" onClick={handlePrediction}>
					Submit
				</button>
			</div>
		</div>
	)
}

export default UploadedImage
