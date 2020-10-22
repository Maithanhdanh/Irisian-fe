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
	needShowInfo: null,
	imageFindings: {},
	needShowFindings: null,
	detailUserInfo: {},
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
				needShowInfo: action.needShowInfo,
			}

		case "SET_FINDING_IMAGE":
			return {
				...state,
				imageFindings: action.imageFindings,
				needShowFindings: action.needShowFindings,
			}

		case "SET_PREDICTED_RESULT":
			return {
				...state,
				predictedResult: action.predictedResult,
			}

		case "SET_IMAGE_LIST":
			return {
				...state,
				imageList: action.imageList,
			}

		case "REMOVE_CURRENT_IMAGE":
			return {
				...state,
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
				needShowInfo: null,
				imageFindings: {},
				needShowFindings: null,
			}

		case "LOGOUT":
			return {
				...initialState,
			}
			
		default:
			return state
	}
}

export default reducer
