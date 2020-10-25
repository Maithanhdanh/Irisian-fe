import React, { useEffect, useRef, useState } from "react"
import DiseaseFilterPanel from "./DiseaseFilterPanel"
import useToggle from "../custom-hook/useToggle"
import useOnClickOutside from "../custom-hook/useOutSideClick"
import PropTypes from "prop-types"

DiseasePicker.propTypes = {
	data: PropTypes.object,
	setDate: PropTypes.func,
}
DiseasePicker.defaultProps = {
	data: { date: [], disease: [] },
	setDate: null,
}

function DiseasePicker({ data, setData }) {
	const [diseaseFilter, setDiseaseFilter] = useState([])
	const [showDisease, setShowDisease] = useToggle(false)
	const ref = useRef()

	useOnClickOutside(ref, setShowDisease)

	useEffect(() => {
		setData({ ...data, disease: [...diseaseFilter] })
		if (diseaseFilter === []) {
			document
				.querySelector("button.disease-filter-popup")
				.classList.add("normal_disease")
			return
		}
		document
			.querySelector("button.disease-filter-popup")
			.classList.add("selected_disease")
	}, [diseaseFilter])

	return (
		<div>
			<button
				className="disease-filter-popup normal_disease"
				onClick={setShowDisease}
			>
				Disease
			</button>
			{showDisease && (
				<div className="" ref={ref}>
					<DiseaseFilterPanel diseaseFilter={diseaseFilter} setDiseaseFilter={setDiseaseFilter} />
				</div>
			)}
		</div>
	)
}

export default DiseasePicker
