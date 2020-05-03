import  actionTypes from './constant'

export const cart = {

}

function cartReducer(state = cart, action ){
    switch(action.type) {
        case actionTypes.SUCCESS_ADD_TO_CART: {
            // console.log('action.data.data<<<<',action.data.data)
            return {
                error: false,
                ...action.data.data.data
            }
        }

        case actionTypes.FALIURE_ADD_TO_CART: {
            return {
                error : true
            }
        }

        case actionTypes.EMPTY_ADD_TO_CART: {
            return{}
        }

        case actionTypes.SUCCESS_ACTIVE_CART:{
            // action.data.isAxiosError
            if(action.data.isAxiosError){
                return {
                    error : true
                }
            }else{
                return {
                    ...state,
                    error: false,
                    ...action.data
                }
            }
        }

        case actionTypes.FALIURE_ACTIVE_CART:{
            return {
                error : true
            }
        }

        case actionTypes.SUCCESS_UPDATE_CART_DATA:{
            return {
                ...state,
                error: false,
                ...action.data
            }
        }

        case actionTypes.FALIURE_UPDATE_CART_DATA:{
            return {
                error : true
            }
        }

        case actionTypes.SUCCESS_DELETE_DATA_FROM_CART : {
            return {
                ...state,
                error: false,
                ...action.data
            }
        }

        case actionTypes.FALIURE_DELETE_DATA_FROM_CART : {
            return {
                error : true
            }
        }

        default:{
            return state
        }
    }
}

export default cartReducer