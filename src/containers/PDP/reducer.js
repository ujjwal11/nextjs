import  actionTypes from './constant'

export const pdp = {
  error: false,
  loader : true
}

function reducer(state = pdp, action) {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCT_DATA:
      return {
        ...state,
        key : action.key,
        loader : true
      }

    case actionTypes.SUCCESS_PRODUCT_DATA:
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