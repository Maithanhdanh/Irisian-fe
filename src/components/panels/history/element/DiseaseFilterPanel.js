import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { DISEASE_LIST } from "../../../../config/vars"
import "../../../css/DiseaseFilterPanel.css"

DiseaseFilterPanel.propTypes = {
	setDiseaseFilter: PropTypes.func,
	diseaseFilter: PropTypes.array
}

DiseaseFilterPanel.defaultProps = {
	setDiseaseFilter: null,
	diseaseFilter:[]
}

function DiseaseFilterPanel({ diseaseFilter, setDiseaseFilter }) {
	const [listFilter, setListFilter] = useState(DISEASE_LIST)
	const [filterApply, setFilterApply] = useState(diseaseFilter)

	const handleToggleFilter = async (e) => {
		if (filterApply.indexOf(e.target.name) !== -1) {
			await setFilterApply([
				...filterApply.filter((item) => item !== e.target.name),
			])
			return
		}
		await setFilterApply([...new Set([...filterApply, e.target.name])])
	}

	useEffect(() => {
		setDiseaseFilter([...filterApply])
	}, [filterApply, setDiseaseFilter])
	return (
		<div className="disease-filter">
			{listFilter.map((finding, index) => (
				<div className="ui toggle checkbox" key={index}>
					<input type="checkbox" name={finding} onChange={handleToggleFilter} checked={filterApply.includes(finding)?true:false}/>
					<label>{finding}</label>
				</div>
			))}
		</div>
	)
}

export default DiseaseFilterPanel
