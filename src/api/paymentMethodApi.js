import axios from 'axios'
import handleErrors from "../_helper/handlerror"

async function paymentDetails(data){
    const url = `${process.env.CART_API_HOST}me/cart/paymentDetails`
    const headers = {
        Authorization : `Bearer ${data.data.Token}`
    }
    const body = {
        ...data.data.paymentData
    }
    return axios
    .post(`${url}`, body, {headers})
    .then(handleErrors)
    .then(function (response){
        return response
    })
    .catch(function (error){
        console.log(error)
    })
}

export const paymentMethod = {
    paymentDetails
}