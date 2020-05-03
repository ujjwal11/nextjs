import axios from 'axios'
import handleErrors from "../_helper/handlerror"

async function getAllShippingMethods(data){
    // console.log('what is in the data', data)
    const url = `${process.env.CART_API_HOST}shipping-methods`
    const headers = {
        Authorization : `Bearer ${data.access_token}`
    }
    return axios
    .get(url, {headers})
    .then(handleErrors)
    .then(function (response){
        return response.data;
    })
    .catch(function (error){
        console.log(error)
    });
}

async function addShippingToCart(data){
    const url =`${process.env.CART_API_HOST}me/cart/shipping`
    const headers = {
        Authorization : `Bearer ${data.data.Token}`
    }
    const body = {
        ...data.data.shippingData
    }
    return axios
    .post(`${url}`, body, {headers})
    .then(handleErrors)
    .then(function (response){
        return response
    })
    .catch(function (error){
        console.log(error)
    });
}

export const shippingMethod = {
    getAllShippingMethods,
    addShippingToCart
}