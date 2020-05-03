import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'
import * as actions from "./actions";
import actionTypes from "./constant"
import {productService} from "../../api/product"
import {handleCat} from "../../../src/_helper/helper"

es6promise.polyfill()


function * loadPlpData(data){
    console.log('data onb clien and serber side>>',data)
    try {
        const {categoryid, subcategoryId, childCatId, subChildCatId, page, offset, facetValues, authHeader} = data.data
        var dataObj
        const catobj = handleCat(categoryid, subcategoryId, childCatId, subChildCatId)
        const {category , url} = catobj
        dataObj = {
            category,
            page,
            offset,
            facetValues,
            authHeader
        }
        yield put(actions.setPlpPageKey(category))
        // console.log('dataObjdataObj in sagas>>',dataObj)
        const categoryData = yield productService.categoriesData(dataObj)
        yield put(actions.successPlpData(categoryData))
    }
    catch (err) {
        yield put(actions.faliurePlpData(err));
    }
}

function * startRecommended(data){
    try {
        const recommendedPlpData = yield productService.recommendedPlp(data.data)
        yield put(actions.successPlpData(recommendedPlpData))
    }
    catch(err){
        yield put(actions.faliurePlpData(err))
    }
}


const plp = {
    loadPlpData : loadPlpData,
    plpActionTypes : actionTypes.LOAD_PLP_DATA,
    startRecommended : startRecommended,
    recommendedActionType : actionTypes.START_RECOMMENDED
}

export default plp
