import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'
import * as actions from "./actions";
import actionTypes from "./constant"

es6promise.polyfill()

function* loadHomePageDataSaga() {
    try {
    const res = yield fetch('http://demo7512624.mockable.io/homeData')
    const data = yield res.json()
    //console.log(data)
    yield put(actions.loadHomePageDataSuccess(data))
  } catch (err) {
    yield put(actions.homePageDataFailure(err))
  }
}


const send = {
  loadHomePageDataSaga : loadHomePageDataSaga,
  actionTypes : actionTypes.LOAD_HOMEPAGE_DATA
}

export default send