export const initialState = {
    user:{},
    imageList: [],
    currImage:{
        name:'blablabla.png',
        path:'',
    },
    predictedResult:{
    }
}

const reducer = (state,action) => {

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            }
        case 'SET_CURRENT_IMAGE':
            return {
                ...state,
                currImage: action.currImage,
            }
        case 'SET_IMAGE_LIST':
            return {
                ...state,
                imageList: action.imageList,
            }

        default: 
            return state;
    }
}

export default reducer;