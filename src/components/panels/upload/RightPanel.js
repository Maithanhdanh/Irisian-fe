import React from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/RightPanel.css"
import DropZone from "./dropzone/DropZone"
import UploadedImage from "./uploadedImage/UploadedImage"
import PropTypes from "prop-types"

RightPanel.propTypes = {
	type: PropTypes.string
}
RightPanel.defaultProps = {
	type:null
}

function RightPanel({type}) {
	const [{ uploadedImage }] = useStateValue()

	return (
		<div className="right-panel">
			{uploadedImage.no_background === "" && !type ?(
				<DropZone />
			) : (
				<UploadedImage type={type}/>
			)}
		</div>
	)
}

export default RightPanel
