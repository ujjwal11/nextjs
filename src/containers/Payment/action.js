import actionTypes from './constant'

export function startPayment(data){
    return{
        type : actionTypes.START_PAYMENT,
        data
    }
}

export function faliurePayment(error){
    return{
        type : actionTypes.FALIURE_PAYMENT,
        error
    }
}