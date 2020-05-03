import actionTypes from './constant'

export function loadProductData(key){
    return {
        type : actionTypes.LOAD_PRODUCT_DATA,
        key
    }
}

export function successProductData(data){
    return {
        type : actionTypes.SUCCESS_PRODUCT_DATA,
        data
    }
}

export function faliureProductData(error){
    return {
        type : actionTypes.FALIURE_PRODUCT_DATA,
        error
    }
}

export function successSelectedVariantData(data){
    return {
        type : actionTypes.SUCCESS_SELECTED_VARIANT_DATA,
        data
    }
}

export function startAddToCart(data){
    return {
        type : actionTypes.START_ADD_TO_CART,
        data
    }
}

export function successAddToCart(data){
    return {
        type : actionTypes.SUCCESS_ADD_TO_CART,
        data
    }
}

export function faliureAddToCart(error){
    return {
        type : actionTypes.FALIURE_ADD_TO_CART,
        error
    }
}

export function emptyAddTOCart(){
    return {
        type : actionTypes.EMPTY_ADD_TO_CART
    }
}

export function startActiveCart(data){
    return {
        type : actionTypes.START_ACTIVE_CART,
        data
    }
}

export function successActiveCart(data){
    return {
        type : actionTypes.SUCCESS_ACTIVE_CART,
        data
    }
}

export function faliureActiveCart(error){
    return {
        type : actionTypes.FALIURE_ACTIVE_CART,
        error
    }
}

// UPDATE CART ACTIONS

export function startUpdateCartData(data){
    return {
        type : actionTypes.START_UPDATE_CART_DATA,
        data
    }
}

export function successUpdateCartData(data){
    return {
        type : actionTypes.SUCCESS_UPDATE_CART_DATA,
        data
    }
}

export function faliureUpdateCartData(error){
    return {
        type : actionTypes.FALIURE_UPDATE_CART_DATA,
        error
    }
}

// DELETE DATA FROM CART

export function deleteDataFromCart(data){
    return {
        type : actionTypes.DELETE_DATA_FROM_CART,
        data
    }
}

export function successDeleteDataFromCart(data){
    return {
        type : actionTypes.SUCCESS_DELETE_DATA_FROM_CART,
        data
    }
}

export function faliureDeleteDataFromCart(error){
    return {
        type : actionTypes.FALIURE_DELETE_DATA_FROM_CART,
        error
    }
}
