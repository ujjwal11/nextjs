import  actionTypes from './constant'

export const rootState = {
  
  error: false,
  megaNavData : {}

}

function reducer(state = rootState, action) {
  switch (action.type) {
    case actionTypes.FAILURE_MEGA_NAV:
      return {
        ...state,
        ...{ error: action.error },
      }

    case actionTypes.LOAD_DATA_SUCCESS_MEGA_NAV:
      return {
        ...state,
        megaNavData : action.data
      }
    
    default:
      return state
  }
}

export default reducer