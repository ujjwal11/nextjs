import actionTypes from './constant'

export function loadPlpData(data){
    return {
        type : actionTypes.LOAD_PLP_DATA,
        data
    }
}

export function setPlpPageKey(data){
    return{
        type : actionTypes.SET_PLP_KEY,
        data
    }
}

export function successPlpData(data){
    return {
        type : actionTypes.SUCCCESS_PLP_DATA,
        data
    }
}

export function faliurePlpData(error){
    return {
        type : actionTypes.FALIURE_PLP_DATA,
        error
    }
}

export function startRecommended(data){
    return {
        type : actionTypes.START_RECOMMENDED,
        data
    }
}

export function successRecommended(data){
    return {
        type : actionTypes.SUCCESS_RECOMMENDED,
        data
    }
}

export function faliureRecommended(error){
    return {
        type : actionTypes.FALIURE_RECOMMENDED,
        error
    }
}
