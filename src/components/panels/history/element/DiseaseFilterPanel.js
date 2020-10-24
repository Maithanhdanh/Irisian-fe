import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStateValue } from "../../../context/StateProvider"
import "../../../css/DiseaseFilterPanel.css"

DiseaseFilterPanel.propTypes = {
	setDiseaseFilter: PropTypes.func,
}

DiseaseFilterPanel.defaultProps = {
	setDiseaseFilter: null,
}

function DiseaseFilterPanel({ setDiseaseFilter }) {
	const [{ listFilterFindings }, dispatch] = useStateValue()
	const [listFilter, setListFilter] = useState([...listFilterFindings])
	const [filterApply, setFilterApply] = useState([])

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
					<input type="checkbox" name={finding} onClick={handleToggleFilter} />
					<label>{finding}</label>
				</div>
			))}
		</div>
	)
}

export default DiseaseFilterPanel
