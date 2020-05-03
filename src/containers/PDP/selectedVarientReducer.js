import  actionTypes from './constant'

export const selectedVariant = { }

function reducer(state = selectedVariant, action){
    switch(action.type){
        case actionTypes.SUCCESS_SELECTED_VARIANT_DATA:
            return {
                ...state,
                ...action.data
            }

        default : 
         return state
    }
}

export default reducer
