import actionTypes from './constant'

export function startUpdateUserProfile(data){
    return{
        type : actionTypes.START_UPDATE_USER_PROFILE,
        data
    }
}

export function faliureUserProfile(error){
    return{
        type : actionTypes.FALIURE_USER_PROFILE,
        error
    }
}