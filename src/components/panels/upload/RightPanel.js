import React, { useState } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/RightPanel.css"
import DropZone from "./dropzone/DropZone"
import UploadedImage from "./uploadedImage/UploadedImage"

function RightPanel() {
	// const [file, setFile] = useState([])
	const [{ currImage }, dispatch] = useStateValue()

	return (
		<div className="right-panel">
			{currImage.name === "" ? (
				<DropZone />
			) : (
				<UploadedImage />
			)}
		</div>
	)
}

export default RightPanel
