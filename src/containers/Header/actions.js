import actionTypes from './constant'

export function startSearch(data){
    return{
        type : actionTypes.START_SEARCH,
        data
    }
}

export function successSearch(data){
    return{
        type : actionTypes.SUCCESS_SUCCESS,
        data
    }
}

export function faliureSearch(error){
    return{
        type : actionTypes.FALIURE_SEARCH,
        error
    }
}