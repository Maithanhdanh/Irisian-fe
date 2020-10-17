import React, { useEffect, useState } from "react"
import { RESULT_THRESHOLD_LEVELS } from "../../../config/vars"
import { useStateValue } from "../../context/StateProvider"
import "../../css/LeftPanel.css"

function LeftPanel() {
	const [NUM_BAR, setNUM_BAR] = useState(RESULT_THRESHOLD_LEVELS.NUM_BAR)
	const [
		{ currImage, needShowInfo, imageInfo, needShowFindings },
	] = useStateValue()

	useEffect(() => {
		console.log(needShowFindings)
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
					{needShowFindings?.length !== 0 ? (
						needShowFindings?.map((finding, index) => (
							<div className="results__graph__process">
								<div className="results__graph__process__title">
									<label for="file">{finding[0].split(", ")[0]}</label>
									<label for="file">{(finding[1] * 100).toFixed(2)}%</label>
								</div>
								<div className="results__graph__process__bar">
									<div
										className="results__graph__process__bar__inner"
										style={{
											width: `${finding[1] * 100}%`,
											backgroundColor: finding[2],
										}}
									></div>
								</div>
							</div>
						))
					) : (
						<h2>Not Sure</h2>
					)}
				</div>
			</div>
		</div>
	)
}

export default LeftPanel
