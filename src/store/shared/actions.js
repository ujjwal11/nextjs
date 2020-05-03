import actionTypes from './constant'
import { retry } from 'redux-saga/effects'


export function loadToken(data) {
  return {
    type: actionTypes.LOAD_TOKEN,
    data
  }
}
  
export function loadTokenSuccess(data) {
  return {
    type: actionTypes.LOAD_TOKEN_SUCCESS,
    data,
  }
}

export function failureToken(error) {
  return {
    type: actionTypes.FAILURE_TOKEN,
    error,
  }
}

export function startSelectedFacets(value) {
  return {
    type: actionTypes.START_SELECTED_FACETS,
    value
  }
}

export function selectedFacetsKey(key, value) {
  return {
    type: actionTypes.SELECTED_FACETS_KEY,
    value : {key , value}
  }
}

export function removeSelectedFacetKey(key, value){
  return {
    type : actionTypes.REMOVE_FACETS_KEY,
    value : {key, value}
  }
}

export function removeFacetsKey(data){
  return {
    type: actionTypes.SELECTED_FACETS_KEY,
    value : data
  }
}

export function selectedFacetsFaliureKey(error) {
  return {
    type: actionTypes.SELECTED_FACETS_FALIURE_KEY,
    error
  }
}

export function ssrFacets(key, value){
  return {
    type: actionTypes.SSR_FACETS,
    value : {key , value}
  }
}

export function removeAllFacet(){
  return {
    type : actionTypes.EMPTY_ALL_FACET,
  }
}

// SignIn and SignUp actions
export function loadSignInSignUp(data, type) {
  return { 
    type: actionTypes.LOAD_SIGNIN_SIGNUP,
    payload : {data, type}
  }
}

export function SuccessSignInSignUp(data) {
  return {
    type: actionTypes.LOAD_SUCCESS_SIGNIN_SIGNUP,
    data,
  }
}

export function failureSignInSignUp(error) {
  return {
    type: actionTypes.FAILURE_SIGNIN_SIGNUP,
    error,
  }
}

export function loadUserData() {
  return {
    type: actionTypes.LOAD_USERDATA,
  }
}

export function loadSuccessUserData(data) {
  return {
    type: actionTypes.LOAD_SUCCESS_USERDATA,
    data,
  }
}

export function updateSucccessUserData(data){
  return{
    type : actionTypes.UPDATE_SUCCESS_USERDATA,
    data
  }
}

export function failureUserData(error) {
  return {
    type: actionTypes.FAILURE_USERDATA,
    error,
  }
}

export function addAddressStart(data){
  return{
    type : actionTypes.ADD_ADDRESS_START,
    data
  }
}
export function addAddressFail(error){
  return{
    type : actionTypes.ADD_ADDRESS_FAIL,
    error
  }
}

export function updateAddressStart(data){
  return{
    type : actionTypes.UPDATE_ADDRESS_START,
    data
  }
}

export function updateAddressFail(error){
  return{
    type : actionTypes.UPDATE_ADDRESS_FAIL,
    error
  }
}

export function deleteAddress(id){
  return{
    type : actionTypes.DELETE_ADDRESS,
    id
  }
}
export function deleteAddressFail(error){
  return{
    type : actionTypes.DELETE_ADDRESS_FAIL,
    error
  }
}