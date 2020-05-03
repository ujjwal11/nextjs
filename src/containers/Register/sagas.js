// import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
// import es6promise from 'es6-promise'
// import 'isomorphic-unfetch'
// import * as actions from "./actions";
// import actionTypes from "./constant"
// import Router, { useRouter } from "next/router";


// es6promise.polyfill()

// function* Register(data) {
//   const token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null;
//   const requestURL = `${process.env.API_HOST}api/me/signup`
//   const headers = {
//     Accept: "application/json",
//     Authorization: "Bearer " + token.access_token,
//     "Content-Type": "application/json"
//   };
//   const body = JSON.stringify(data.data)
//   try {
//     const res = yield fetch(requestURL, {
//         method : "POST",
//         body : body,
//         headers : headers
//     })
//     const data = yield res.json();
//     localStorage.setItem('userToken', JSON.stringify(data.token));
//     Router.push('/')
//     yield put(actions.loadSuccessRegister(data));
//   } catch (err) {
//     yield put(actions.failureRegister(err));
//   }
// }

// function* UserData(data) {
//   const token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null;
//     const headers = {
//       Authorization : "Bearer " + token.access_token
//     }
//   try {
//   const res = yield fetch(`${process.env.API_HOST}api/me`, {headers})
//   const data = yield res.json()
//   console.log(data)
//   yield put(actions.loadSuccessUserData(data))
// } catch (err) {
//   yield put(actions.failureUserData(err))
// }
// }

// const register = {
//     Register : Register,
//     actionTypes : actionTypes.LOAD_REGISTER,
//     UserData : UserData,
//     userActionTypes : actionTypes.LOAD_USERDATA
// }

// export default register