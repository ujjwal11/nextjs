import { put } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import * as sharedAction from '../../store/shared/actions'
import {customerProfile} from '../../api/customerProfile'
import actionTypes from "./constant"
import Router from 'next/router'

es6promise.polyfill()

function* startUpdateUserProfile(data){
    console.log('data>>>>>',data)
    try{
        const profileData = yield customerProfile.updateCustomerProfile(data.data)
        yield put(sharedAction.updateSucccessUserData(profileData.data))
        if(profileData && profileData.status === 200){
            Router.push('/')
        }
    }
    catch(err){
        yield put(actions.faliureUserProfile(err));
    }
}

const userProfile = {
    startUpdateUserProfile : startUpdateUserProfile,
    userProfileUpdateAction : actionTypes.START_UPDATE_USER_PROFILE
}

export default userProfile