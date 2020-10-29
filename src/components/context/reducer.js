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

	userHistory: [],
	selectedHistory:null,

	nextSearchPage:1,
	totalPages:null,
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

		case "SET_USER_HISTORY":
			return {
				...state,
				userHistory: [...state.userHistory, ...action.userHistory],
			}

		case "RESET_USER_HISTORY":
			return {
				...state,
				userHistory: [],
			}

		case "SET_SELECTED_HISTORY":
			return {
				...state,
				selectedHistory: state.userHistory.find(his => his.imageId === action.selectedHistory),
			}

		case "SET_CURRENT_SEARCH_PAGE":
			return {
				...state,
				nextSearchPage: action.nextSearchPage,
			}

		case "SET_TOTAL_SEARCH_PAGE":
			return {
				...state,
				totalPages: action.totalPages,
			}

		case "RESET_SEARCH_PAGE":
			return {
				...state,
				nextSearchPage: 1,
				totalPages:null,
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
