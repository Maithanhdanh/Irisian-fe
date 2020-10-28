import queryString from "query-string"
import axiosClient from "../config/axiosClient"
import ROUTE_MAP from "../config/urlBase"
import { COLOR_PROCESS_BAR, INITIAL_SEARCH_IMAGE, RESULT_THRESHOLD_LEVELS } from "../config/vars"

export const UploadImage = async (file) => {
	try {
		var formData = new FormData()
		formData.append("file", file)

		const response = await axiosClient({
			method: ROUTE_MAP.IMAGE.UPLOAD.METHOD,
			url: ROUTE_MAP.IMAGE.UPLOAD.PATH,
			data: formData,
			headers: { "Content-Type": "multipart/form-data" },
		})

		if (response.error) return alert(`[UPLOAD IMAGE] failed`)
		return response.response.data
	} catch (e) {
		alert(`[UPLOAD IMAGE] ${e}`)
		return null
	}
}

const getImageInfo = async (imageId) => {
	try {
		const response = await axiosClient({
			method: ROUTE_MAP.IMAGE.INFO.METHOD,
			url: ROUTE_MAP.IMAGE.INFO.PATH + `/${imageId}`,
		})

		if (response.error) return alert(`[PREDICT IMAGE] failed`)
		return response.response.data
	} catch (e) {
		alert(`[PREDICT IMAGE] ${e}`)
		return null
	}
}

const getImageFindings = async (imageId) => {
	try {
		const response = await axiosClient({
			method: ROUTE_MAP.IMAGE.FINDING.METHOD,
			url: ROUTE_MAP.IMAGE.FINDING.PATH + `/${imageId}`,
		})

		if (response.error) return alert(`[FINDING IMAGE] failed`)
		return response.response.data
	} catch (e) {
		alert(`[FINDING IMAGE] ${e}`)
		return null
	}
}

export const sortObjectByValue = (object) => {
	var sorted = []
	for (var key in object) {
		sorted.push([key, object[key]])
	}
	sorted.sort((a, b) => {
		return b[1] - a[1]
	})
	return sorted
}

export const needShowFinding = (imageFindings) => {
	const needShowingFindings = imageFindings.filter(
		(findings) => findings[1] >= RESULT_THRESHOLD_LEVELS.FINDINGS
	)

	return needShowingFindings
}

export const addColors = (findings) => {
	const addedColors = []
	findings.forEach((finding, index) => {
		if (finding[0] !== "normal") {
			if (finding[1] >= 0.8) {
				finding.push(COLOR_PROCESS_BAR.HIGH)
			} else if (finding[1] >= 0.7) {
				finding.push(COLOR_PROCESS_BAR.WARNING)
			} else if (finding[1] >= 0.6) {
				finding.push(COLOR_PROCESS_BAR.LOW)
			} else {
				finding.push(COLOR_PROCESS_BAR.NORMAL)
			}
		} else {
			if (finding[1] >= 0.8) {
				finding.push(COLOR_PROCESS_BAR.NORMAL)
			} else if (finding[1] >= 0.7) {
				finding.push(COLOR_PROCESS_BAR.LOW)
			} else if (finding[1] >= 0.6) {
				finding.push(COLOR_PROCESS_BAR.WARNING)
			} else {
				finding.push(COLOR_PROCESS_BAR.HIGH)
			}
		}

		addedColors[index] = finding
	})
	return addedColors
}

export const needShowingInfo = (imageInfo) => {
	const infoType = Object.keys(imageInfo).filter(
		(info) => !info.includes("_probability")
	)

	const needShowingInfo = infoType.filter(
		(type) => imageInfo[`${type}_probability`] >= RESULT_THRESHOLD_LEVELS.INFO
	)

	return needShowingInfo
}

const handlePredictImage = async (imageId, dispatch) => {
	try{
		imageId = imageId.replace("/image/", "")
	
		const imageInfo = await getImageInfo(imageId)
		const selectedInfo = needShowingInfo(imageInfo)
		dispatch({
			type: "SET_INFO_IMAGE",
			imageInfo: imageInfo,
			needShowInfo: selectedInfo,
		})
	
		const imageFindings = await getImageFindings(imageId)
		const sortedImageFindings = sortObjectByValue(imageFindings)
		const addedColors = addColors(sortedImageFindings)
		const selectedFindings = needShowFinding(addedColors)
	
		dispatch({
			type: "SET_FINDING_IMAGE",
			imageFindings: addedColors,
			needShowFindings: selectedFindings,
		})
	} catch (e) {
		alert(e.message)
	}
}

export const preProcessImageFindings = (imageFindings) => {
	const sortedImageFindings = sortObjectByValue(imageFindings)
	const addedColors = addColors(sortedImageFindings)
	const selectedFindings = needShowFinding(addedColors)

	return selectedFindings
}

export const searchImage = async (
	data = INITIAL_SEARCH_IMAGE,
	nextSearchPage = 1
	
) => {
	try {
		const searchDate = { ...data, page: nextSearchPage }
		const query = queryString.stringify(searchDate)
		const response = await axiosClient({
			method: ROUTE_MAP.IMAGE.GETLIST.METHOD,
			url: ROUTE_MAP.IMAGE.GETLIST.PATH + `?${query}`,
		})

		if (response.error) throw new Error(response.response)
		return response.response
		
	} catch (e) {
		alert(e.message)
		return null
	}
}

export default handlePredictImage
