import  actionTypes from './constant'

export const rootState = {
  
  error: false,
  homeData : {}
}

function reducer(state = rootState, action) {
  switch (action.type) {
    case actionTypes.HOMEPAGE_DATA_FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      }

    case actionTypes.LOAD_HOMEPAGE_DATA_SUCCESS:
      return {
        ...state,
        homeData : action.data
      }
    
    default:
      return state
  }
}

export default reducer