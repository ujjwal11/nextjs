import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'
import * as actions from "./actions";
import actionTypes from "./constant"
import {productService} from "../../api/product"

es6promise.polyfill()

function* loadProductData(data){
    //console.log('<<<PDP data >>>',data)
    try {
        const key = data.key
        const productData = yield productService.getProductData(key)
        // console.log('productData>>',productData)
        yield put(actions.successProductData(productData))
        // your new action dis here to store master vari
        yield put(actions.successSelectedVariantData(productData.current.masterVariant))
    }
    catch (err) {
        yield put(actions.faliureProductData(err));
    }
}

function* startAddToCart(data){
    // console.log('cheking out data>>>', data)
    try {
        // console.log('cheking data is comming or not>>>',data)
        yield put(actions.successAddToCart(data))
    }
    catch(err) {
        console.log('errerr<<<<<<<',err)
        yield put(actions.faliureAddToCart(err));
    }
}

function* startActiveCart(data){
    try {
        const ActiveCartData = yield productService.activeCart(data.data)

        if(ActiveCartData && ActiveCartData.status !== 200 && ActiveCartData.status !== 404){
            yield put(actions.faliureActiveCart())
            console.error('please try again later')
        }else{
            yield put(actions.successActiveCart(ActiveCartData.data))
        }
    }
    catch(err){
        yield put(actions.faliureActiveCart(err));
    }
}

function* startUpdateCartData(data){
    // console.log('header and data is here>>>',data)
    try {
        const UpdateCartData = yield productService.getCartUpdateData(data.data)
        if(UpdateCartData && UpdateCartData.status !== 200){
            console.error('item cannot updated due to some error please try again')
        }else{
            yield put(actions.successUpdateCartData(UpdateCartData.data))
        }
        

    }
    catch(err){
        yield put(actions.faliureUpdateCartData(err));
    }
}

function* deleteDataFromCart(data){
    // console.log('>>>>>>>',data)
    try {
        const DeleteDataFromCart = yield productService.deleteItemFromCart(data.data)

        yield put(actions.successDeleteDataFromCart(DeleteDataFromCart))
    }
    catch(err) {
        yield put(actions.faliureDeleteDataFromCart(err));
    }
}



const pdp = {
    loadProductData : loadProductData,
    actionTypes : actionTypes.LOAD_PRODUCT_DATA,
    
    startAddToCart : startAddToCart,
    addToCartActionType : actionTypes.START_ADD_TO_CART,

    startActiveCart : startActiveCart,
    cartDataActionType : actionTypes.START_ACTIVE_CART,

    startUpdateCartData : startUpdateCartData,
    updateCartActionType : actionTypes.START_UPDATE_CART_DATA,

    deleteDataFromCart : deleteDataFromCart,
    deleteCartActionType : actionTypes.DELETE_DATA_FROM_CART
}

export default pdp
