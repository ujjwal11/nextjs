import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'

import * as actions from "./actions";
import * as plpAction from "../../containers/Plp/actions"

import actionTypes from "./constant"
import {productService} from "../../api/product"
import Router, { useRouter } from "next/router";

import {addressServices} from "../../api/addressApi"
import {startActiveCart} from '../../../src/containers/PDP/actions'
 
const apiBaseUrl = process.env.AUTH_API_HOST

function* anonymousToken(data) {
  const requestURL = `${apiBaseUrl}anonymous/token`
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(data.data)
  try {
    const res = yield fetch(requestURL, {
      method: "POST",
      body: body,
      headers: headers
    })
    const data = yield res.json()
    localStorage.setItem('userToken', JSON.stringify(data));
  } catch (err) {
    yield put(actions.failureToken(err))
  }
}

function* SignInSignUp(data) {
  const {payload} = data
  const token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null;
  const requestURL = payload.type === "Register" ? `${process.env.AUTH_API_HOST}me/signup` : payload.type === "Login" ? `${process.env.AUTH_API_HOST}me/login` : ''
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + token.access_token,
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(payload.data)
  try {
    const res = yield fetch(requestURL, {
        method : "POST",
        body : body,
        headers : headers
    })
    const resData = yield res.json();
    localStorage.setItem('userToken', JSON.stringify(resData.token));
    Router.push('/myAccount')
    yield put(actions.SuccessSignInSignUp(resData));
    const newToken = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null
    yield put(startActiveCart(newToken.access_token))

  } catch (err) {
    yield put(actions.failureSignInSignUp(err));
  }
}

function* UserData(data) {
  const token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null;
  const headers = {
    Authorization: "Bearer " + token.access_token
  }
  try {
    const res = yield fetch(`${process.env.AUTH_API_HOST}me`, { headers })
    const data = yield res.json()
    yield put(actions.loadSuccessUserData(data))
  } catch (err) {
    yield put(actions.failureUserData(err))
  }
}

function* addAddressStart(data){
  const sendData = {
    Token : data.data.Token,
    formData : data.data.formData
  }
  try{
    const response = yield addressServices.addAddress(sendData)
    yield put(actions.loadSuccessUserData(response.data))
  }
  catch (err){
    yield put(actions.addAddressFail(err))
  }
}

function* updateAddressStart(data){
  const sendData = {
    Token : data.data.Token,
    formData : data.data.formData,
    updateId : data.data.updateId
}
  try{
    const res = yield addressServices.updateAddress(sendData)
    yield put(actions.loadSuccessUserData(res.data))
  }
  catch (err){
    yield put(actions.updateAddressFail(err))
  }
}


function* startSelectedFacets(data){
  try{
        if(data && data.value && data.value.isServer === true){
          // console.log('calling action when isServer is true')
          yield put(actions.ssrFacets(data.value.key, data.value.value))
        }
        else if(data && data.value && data.value.isServer === false){
          // console.log('calling action when isServer is true')
          yield put(actions.ssrFacets(data.value.key, data.value.value))
        }
        else if(data && data.value && data.value.empty === true){
          // console.log('calling action when data.value is empty')
          yield put(actions.removeAllFacet())
        }
        else if(data && data.value && data.value.remove === true){
          // console.log('calling action when remove is true')
          yield put(actions.removeSelectedFacetKey(data.value.key, data.value.value))
        }
        else{
          // console.log('calling action when no other one is calling')
          yield put(actions.selectedFacetsKey(data.value.key, data.value.value))
        }

  }catch (err){
    yield put(actions.selectedFacetsFaliureKey(err))
  }
}



const Shared = {
    anonymousToken : anonymousToken,
    actionTypes : actionTypes.LOAD_TOKEN,

    SignInSignUp : SignInSignUp,
    SignInSignUpActionTypes : actionTypes.LOAD_SIGNIN_SIGNUP,
    UserData : UserData,
    userActionTypes : actionTypes.LOAD_USERDATA,
    
    startSelectedFacets : startSelectedFacets,
    loadKeyActionType : actionTypes.START_SELECTED_FACETS,

    addAddressStart : addAddressStart,
    addressActionType : actionTypes.ADD_ADDRESS_START,

    updateAddressStart : updateAddressStart,
    updateAddressAction : actionTypes.UPDATE_ADDRESS_START
}
export default Shared;