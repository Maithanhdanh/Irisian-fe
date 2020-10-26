import React, { useEffect, useState } from "react"
import { useStateValue } from "../../context/StateProvider"
import "../../css/LeftPanel.css"
import { createSequence } from "../../../helpers/sequence"
import PropTypes from "prop-types"
import { preProcessImageFindings } from "../../../helpers/image"

LeftPanel.propTypes = {
	type: PropTypes.string
}

LeftPanel.defaultProps = {
	type:null
}

function LeftPanel({type}) {
	const [
		{ currImage, needShowInfo, imageInfo, needShowFindings, selectedHistory},
	] = useStateValue()
	if(!type){
	}

	const [returnBar, setReturnBar] = useState([])

	const resultBar = (findingsLength, findings = needShowFindings) => {
		console.log(findingsLength, findings)
		var NUM_BAR = createSequence(findingsLength)
		setReturnBar(NUM_BAR.map((num, index) => (
			<div className="results__graph__process" key={index}>
				<div className="results__graph__process__title">
					<label >{findings[index][0].split(", ")[0]}</label>
					<label >
						{(findings[index][1] * 100).toFixed(2)}%
					</label>
				</div>
				<div className="results__graph__process__bar">
					<div
						className="results__graph__process__bar__inner"
						style={{
							width: `${findings[index][1] * 100}%`,
							backgroundColor: findings[index][2],
						}}
					></div>
				</div>
			</div>
		)))
	}

	useEffect(() => {
		console.log('left patient: ',type)
		if(type !== 'review'){
			if (!needShowFindings) return setReturnBar([])
			resultBar(needShowFindings?.length)
		} else {
			if (!selectedHistory) return null
			const reviewImage = preProcessImageFindings(selectedHistory.result.findings)
			resultBar(reviewImage.length, reviewImage)
		}
	}, [needShowFindings,type])

	useEffect(() => {
		console.log(returnBar)
	},[returnBar])

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
