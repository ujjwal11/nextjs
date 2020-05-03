import  actionTypes from './constant'


export const rootState = {
  error: false,
}

function reducer(state = rootState, action) {
  switch (action.type) {

    case actionTypes.LOAD_PLP_DATA:
      return {
        loader : true
      }

    case actionTypes.SET_PLP_KEY:
      return {
        ...state,
        key : action.data,
        loader : false
      }

    case actionTypes.SUCCCESS_PLP_DATA:
      return {
        ...state,
        ...action.data,
        loader : false
      }
    
    default:
      return state
  }
}

export default reducer