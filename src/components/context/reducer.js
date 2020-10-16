export const initialState = {
	user: {},
	imageList: [],
	currImage: {
		name: "",
		path: "",
		file: null,
	},
	uploadedImage: {
		image: "",
		no_background: "",
	},
	imageInfo: {},
	imageFindings: {},
}

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			}

		case "SET_CURRENT_IMAGE":
			return {
				...state,
				currImage: action.currImage,
			}

		case "SET_UPLOADED_IMAGE":
			return {
				...state,
				uploadedImage: action.uploadedImage,
			}

		case "SET_INFO_IMAGE":
			return {
				...state,
				imageInfo: action.imageInfo,
			}

		case "SET_FINDING_IMAGE":
			return {
				...state,
				imageFindings: action.imageFindings,
			}

		case "SET_PREDICTED_RESULT":
			return {
				...state,
				predictedResult: action.predictedResult,
			}

		case "REMOVE_CURRENT_IMAGE":
			return {
				...state,
				currImage: {
					name: "",
					path: "",
					file: null,
				},
			}
		case "SET_IMAGE_LIST":
			return {
				...state,
				imageList: action.imageList,
			}

		default:
			return state
	}
}

export default reducer
