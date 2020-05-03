// import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
// import es6promise from 'es6-promise'
// import 'isomorphic-unfetch'
// import * as actions from "./action";
// import loginActionTypes from "./constant"

// es6promise.polyfill()

// function* Login(data){
//     const token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null;
//     const requestURL = `${process.env.API_HOST}api/me/login`
//     const headers = {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization : "Bearer " + token.access_token
//     }
//     const userData = data.data
//     console.log('userDatauserData',userData)
//     const body = JSON.stringify(userData)
//     // console.log('body is here',body)
//     try {
//         const res = yield fetch(requestURL, {
//             method : "POST",
//             body : body,
//             headers : headers
//         })
//         const data = yield res.json();
//         // console.log("datadata is here?>><><><", data);
//         yield put(actions.startLoginSuccess(data));
//     }
//     catch (err) {
//         yield put(actions.startLoginFaliure(err));
//     }
// }
// const login = {
//     Login : Login,
//     loginActionTypes : loginActionTypes.START_LOGIN,
// }

// export default login