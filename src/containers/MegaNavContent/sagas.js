import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'
import * as actions from "./actions";
import actionTypes from "./constant"

es6promise.polyfill()
// const res = yield fetch(`${process.env.API_HOST}api/catalog/megaNav`)

function* loadDataSaga() {
    try {
    const res = yield fetch(`${process.env.CATALOG_API_HOST}megaNav`)
    const data = yield res.json()
    //console.log(data)
    yield put(actions.loadDataSuccessMegaNav(data))
  } catch (err) {
    yield put(actions.failureMegaNav(err))
  }
}

// function* rootSaga() {
//     console.log('checking>>>')
//     yield all([
//        //call(incrementCount),
//        takeLatest(actionTypes.LOAD_DATA_MEGA_NAV, loadDataSaga)
//    ])
// }

const megaNav = {
    loadDataSaga : loadDataSaga,
    actionTypes : actionTypes.LOAD_DATA_MEGA_NAV
}

export default megaNav