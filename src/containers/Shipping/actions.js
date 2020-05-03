import actionTypes from './constant'

export function startShipping(data){
    return{
        type : actionTypes.START_SHIPPING,
        data
    }
}

export function faliureShipping(error){
    return{
        type : actionTypes.FALIURE_SHIPPING,
        error
    }
}