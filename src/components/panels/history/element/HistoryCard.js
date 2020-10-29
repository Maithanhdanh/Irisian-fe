import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { NAVIGATE_DOMAIN } from "../../../../config/vars"
import {
	addColors, needShowFinding, needShowingInfo, sortObjectByValue
} from "../../../../helpers/image"
import { createSequence } from "../../../../helpers/sequence"
import { useStateValue } from "../../../context/StateProvider"
import "../../../css/HistoryCard.css"

HistoryCard.propTypes = {
	imageId: PropTypes.string,
	result: PropTypes.object,
	date: PropTypes.string,
	setShowReviewHistory: PropTypes.func,
}

HistoryCard.defaultProps = {
	imageId: "",
	result: {},
	date: "",
	setShowReviewHistory: null,
}

function HistoryCard({ imageId, result, date, setShowReviewHistory }) {
	const [{}, dispatch] = useStateValue()
	const [info, setInfo] = useState(
		needShowingInfo(result?.info ? result.info : {})
	)

	//<!-- filter findings -->
	const [findings, setFindings] = useState(
		needShowFinding(
			addColors(sortObjectByValue(result?.findings ? result.findings : {}))
		)
	)
	const [returnItems, setReturnItems] = useState([])

	const resultBar = (findingsLength) => {
		var NUM_BAR = createSequence(findingsLength)
		setReturnItems(
			NUM_BAR.map((num, index) => (
				<div className="card__info__content__findings__detail" key={index}>
					<span>{findings[index][0].split(", ")[0]}</span>
					<a
						className="ui label"
						style={{ backgroundColor: findings[index][2] }}
					>
						{(findings[index][1] * 100).toFixed(2)}%
					</a>
				</div>
			))
		)
	}

	useEffect(() => {
		if (!findings) return setReturnItems([])
		resultBar(findings?.length)
	}, [findings])

	
	const handleSelectHistory = (imageId) => {
		setShowReviewHistory(true)
		dispatch({ type: "SET_SELECTED_HISTORY", selectedHistory: imageId })
	}

	return (
		<div className="history-card" onClick={() => handleSelectHistory(imageId)}>
			<img
				className="card__image"
				src={`${NAVIGATE_DOMAIN.MACHINE_LEARNING}/image/${imageId}`}
				alt="card__image"
			/>
			<div className="card__info">
				{result ? (
					<div className="card__info__content">
						<div className="card__info__content__info">
							{info?.map(
								(item, index) =>
									item === "eye_side" && (
										<div
											className="card__info__content__info__detail"
											key={index}
										>
											<span>EYESIDE:</span>
											<a className="ui label">{result?.info?.[item]}</a>
										</div>
									)
							)}
						</div>
						<div className="card__info__content__findings">
							{returnItems?.length !== 0 ? returnItems : <span>Not Sure</span>}
						</div>
					</div>
				) : (
					<h3>NOT PREDICTED YET</h3>
				)}
			</div>
			<div className="card__footer">Update at {date}</div>
		</div>
	)
}

export default HistoryCard
