import React, { useEffect, useState } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/LeftPanel.css"
import { createSequence } from "../../../helpers/sequence"

function LeftPanel() {
	const [
		{ currImage, needShowInfo, imageInfo, needShowFindings },
	] = useStateValue()

	const [returnBar, setReturnBar] = useState([])

	const resultBar = (findingsLength) => {
		var NUM_BAR = createSequence(findingsLength)
		setReturnBar(NUM_BAR.map((num, index) => (
			<div className="results__graph__process" key={index}>
				<div className="results__graph__process__title">
					<label >{needShowFindings[index][0].split(", ")[0]}</label>
					<label >
						{(needShowFindings[index][1] * 100).toFixed(2)}%
					</label>
				</div>
				<div className="results__graph__process__bar">
					<div
						className="results__graph__process__bar__inner"
						style={{
							width: `${needShowFindings[index][1] * 100}%`,
							backgroundColor: needShowFindings[index][2],
						}}
					></div>
				</div>
			</div>
		)))
	}

	useEffect(() => {
		console.log(needShowInfo)
	}, [needShowInfo])

	useEffect(() => {
		console.log(needShowFindings)
		if (!needShowFindings) return setReturnBar([])
		resultBar(needShowFindings?.length)
	}, [needShowFindings])

	return (
		<div className="left-panel">
			<div className="file-info">
				<h3>FILE NAME</h3>
				<h4>{currImage.name}</h4>
			</div>
			<div className="results">
				<h3>Result</h3>

				<div className="results__info">
					{needShowInfo?.map((info, index) => (
						<button className="ui teal tag label" key={index}>
							{imageInfo[info]}
						</button>
					))}
				</div>

				<div className="results__graph">
					{needShowFindings?.length !== 0 ? returnBar : <h2>Not Sure</h2>}
				</div>
			</div>
		</div>
	)
}

export default LeftPanel
