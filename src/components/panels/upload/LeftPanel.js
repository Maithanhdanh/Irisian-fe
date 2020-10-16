import React, { useEffect } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/LeftPanel.css"

function LeftPanel() {
	const [{ currImage,predictedResult }, dispatch] = useStateValue()

	useEffect(() => {
		console.log(predictedResult)
	},[predictedResult])
	return (
		<div className="left-panel">
			<div className="file-info">
				<h3>FILE NAME</h3>
				<h4>{currImage.name}</h4>
			</div>
			<div className="results">
				<h3>Result</h3>
				<div className="results__info"></div>
			</div>
		</div>
	)
}

export default LeftPanel
