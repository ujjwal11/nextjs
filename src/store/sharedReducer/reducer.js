import actionTypes from "../shared/constant"

export const rootState = {
  
  error: false,
  data : {}

}

function reducer(state = rootState, action) {
    switch (action.type) {
        case actionTypes.FAILURE_SIGNIN_SIGNUP:
            return {
                ...state,
                ...{ error: action.error },
            }

        case actionTypes.LOAD_SUCCESS_SIGNIN_SIGNUP:
            if(action.data && action.data.login){
                return{
                    ...state,
                data: action.data.login.customer
                }
            }else if(action.data && action.data.signup){
                return {
                    ...state,
                    data: action.data.signup.customer
                }
            }

        case actionTypes.FAILURE_USERDATA:
            return {
                ...state,
                ...{ error: action.error },
            }

        case actionTypes.LOAD_SUCCESS_USERDATA:
            return {
                ...state,
                data: action.data
            }

        case actionTypes.UPDATE_SUCCESS_USERDATA:
            return {
                ...state,
                data : action.data
            }


        default:
            return state
    }
}

export default reducer