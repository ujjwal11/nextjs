import actionTypes from './constant'


export function loadHomePageData() {
    return { type: actionTypes.LOAD_HOMEPAGE_DATA }
  }
  
  export function loadHomePageDataSuccess(data) {
    return {
      type: actionTypes.LOAD_HOMEPAGE_DATA_SUCCESS,
      data,
    }
  }

  export function homePageDataFailure(error) {
    return {
      type: actionTypes.HOMEPAGE_DATA_FAILURE,
      error,
    }
  }