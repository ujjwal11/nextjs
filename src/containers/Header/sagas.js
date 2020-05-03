import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import * as actions from "./actions";
import * as plpAction from '../Plp/actions'
import actionTypes from "./constant"
import {searchService} from "../../api/searchApi"

es6promise.polyfill()

function* startSearch(data){
    // console.log('asdasdas>>',data)
    try{
        const categoryData = yield searchService.searchProductes(data.data)
        const test  = yield put(plpAction.successPlpData(categoryData))
        // console.log('test is here>>>>>', test)
    }
    catch(err){
        yield put(actions.faliureSearch(err));
    }
}

const search = {
    startSearch : startSearch,
    searchAction : actionTypes.START_SEARCH
}

export default search