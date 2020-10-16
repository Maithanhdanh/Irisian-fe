import axiosML from "../config/axiosML"
import ROUTE_MAP from "../config/urlBase"

const UploadImage = async (file) => {
	try {
		var formData = new FormData()
		formData.append("file", file)

		const response = await axiosML({
			method: ROUTE_MAP.IMAGE.UPLOAD.METHOD,
			url: ROUTE_MAP.IMAGE.UPLOAD.PATH,
			data: formData,
			headers: { "Content-Type": "multipart/form-data" },
		})

		return response
	} catch (e) {
		alert(`[UPLOAD IMAGE] ${e}`)
	}
}

const getImageInfo = async (imageId) => {
	try {
		const response = await axiosML({
			method: ROUTE_MAP.IMAGE.INFO.METHOD,
			url: ROUTE_MAP.IMAGE.INFO.PATH + `/${imageId}`,
		})

		return response
	} catch (e) {
		alert(`[PREDICT IMAGE] ${e}`)
	}
}

const getImageFindings = async (imageId) => {
	try {
		const response = await axiosML({
			method: ROUTE_MAP.IMAGE.FINDING.METHOD,
			url: ROUTE_MAP.IMAGE.FINDING.PATH + `/${imageId}`,
		})

		return response
	} catch (e) {
		alert(`[FINDING IMAGE] ${e}`)
	}
}

const handlePredictImage = async (file, dispatch) => {
	const responseImage = await UploadImage(file)
	dispatch({
		type: "SET_UPLOADED_IMAGE",
		uploadedImage: responseImage,
	})
	console.log(responseImage)
	const imageId = responseImage.image.replace("/image/", "")

	const imageInfo = await getImageInfo(imageId)
	dispatch({
		type: "SET_INFO_IMAGE",
		imageInfo: imageInfo,
	})
	console.log(imageInfo)

	if (imageInfo.class !== "fundus") return null

	const imageFindings = await getImageFindings(imageId)
	dispatch({
		type: "SET_FINDING_IMAGE",
		imageFindings: imageFindings,
	})
	console.log(imageFindings)
}

export default handlePredictImage
