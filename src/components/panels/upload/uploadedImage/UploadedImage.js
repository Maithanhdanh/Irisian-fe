import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { NAVIGATE_DOMAIN, RULE_FILTER_CHANGE } from "../../../../config/vars"
import handlePredictImage from "../../../../helpers/image"
import { useStateValue } from "../../../context/StateProvider"

UploadedImage.propTypes = {
	type: PropTypes.string,
}
UploadedImage.defaultProps = {
	type: null,
}

function UploadedImage({type}) {
	const [{ uploadedImage, selectedHistory }, dispatch] = useStateValue()
	const [showImage, setShowimage] = useState(type==='review'? selectedHistory:uploadedImage)
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
		if (RULE_FILTER_CHANGE[type]?.LOW == null && RULE_FILTER_CHANGE[type]?.UP == null)
			return roundNum(change)
			
		if (RULE_FILTER_CHANGE[type]?.LOW != null && change < RULE_FILTER_CHANGE[type]?.LOW)
			return RULE_FILTER_CHANGE[type].LOW
			
		if (RULE_FILTER_CHANGE[type]?.UP != null&& change > RULE_FILTER_CHANGE[type]?.UP)
			return RULE_FILTER_CHANGE[type].UP

		return roundNum(change)
	}
	const roundNum = (num) => Math.round(num * 10) / 10

	// useEffect(() => {
	// 	console.log(showImage)
	// }, [showImage])

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
			<div className="thumb" key={showImage.noBackgroundImageId}>
				<div className="thumbInner">
					<img
						src={`${NAVIGATE_DOMAIN.MACHINE_LEARNING}/image/${showImage?.noBackgroundImageId}`}
						alt="preview"
						style={imgStyle}
					/>
				</div>
			</div>
			<div className="nav__buttons">
				{!type && (
					<>
					<button className="ui negative button" onClick={handleClear}>
						Discard
					</button>
					<button className="ui primary button" onClick={handlePrediction}>
						Submit
					</button>
					</>
				)}
			</div>
		</div>
	)
}

export default UploadedImage
