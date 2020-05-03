import { put } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import * as actions from "./action";
import * as pdpAction from '../PDP/actions'
import actionTypes from "./constant"
import {paymentMethod} from "../../api/paymentMethodApi"
import Router from 'next/router'

es6promise.polyfill()

function* startPayment(data){
    try{
        const paymentData = yield paymentMethod.paymentDetails(data)
        if(paymentData && paymentData.status === 201 || 200){
            // console.log("paymentData>>", paymentData)
            yield put(pdpAction.successUpdateCartData(paymentData.data))
            Router.push(`/checkout/review`)
        }

    }
    catch(err){
        yield put(actions.faliurePayment(err));
    }
}

const payment = {
    startPayment : startPayment,
    paymentAction : actionTypes.START_PAYMENT
}

export default payment