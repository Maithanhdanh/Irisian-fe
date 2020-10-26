import React from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/RightPanel.css"
import DropZone from "./dropzone/DropZone"
import UploadedImage from "./uploadedImage/UploadedImage"

function RightPanel() {
	// const [file, setFile] = useState([])
	const [{ uploadedImage }] = useStateValue()

	return (
		<div className="right-panel">
			{uploadedImage.no_background === "" ? (
				<DropZone />
			) : (
				<UploadedImage />
			)}
		</div>
	)
}

export default RightPanel
