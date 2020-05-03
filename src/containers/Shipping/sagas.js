import { put } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import * as actions from "./actions";
import * as pdpAction from '../PDP/actions'
import actionTypes from "./constant"
import {shippingMethod} from "../../api/shippingMethodApi"
import Router from 'next/router'

es6promise.polyfill()

function* startShipping(data){
    try{
        const shippingData = yield shippingMethod.addShippingToCart(data)
        yield put(pdpAction.successUpdateCartData(shippingData.data))
        if(shippingData && shippingData.status === 200){
            Router.push(`/checkout/payment`)
        }

    }
    catch(err){
        yield put(actions.faliureShipping(err));
    }
}

const shipping = {
    startShipping : startShipping,
    shippingAction : actionTypes.START_SHIPPING
}

export default shipping