import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStateValue } from "../../../context/StateProvider"
import handlePredictImage from "../../../../helpers/predictImage"
import { NAVIGATE_DOMAIN } from "../../../../config/vars"

UploadedImage.propTypes = {
	file: PropTypes.object,
}
UploadedImage.defaultProps = {
	file: {},
}

function UploadedImage() {
	const [{ uploadedImage }, dispatch] = useStateValue()
	const [brightness, setBrightness] = useState(0)
	const [contrast, setContrast] = useState(0)
	const [grayscale, setGrayscale] = useState(0)
	const [saturate, setSaturate] = useState(0)
	const [invert, setInvert] = useState(0)

	const clearFilter = () => {
		setBrightness(0)
		setContrast(0)
		setGrayscale(0)
		setSaturate(0)
		setInvert(0)
	}

	useEffect(() => {
		console.log(uploadedImage)
	},[uploadedImage])

	const handleClear = () => {
		dispatch({ type: "REMOVE_CURRENT_IMAGE" })
	}
	const handlePrediction = async () => {
		handlePredictImage(uploadedImage.imageId, dispatch)
	}
	
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
							onClick={() => setBrightness(brightness + 1)}
						></i>
						{brightness}
						<i
							className="minus circle icon"
							onClick={() => setBrightness(brightness - 1)}
						></i>
					</div>
				</div>
				<div className="process__buttons__group">
					<span>Contrast</span>
					<div className="process__buttons__group__control">
						<i
							className="plus circle icon"
							onClick={() => setContrast(contrast + 1)}
						></i>
						{contrast}
						<i
							className="minus circle icon"
							onClick={() => setContrast(contrast - 1)}
						></i>
					</div>
				</div>
				<div className="process__buttons__group">
					<span>Grayscale</span>
					<div className="process__buttons__group__control">
						<i
							className="plus circle icon"
							onClick={() => setGrayscale(grayscale + 1)}
						></i>
						{grayscale}
						<i
							className="minus circle icon"
							onClick={() => setGrayscale(grayscale - 1)}
						></i>
					</div>
				</div>
				<div className="process__buttons__group">
					<span>Saturate</span>
					<div className="process__buttons__group__control">
						<i
							className="plus circle icon"
							onClick={() => setSaturate(saturate + 1)}
						></i>
						{saturate}
						<i
							className="minus circle icon"
							onClick={() => setSaturate(saturate - 1)}
						></i>
					</div>
				</div>
				<div className="process__buttons__group">
					<span>Invert</span>
					<div className="process__buttons__group__control">
						<i
							className="plus circle icon"
							onClick={() => setInvert(invert + 1)}
						></i>
						{invert}
						<i
							className="minus circle icon"
							onClick={() => setInvert(invert - 1)}
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
					<img src={`${NAVIGATE_DOMAIN.MACHINE_LEARNING}/image/${uploadedImage.noBackgroundImageId}`} alt="preview" />
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
