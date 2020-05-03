import actionTypes from './constant'


export function loadDataMegaNav() {
    return { type: actionTypes.LOAD_DATA_MEGA_NAV }
  }
  
  export function loadDataSuccessMegaNav(data) {
    return {
      type: actionTypes.LOAD_DATA_SUCCESS_MEGA_NAV,
      data,
    }
  }

  export function failureMegaNav(error) {
    return {
      type: actionTypes.FAILURE_MEGA_NAV,
      error,
    }
  }